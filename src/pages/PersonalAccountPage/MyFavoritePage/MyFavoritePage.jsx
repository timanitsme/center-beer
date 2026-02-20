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
import {useState, useMemo} from "react";
const PersonalAccountAlt = lazy(() => import("../../../components/PersonalAccount/PersonalAccountAlt/PersonalAccountAlt.jsx"));
const PersonalAccountMobileAlt = lazy(() => import("../../../components/PersonalAccount/PersonalAccountMobileAlt/PersonalAccountMobileAlt.jsx"));

export default function MyFavoritePage(){
    const {alias} = useParams();
    const navigate = useNavigate()
    const { isAuthorized, userProfile, userDashboard, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const [lim, setLim] = useState(20);
    const [offset, setOffset] = useState(0);
    const filters = useMemo(() => ({
        lim,
        offset,
        ts: Date.now()
    }), [lim, offset]);

    const {data: beerData, isLoading: beerIsLoading, isFetching: beerIsFetching, error: beerError} = useGetUsersFavBeersQuery(filters, {skip: !userProfile || alias !== "beer"})
    const {data: barData, isLoading: barIsLoading, isFetching: barIsFetching, error: barError} = useGetUsersFavBarsQuery(filters, {skip: !userProfile || alias !== "bar"})
    const {data: breweryData, isLoading: breweryIsLoading, isFetching: breweryIsFetching, error: breweryError} = useGetUsersFavBreweriesQuery(filters, {skip: !userProfile || alias !== "brewery"})
    const [allCards, setAllCards] = useState([])

    const selectors = {
        beer: {pathname: "Любимое пиво", data: beerData?.data?.beer?.data, totalItems: beerData?.data?.beer?.total_items, isFetching: beerIsFetching, isLoading: beerIsLoading, error: beerError, CardComponent: MinimalBottledBeerCardApi, alias: "bars"},
        bar: {pathname: "Любимые заведения", data: barData?.data?.bar?.data, totalItems: barData?.data?.bar?.total_items, isFetching: barIsFetching, isLoading: barIsLoading, error: barError, CardComponent: MinimalBarCardApi, alias: "bars"},
        brewery: {pathname: "Любимые пивоварни", data: breweryData?.data?.brewery?.data, totalItems: breweryData?.data?.brewery?.total_items, isFetching: breweryIsFetching, isLoading: breweryIsLoading, error: breweryError, CardComponent: BreweryCard, alias: "distributors"}
    }

    useEffect(() => {
        document.title = `center.beer | ${selectors[alias]?.pathname}`
    }, []);


    useEffect(() => {
        if (!selectors[alias].isFetching && selectors[alias].data){
            if (offset !== 0){
                setAllCards(prev => [
                    ...prev,
                    ...selectors[alias].data.filter(newCard =>
                        !prev.some(existingCard => existingCard.id === newCard.id)
                    )
                ]);
            }
            else{
                setAllCards([...selectors[alias].data])
            }
        }

    }, [selectors[alias].isFetching]);

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: selectors[alias]?.pathname, path: ""}
    ]

    const handleShowMore = () => {
        const newOffset = offset + lim;
        setOffset(newOffset)
    }

    if (!alias) navigate("/account/")
    if (!profileIsLoading && !isAuthorized) navigate("/login/")
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
                        {isMobile && <PersonalAccountMobileAlt dashboard={userDashboard} profile={userProfile} alias="favorite"/>}
                    </Suspense>
                    <div className={styles.block}>
                        <div className={styles.row}>
                            <div className={styles.arrowButton} onClick={() => navigate("/account/")}><ArrowLeftIcon/></div>
                            <h2 className={`${styles.title} ma-h2-small`}>{selectors[alias]?.pathname}</h2>
                        </div>
                        {selectors[alias].data && !selectors[alias].isLoading && !selectors[alias].error && <SimpleCatalogSection alias={selectors[alias]?.alias} cards={allCards} isFetching={selectors[alias]?.isFetching} CardComponent={selectors[alias].CardComponent} totalItems={selectors[alias]?.totalItems} onShowMore={handleShowMore}></SimpleCatalogSection>}
                    </div>
                </div>
            </div>
        </div>
    )
}