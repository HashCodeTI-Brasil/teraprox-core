import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useToasts } from "react-toast-notifications"
import { useNavigate } from "react-router-dom"
import { useWebProvider } from "./useWebProvider"
import { useNotifications } from "./useNotifications"
import { useUserService } from "../Services/default/userService"
import {
    logIn,
    setNeedUserLogin,
    setToken,
    setCompanySetores,
} from "../Reducers/default-reducers/globalConfigReducer"
import { endPointUser } from "../models/constantes"
import { getTenantFromHostname } from "../utils/tenantResolver.js"

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
            dispatch(setNeedUserLogin(false))

            try {
                const setores = await controller("setor", endPointUser).get("all")
                dispatch(setCompanySetores(setores))
            } catch (err) {
                console.error("Erro ao carregar setores:", err)
            }

            connect(authResponse.userName, authResponse.identifier, authResponse.id)
            navigate("/")
        } else {
            toastManager.addToast("Usuário ou senha inválidos", {
                appearance: "error",
                autoDismiss: true,
            })
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            toastManager.addToast("Informe usuário e senha", {
                appearance: "warning",
                autoDismiss: true,
            })
            return
        }

        try {
            const tenant = getTenantFromHostname()
            if (!tenant) {
                toastManager.addToast("Tenant não identificado. Em produção, acesse via subdomínio (ex: cationbrasil.teraprox.com). Em dev, preencha o campo Tenant.", {
                    appearance: "warning",
                    autoDismiss: true,
                })
                return
            }
            const loginBody = { email, password, company: tenant }

            const finalAuth = await authOnSGP(loginBody)

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
        authPlataform: handleLogin,
    }
}

export default useLogin
