import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {useEffect} from "react";

export default function AuthorizationPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Авторизация", path: ""}
    ]

    useEffect(() => {
        document.title = "center.beer | Авторизация"
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <AuthSection></AuthSection>
        </div>
    )
}