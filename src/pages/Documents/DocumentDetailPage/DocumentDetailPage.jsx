import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./DocumentDetailPage.module.scss"
import {useEffect} from "react";
import AboutDetailSection from "../../../components/AboutDetailSection/AboutDetailSection.jsx";
import PartnerItem from "../../../components/PartnerItem/PartnerItem.jsx";

export default function DocumentDetailPage({setHideFooter}){
    const {alias} = useParams();
    const navigate = useNavigate()
    const specs = {
        "bars-letter": {src: "https://center.beer/letter_brew_2025.pdf"},
        "breweries-letter": {src: "https://center.beer/letter_brew_2025.pdf"},
        "cb-konkurs": "https://center.beer/cb_konkurs.pdf"
    }

    useEffect(() => {
        document.title = `center.beer | Документы`
    }, []);

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Документы", path: ""},
    ]

    useEffect(() => {
        if (setHideFooter){
            setHideFooter(true)
        }

        return () => {
            if (setHideFooter) {
                setHideFooter(false);
            }
        };
    }, [setHideFooter]);

    if (!specs?.hasOwnProperty(alias)) {
        navigate("/")
    } else {
        return(
            <div className="content" style={{minHeight: "calc(100vh - 95px)"}}>
                <iframe src="https://center.beer/cb_konkurs.pdf"className={styles.pdfViewer}></iframe>
            </div>
        )
    }

}