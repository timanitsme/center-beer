import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import ContactsSection from "../../components/ContactsSection/ContactsSection.jsx";
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp"

export default function ContactsPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Контакты", path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | Контакты`
    }, []);

    return(
        <div className="content" style={{backgroundImage: `url(${contactsBg})`}}>
            <NavChain paths={paths}/>
            <ContactsSection/>
        </div>
    )
}