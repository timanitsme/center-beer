import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import ContactsSection from "../../components/ContactsSection/ContactsSection.jsx";

export default function ContactsPage(){
    const paths = [
        {title: "beer.center", path: "/"},
        {title: "Контакты", path: ""}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}/>
            <ContactsSection/>
        </div>
    )
}