import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loadedOptions: [],
    loading: false,
    firstReload: true,
    isAuth: false,
    token: "",
    tokenExpiration: "",
    email: "",
    userId: "",
    googlKey: "AIzaSyAwUkhGE3_YB8cT4706OKT-xi3RpvnL014",
    headers: [],
    isConectedSocket: null,
    prevPage: null,
    pageLocation: null,
    context: "",
    company: "",
    contextToUpdate: null,
    pickerAction: "",
    singlePick: false,
    role: "",
    socketConnection: false,
    needUserLogin: false,
    versions: {},
    filters: [],
    setores: [],
}

const globalConfig = createSlice({
    name: "globalConfig",
    initialState,
    reducers: {
        loadPositions(state, action) {
            state.loadedOptions.push(action.payload)
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setSocketConnectionStatus(state, action) {
            state.socketConnection = action.payload
        },
        logIn(state, action) {
            state.isAuth = true
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.token = action.payload.token
            state.email = action.payload.email
            state.userId = action.payload.id
            state.role = action.payload.role
            state.user = action.payload.user
            state.userName = action.payload.userName
            state.setor = action.payload.setor
            state.setorId = action.payload.userSetor.setorId
            state.companyName = action.payload.companyName
            state.companyId = action.payload.companyId
            state.fullName = `${action.payload.firstName} ${action.payload.lastName}`
            state.filters = action.payload.filters
        },

        logOut(state, action) {
            state.isAuth = false
            state.firstName = ""
            state.token = ""
            state.email = ""
            state.userId = ""
            state.company = ""
            state.role = ""
        },
        setCompany(state, action) {
            state.company = action.payload
        },
        setIsConnectedSocket(state, action) {
            state.isConectedSocket = action.payload
        },
        setPageLocation(state, action) {
            state.pageLocation = action.payload
        },
        updateVersion(state, action) {
            let { api, version } = action.payload
            if (state.versions[api])
                state.versions[api].oldVersion = state.versions[api].version
            state.versions[api].version = version
        },
        setPrevPage(state, action) {
            state.prevPage = action.payload
        },
        setContext(state, action) {
            state.context = action.payload
        },
        setContextToUpdate(state, action) {
            state.contextToUpdate = action.payload
        },
        setPickerAction(state, action) {
            state.pickerAction = action.payload
        },
        setSinglePick(state, action) {
            state.singlePick = action.payload
        },
        setCompanySetores(state, action) {
            state.setores = action.payload
        },
        setUpdateCompanySetor(state, action) {
            const { id, nome } = action.payload
            const indexSetor = state.setores.findIndex(
                (setor) => setor.id == id
            )
            if (indexSetor == -1) {
                state.setores = [...state.setores, action.payload]
            } else {
                state.setores[indexSetor].nome = nome
                if (state.setorId == id) state.setor = nome
            }
        },
        setNeedUserLogin(state, action) {
            state.needUserLogin = action.payload
        },
        setUserName(state, action) {
            state.userName = action.payload
        },
        setAddFilter(state, action) {
            state.filters = [...state.filters, action.payload]
        },
        setUpdateFilters(state, action) {
            const index = state.filters.findIndex(
                (filter) => filter.id == action.payload.id
            )
            state.filters[index] = action.payload
        },
    },
})

export const {
    loadPositions,
    setPageLocation,
    setCompany,
    setSinglePick,
    logIn,
    setPickerAction,
    logOut,
    setPrevPage,
    setIsConnectedSocket,
    setContext,
    setContextToUpdate,
    setSocketConnectionStatus,
    setToken,
    setCompanySetores,
    setUpdateCompanySetor,
    setNeedUserLogin,
    setUserName,
    updateVersion,
    setAddFilter,
    setUpdateFilters,
} = globalConfig.actions
export default globalConfig.reducer
