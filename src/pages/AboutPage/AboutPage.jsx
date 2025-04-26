import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import PartnersSection from "../../components/PartnersSection/PartnersSection.jsx";

export default function AboutPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Партнерам", path: ""}
    ]

    return(
        <div className="content" style={{minHeight: "600px"}}>
            <NavChain paths={paths}/>
            <PartnersSection/>
        </div>
    )
}