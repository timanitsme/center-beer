import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import RestorePassword from "../../components/RestorePassword/RestorePassword.jsx";

export default function RestorePasswordPage(){
    const paths = [
        {title: "beer.center", path: "/"},
        {title: "Контакты", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <RestorePassword></RestorePassword>
        </div>
    )
}