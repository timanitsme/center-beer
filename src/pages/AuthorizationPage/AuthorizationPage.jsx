import AuthSection from "../../components/AuthSection/AuthSection.jsx";
import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp"

export default function AuthorizationPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Авторизация", path: ""}
    ]

    useEffect(() => {
        document.title = "center.beer | Авторизация"
    }, []);

    return(
        <div className="content" style={{backgroundImage: `url(${contactsBg})`}}>
            <NavChain paths={paths}></NavChain>
            <AuthSection></AuthSection>
        </div>
    )
}