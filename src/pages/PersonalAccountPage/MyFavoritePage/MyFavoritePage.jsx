import BarImage1 from "../../../assets/barsMocks/bar-3.svg";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import styles from "../MyCheckinsPage/MyCheckinsPage.module.css";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import MinimalBarCard from "../../../components/Cards/BarCard/MinimalBarCard.jsx";
import {useGetUsersFavBarsQuery, useGetUsersFavBeersQuery} from "../../../store/services/centerBeer.js";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import MinimalBottledBeerCardApi from "../../../components/Cards/BottledBeerCard/MinimalBottledBeerCardApi.jsx";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react"

export default function MyFavoritePage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);

    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetUsersFavBeersQuery(userProfile?.id, {skip: !userProfile || alias !== "beer"})
    const {data: barData, isLoading: barIsLoading, error: barError} = useGetUsersFavBarsQuery(userProfile?.id, {skip: !userProfile || alias !== "bar"})

    const selectors = {
        beer: {pathname: "Любимое пиво", data: beerData, isLoading: beerIsLoading, error: beerError, CardComponent: MinimalBottledBeerCardApi},
        bar: {pathname: "Любимые заведения", data: barData, isLoading: barIsLoading, error: barError, CardComponent: MinimalBarCard}
    }



    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: selectors[alias]?.pathname, path: ""}
    ]

    const barsCards = [
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
    ]



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
                    {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection cards={selectors[alias]?.data?.data} CardComponent={selectors[alias].CardComponent}></SimpleCatalogSection>}
                </div>
            </div>
        </div>
    )
}