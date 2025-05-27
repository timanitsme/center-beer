import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import styles from "./MyCheckinsPage.module.css"
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import BarImage1 from "../../../assets/barsMocks/bar-3.svg";
import BarImage2 from "../../../assets/barsMocks/bar-3.svg";
import BarImage3 from "../../../assets/barsMocks/bar-3.svg";
import BarImage4 from "../../../assets/barsMocks/bar-3.svg";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react";
import BeerCheckInCard from "../../../components/Cards/CheckIns/BeerCheckInCard/BeerCheckInCard.jsx";
import BarCheckInCard from "../../../components/Cards/CheckIns/BarCheckInCard/BarCheckInCard.jsx";
import {useEffect} from "react";

export default function MyCheckinsPage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);

    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
    ]

    const barsCards = [
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},

    ]

    const selectors = {
        beer: {pathname: "Чек-ины пива", data: barCards, isLoading: false, error: false, CardComponent: BeerCheckInCard},
        bar: {pathname: "Чек-ины заведений", data: barsCards, isLoading: false, error: false, CardComponent: BarCheckInCard}
    }



    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: selectors[alias]?.pathname, path: ""}
    ]

    useEffect(() => {
        document.title = `center.beer | ${selectors[alias]?.pathname}`
    }, []);

    if (!alias) navigate("/account/")
    if (!profileIsLoading && !isAuthorized) navigate("/login/")
    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccount isMobile={true}/>}
                    <div className={styles.row}>
                        <div className={styles.arrowButton} onClick={() => navigate("/account/")}><ArrowLeftIcon/></div>
                        <h2 className={styles.title}>{selectors[alias]?.pathname}</h2>
                    </div>
                    {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection cards={selectors[alias]?.data} CardComponent={selectors[alias].CardComponent}></SimpleCatalogSection>}
                </div>
            </div>
        </div>
    )
}