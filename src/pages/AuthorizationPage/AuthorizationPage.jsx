import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";

export default function AuthorizationPage(){
    const paths = [
        {title: "beer.center", path: "/"},
        {title: "Контакты", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <AuthSection></AuthSection>
        </div>
    )
}