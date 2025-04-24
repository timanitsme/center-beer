import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";

export default function AuthorizationPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Авторизация", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <AuthSection></AuthSection>
        </div>
    )
}