import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import ContactsSection from "../../components/ContactsSection/ContactsSection.jsx";
import {useEffect} from "react";

export default function ContactsPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Контакты", path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | Контакты`
    }, []);

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <ContactsSection/>
        </div>
    )
}