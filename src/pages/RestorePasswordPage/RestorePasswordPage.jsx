import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import RestorePassword from "../../components/RestorePassword/RestorePassword.jsx";
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp"

export default function RestorePasswordPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Восстановление пароля", path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | Восстановление пароля`
    }, []);

    return(
        <div className="content" style={{backgroundImage: `url(${contactsBg})`}}>
            <NavChain paths={paths}></NavChain>
            <RestorePassword></RestorePassword>
        </div>
    )
}