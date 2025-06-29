import styles from "./AllSimilarBeerPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {useGetBeerInfoQuery} from "../../../store/services/centerBeer.js";
import BottledBeerCard from "../../../components/Cards/BottledBeerCard/BottledBeerCard.jsx";

export default function AllSimilarBeerPage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const {data, isLoading, error} = useGetBeerInfoQuery(alias)

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Пиво", path: "/beer/"},
        {title: `${data?.[0]?.name}`, path: `/beer/${alias}`},
        {title: `Похожее пиво`, path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | ${data?.[0]?.name}: Похожее пиво`
    }, []);

    if (!alias) navigate("/beer/")
    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}} className={styles.contentContainer}>
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    <div className={styles.row}>
                        <div className={styles.arrowButton} onClick={() => navigate(`/beer/${alias}`)}><ArrowLeftIcon/></div>
                        <h2 className={`${styles.title} ma-h2-small`}>{`Все пиво, похожее на ${data?.[0]?.name}`}</h2>
                    </div>
                    {data && !isLoading && !error && <SimpleCatalogSection cards={data[0]?.related_items} CardComponent={BottledBeerCard}></SimpleCatalogSection>}
                </div>
            </div>
        </div>
    )
}