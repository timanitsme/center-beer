import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import styles from "./MyCheckinsPage.module.scss"
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
import {lazy, Suspense, useEffect} from "react";
const PersonalAccountAlt = lazy(() => import("../../../components/PersonalAccount/PersonalAccountAlt/PersonalAccountAlt.jsx"));
const PersonalAccountMobile = lazy(() => import("../../../components/PersonalAccount/PersonalAccountMobile.jsx"));

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
            <div style={{display: "flex"}}>
                <Suspense>
                    {!isMobile && <PersonalAccountAlt profile={userProfile}/>}
                </Suspense>
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <NavChain paths={paths} customStyle="nav-chain-no-margin"></NavChain>
                    <div style={{height: "20px"}}></div>
                    <Suspense>
                        {isMobile && <PersonalAccountMobile profile={userProfile} alias="checkIns"/>}
                    </Suspense>
                    <div className={styles.block}>
                        <div className={styles.row}>
                            <div className={styles.arrowButton} onClick={() => navigate("/account/")}><ArrowLeftIcon/></div>
                            <h2 className={`${styles.title} ma-h2-small`}>{selectors[alias]?.pathname}</h2>
                        </div>
                        {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection cards={selectors[alias]?.data} CardComponent={selectors[alias].CardComponent}></SimpleCatalogSection>}
                    </div>
                </div>
            </div>
        </div>
    )
}