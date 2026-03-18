import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useWebProvider } from "./useWebProvider"

export const useBasicService = (endpoint, serviceFactory) => {
    const { controller } = useWebProvider()
    const { userId, setor, firstName, lastName } = useSelector(
        (state) => state.global
    )
    const nomeUsuario = `${firstName} ${lastName}`

    const service = useMemo(
        () =>
            serviceFactory({
                controller,
                endpoint,
                userData: { userId, setor, nomeUsuario },
            }),
        [controller, endpoint, userId, setor, nomeUsuario]
    )

    return service
}
