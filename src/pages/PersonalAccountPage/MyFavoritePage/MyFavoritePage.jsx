import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import styles from "../MyCheckinsPage/MyCheckinsPage.module.scss";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {
    useGetUsersFavBarsQuery,
    useGetUsersFavBeersQuery,
    useGetUsersFavBreweriesQuery
} from "../../../store/services/centerBeer.js";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import MinimalBottledBeerCardApi from "../../../components/Cards/BottledBeerCard/MinimalBottledBeerCardApi.jsx";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react"
import BreweryCard from "../../../components/Cards/BreweryCard/BreweryCard.jsx";
import {lazy, Suspense, useEffect} from "react";
import MinimalBarCardApi from "../../../components/Cards/BarCard/MinimalBarCardApi.jsx";
const PersonalAccountAlt = lazy(() => import("../../../components/PersonalAccount/PersonalAccountAlt/PersonalAccountAlt.jsx"));
const PersonalAccountMobile = lazy(() => import("../../../components/PersonalAccount/PersonalAccountMobile.jsx"));

export default function MyFavoritePage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const { isAuthorized, userProfile, userDashboard, isLoading: profileIsLoading } = useSelector((state) => state.auth);

    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetUsersFavBeersQuery(userProfile?.id, {skip: !userProfile || alias !== "beer"})
    const {data: barData, isLoading: barIsLoading, error: barError} = useGetUsersFavBarsQuery(userProfile?.id, {skip: !userProfile || alias !== "bar"})
    const {data: breweryData, isLoading: breweryIsLoading, error: breweryError} = useGetUsersFavBreweriesQuery(userProfile?.id, {skip: !userProfile || alias !== "bar"})


    const selectors = {
        beer: {pathname: "Любимое пиво", data: beerData?.data?.beer, isLoading: beerIsLoading, error: beerError, CardComponent: MinimalBottledBeerCardApi, alias: "bars"},
        bar: {pathname: "Любимые заведения", data: barData?.data?.bar, isLoading: barIsLoading, error: barError, CardComponent: MinimalBarCardApi, alias: "bars"},
        brewery: {pathname: "Любимые пивоварни", data: {data: breweryData?.data?.bar}, isLoading: breweryIsLoading, error: breweryError, CardComponent: BreweryCard, alias: "distributors"}
    }

    useEffect(() => {
        document.title = `center.beer | ${selectors[alias]?.pathname}`
    }, []);

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: selectors[alias]?.pathname, path: ""}
    ]

    if (!alias) navigate("/account/")
    if (!profileIsLoading && !isAuthorized) navigate("/login/")
    console.log(JSON.stringify(selectors[alias]?.data))
    return(
        <div className="content">
            <div style={{display: "flex"}}>
                <Suspense>
                    {!isMobile && <PersonalAccountAlt profile={userProfile} dashboard={userDashboard}/>}
                </Suspense>
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <NavChain paths={paths} customStyle="nav-chain-no-margin"></NavChain>
                    <div style={{height: "20px"}}/>
                    <Suspense>
                        {isMobile && <PersonalAccountMobile profile={userProfile} alias="favorite"/>}
                    </Suspense>
                    <div className={styles.block}>
                        <div className={styles.row}>
                            <div className={styles.arrowButton} onClick={() => navigate("/account/")}><ArrowLeftIcon/></div>
                            <h2 className={`${styles.title} ma-h2-small`}>{selectors[alias]?.pathname}</h2>
                        </div>
                        {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection alias={selectors[alias]?.alias} cards={selectors[alias]?.data} CardComponent={selectors[alias].CardComponent}></SimpleCatalogSection>}
                    </div>
                </div>
            </div>
        </div>
    )
}