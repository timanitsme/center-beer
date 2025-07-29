import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import RegSection from "../../components/RegSection/RegSection.jsx";
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp"

export default function RegistrationPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Регистрация", path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | Регистрация`
    }, []);

    return(
        <div className="content" style={{backgroundImage: `url(${contactsBg})`}}>
            <NavChain paths={paths}></NavChain>
            <RegSection></RegSection>
        </div>
    )
}