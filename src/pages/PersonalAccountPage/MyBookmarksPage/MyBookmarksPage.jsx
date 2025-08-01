import styles from "./MyBookmarksPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    useGetUsersCuddyBarsQuery,
    useGetUsersCuddyBeersQuery,
} from "../../../store/services/centerBeer.js";
import MinimalBottledBeerCardApi from "../../../components/Cards/BottledBeerCard/MinimalBottledBeerCardApi.jsx";
import MinimalBarCard from "../../../components/Cards/BarCard/MinimalBarCard.jsx";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {lazy, Suspense, useEffect} from "react";
import MinimalBarCardApi from "../../../components/Cards/BarCard/MinimalBarCardApi.jsx";
import BreweryCard from "../../../components/Cards/BreweryCard/BreweryCard.jsx";
const PersonalAccount = lazy(() => import("../../../components/PersonalAccount/PersonalAccount.jsx"));
const PersonalAccountMobile = lazy(() => import("../../../components/PersonalAccount/PersonalAccountMobile.jsx"));

export default function MyBookmarksPage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);

    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetUsersCuddyBeersQuery(userProfile?.id, {skip: !userProfile || alias !== "beer"})
    const {data: barData, isLoading: barIsLoading, error: barError} = useGetUsersCuddyBarsQuery(userProfile?.id, {skip: !userProfile || alias !== "bar"})

    const selectors = {
        beer: {pathname: "Пиво в кладовке", data: beerData, isLoading: beerIsLoading, error: beerError, CardComponent: MinimalBottledBeerCardApi, alias: "bars"},
        bar: {pathname: "Заведения в кладовке", data: barData, isLoading: barIsLoading, error: barError, CardComponent: MinimalBarCardApi, alias: "bars"},
        brewery: {pathname: "Пивоварни в кладовке", data: {data: []}, isLoading: false, error: false, CardComponent: BreweryCard, alias: "distributors"},
        event: {pathname: "Мероприятия в кладовке", data: {data: []}, isLoading: false, error: false, CardComponent: MinimalBarCard, alias: "bars"},
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
                <Suspense>
                    {!isMobile && <PersonalAccount profile={userProfile}/>}
                </Suspense>
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <Suspense>
                        {isMobile && <PersonalAccountMobile alias="bookmarks" profile={userProfile}/>}
                    </Suspense>
                    <div className={styles.block}>
                        <div className={styles.row}>
                            <div className={styles.arrowButton} onClick={() => navigate("/account/")}><ArrowLeftIcon/></div>
                            <h2 className={`${styles.title} ma-h2-small`}>{selectors[alias]?.pathname}</h2>
                        </div>
                        {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection alias={selectors[alias]?.alias} cards={selectors[alias]?.data?.data} CardComponent={selectors[alias].CardComponent}></SimpleCatalogSection>}
                    </div>
                </div>
            </div>
        </div>
    )
}