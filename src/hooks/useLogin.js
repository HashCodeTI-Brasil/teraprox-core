import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications"
import { useNavigate } from "react-router-dom"
import { useWebProvider } from "./useWebProvider"
import { useNotifications } from "./useNotifications"
import { useUserService } from "../Services/default/userService"
import { endPointTimer, endPointUser } from "../models/constantes"
import {
    logIn,
    setToken,
} from "../Reducers/default-reducers/globalConfigReducer"

const useLogin = () => {
    const [email, setUsuario] = useState("")
    const [password, setSenha] = useState("")
    const global = useSelector((state) => state.global)
    const navigate = useNavigate()
    const toastManager = useToasts()
    const dispatch = useDispatch()
    const { controller, handleLogout } = useWebProvider()
    const { loadInitialNotifications } = useNotifications()
    const { authOnSGP, loginFromToken } = useUserService()
    const isAuth = global.isAuth

    const connect = (userName, company, userId) => {
        if (loadInitialNotifications) loadInitialNotifications(userId)
    }

    const authHandler = async (authResponse) => {
        if (authResponse && authResponse.token) {
            dispatch(logIn({ ...authResponse }))
            dispatch(setToken(authResponse.token))
            connect(authResponse.userName, authResponse.identifier, authResponse.id)
            navigate("/")
        } else {
            toastManager.addToast("Usuário ou senha inválidos", {
                appearance: "error",
                autoDismiss: true,
            })
        }
    }

    const authPlataform = async () => {
        if (!email || !password) {
            toastManager.addToast("Informe usuário e senha", {
                appearance: "warning",
                autoDismiss: true,
            })
            return
        }

        try {
            const companyFromState = global.company || process.env.REACT_APP_DEFAULT_COMPANY

            // Prefer direct auth when company is already known.
            if (companyFromState) {
                const directAuth = await authOnSGP({
                    email,
                    password,
                    company: companyFromState,
                })

                if (directAuth?.token) {
                    authHandler(directAuth)
                    return
                }
            }

            // Fallback flow: discover company in platform auth and then complete auth.
            const res = await controller("user", endPointUser).post("authPlataform", { email, password })
            const companyIdentifier =
                res?.company?.identifier ||
                res?.identifier ||
                process.env.REACT_APP_DEFAULT_COMPANY

            if (!companyIdentifier) {
                toastManager.addToast("Usuário sem empresa vinculada para autenticação", {
                    appearance: "warning",
                    autoDismiss: true,
                })
                return
            }

            const finalAuth = await authOnSGP({
                email,
                password,
                company: companyIdentifier,
                token: res?.token,
                companyId: res?.company?.id || res?.companyId,
                companyName: res?.company?.nome || res?.companyName,
            })

            authHandler(finalAuth)
        } catch (error) {
            console.error("Login error", error)
            toastManager.addToast("Erro ao conectar com o servidor", {
                appearance: "error",
                autoDismiss: true,
            })
        }
    }

    return {
        email,
        setUsuario,
        password,
        setSenha,
        authPlataform,
    }
}

export default useLogin
