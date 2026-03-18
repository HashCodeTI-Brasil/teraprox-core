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
        try {
            const res = await controller("user", endPointUser).post("authPlataform", { email, password })
            if (res && res.company) {
                const finalAuth = await authOnSGP({
                    email,
                    password,
                    company: res.company.identifier,
                    token: res.token,
                    companyId: res.company.id,
                    companyName: res.company.nome
                })
                authHandler(finalAuth)
            }
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
