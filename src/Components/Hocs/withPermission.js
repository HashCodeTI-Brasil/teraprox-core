import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const PermissionContainer = ({ component, menubar }) => {
    const userRoles = useSelector((state) => state.global.role)
    const componentRef = useRef(null)
    const [isBlocked, setIsBlocked] = useState(false)

    useEffect(() => {
        async function validateFrontEndPerms() {
            if (!userRoles?.permissao?.[0]?.frontEndPerms) return

            const compId = componentRef?.current?.id
            for (let frontEndPerm of userRoles.permissao[0].frontEndPerms) {
                let componentesBloqueados = frontEndPerm.componentesBloqueados || []
                if (componentesBloqueados.includes(compId)) {
                    if (componentRef.current) {
                        componentRef.current.style.display = "none"
                        componentRef.current.className = ""
                    }
                    setIsBlocked(true)
                }
                if (menubar && compId) {
                    let newCompId = compId.replace("/", "")
                    if (frontEndPerm.locationBloqueado == newCompId) {
                        if (componentRef.current) {
                            componentRef.current.hidden = componentesBloqueados.length === 0
                        }
                    }
                }
            }
        }
        if (componentRef.current) validateFrontEndPerms()
    }, [componentRef, userRoles, menubar])

    return component(componentRef, isBlocked)
}

export default PermissionContainer
