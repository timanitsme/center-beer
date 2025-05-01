import BarImage1 from "../../../assets/barsMocks/bar-3.svg";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import styles from "../MyCheckinsPage/MyCheckinsPage.module.css";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import MinimalBarCard from "../../../components/Cards/BarCard/MinimalBarCard.jsx";
import {useGetUsersFavBarsQuery, useGetUsersFavBeersQuery} from "../../../store/services/centerBeer.js";

export default function MyFavoritePage(){
    const selectors = {
        beer: {pathname: "Любимое пиво", hook: useGetUsersFavBeersQuery},
        bar: {pathname: "Любимые бары", hook: useGetUsersFavBarsQuery}
    }

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: "Чек-ины", path: ""}
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

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccount isMobile={true}/>}
                    <h2 className={styles.title}>Чек-ины пива</h2>
                    <SimpleCatalogSection cards={barsCards} CardComponent={MinimalBarCard}></SimpleCatalogSection>
                </div>
            </div>
        </div>
    )
}