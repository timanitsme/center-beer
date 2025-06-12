import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {useEffect} from "react";
import BugReportSection from "../../components/BugReportSection/BugReportSection.jsx";

export default function BugReportPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Сообщение об ошибке", path: ""}
    ]

    useEffect(() => {
        document.title = "center.beer | Сообщение об ошибке"
    }, []);

    return(
        <>
            <NavChain paths={paths}/>
            <BugReportSection/>
        </>
    )
}