import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import RegSection from "../../components/RegSection/RegSection.jsx";

export default function RegistrationPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Регистрация", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <RegSection></RegSection>
        </div>
    )
}