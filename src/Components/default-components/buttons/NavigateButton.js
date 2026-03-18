import { Button } from "react-bootstrap"
import useNavigator from "../../../hooks/defaults/useNavigator"

const NavigateButton = ({ displayName, path,config, pageName,style, variant,voltarCallback }) => {
    const navigator = useNavigator()
    return <Button style={style ? {...style} : {} } variant={variant || "outline-primary"} onClick={() => {
        {voltarCallback && voltarCallback()}
        navigator(path,config,pageName)
    } }>{displayName}</Button>
}

export default NavigateButton
