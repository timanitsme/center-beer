import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import RestorePassword from "../../components/RestorePassword/RestorePassword.jsx";
import {useEffect} from "react";

export default function RestorePasswordPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Восстановление пароля", path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | Восстановление пароля`
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <RestorePassword></RestorePassword>
        </div>
    )
}