import { useBasicService } from "../../hooks/useBasicService"
import { endPointUser } from "../../models/constantes"

export function useUserService() {
    return useBasicService(
        endPointUser,
        ({ controller, endpoint }) => {
            const userController = controller(null, endpoint)

            return {
                async authOnSGP(loginForm) {
                    return userController.post("auth", loginForm)
                },
                async loginFromToken(token) {
                    return await userController.patch(
                        "loginFromToken",
                        null,
                        { Authorization: token }
                    )
                },
            }
        }
    )
}
