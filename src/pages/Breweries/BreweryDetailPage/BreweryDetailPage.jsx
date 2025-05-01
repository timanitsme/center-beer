import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {
    getBreweryDetailFilters,
    getBreweryDetailPagePaths,
    getBreweryDetailReviewsHeader,
    getBreweryDetailReviewsImages,
    getBreweryDetailReviewsResume
} from "./BreweryDetailPageData.jsx";
import BarEvents from "../../../components/BarEvents/BarEvents.jsx";
import Gallery from "../../../components/Gallery/Gallery.jsx";
import Reviews from "../../../components/Reviews/Reviews.jsx";
import BreweryInfo from "../../../components/DetailInfo/BreweryInfo/BreweryInfo.jsx";
import NewProduct1 from "../../../assets/newProductsMocks/new-product-1.svg"
import NewProduct2 from "../../../assets/newProductsMocks/new-product-2.svg"
import NewProduct3 from "../../../assets/newProductsMocks/new-product-3.svg"
import NewProduct4 from "../../../assets/newProductsMocks/new-product-4.svg"
import NewProduct5 from "../../../assets/newProductsMocks/new-product-5.svg"
import {useGetBeerInfoQuery, useGetBreweryInfoQuery} from "../../../store/services/centerBeer.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import BeerCatalogSection from "../../../components/BeerCatalogSection/BeerCatalogSection.jsx";
import IconButton from "../../../components/Buttons/IconButton/IconButton.jsx";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react"
import styles from "./BreweryDetailPage.module.css"

export default function BreweryDetailPage(){
    const images = [NewProduct1, NewProduct2, NewProduct3, NewProduct4, NewProduct5, NewProduct2, NewProduct3, NewProduct4]
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBreweryInfoQuery(alias)
    const location = useLocation();
    const prevPath = location.state?.from || null;
    const navigate = useNavigate();
    console.log(prevPath)

    const handleBack = () => {
        navigate(prevPath, { replace: true });
    };

    const reviewsResume = (title) => {return {
        title: "Продукция нравится",
        rated: `${title} оценило 344 посетителя.`,
        rating: 4.9,
        description: "В среднем это на 15% выше, чем у других пивоварен в нашем рейтинге."
    }}

    return(
        <div className="content">
            {!isLoading && !error && data && data.length > 0 &&
                <>
                    {prevPath && (
                        <button
                            className={styles.backButton}
                            onClick={handleBack}
                        >
                            ← Назад
                        </button>
                    )}
                    <NavChain paths={[...getBreweryDetailPagePaths(), {title:data[0]?.name, path: ""}]}/>
                    <BreweryInfo breweryInfo={data[0]}/>
                    {/*<BreweryHistory/>*/}
                    {/*<BarEvents title="Новости"></BarEvents>*/}
                    <Gallery pictures={data[0].gallery}/>
                    {/*<BarsRow title="Где попробовать нашу продукцию" cards={getBreweryDetailBarsCards()} CardComponent={MinimalBarCard}/>*/}
                    <BeerCatalogSection breweryId={data[0].id}/>
                    {/*<NewProducts images={images}/>*/}
                    <Reviews header={getBreweryDetailReviewsHeader(data[0]?.name)} resume={reviewsResume(data[0]?.name)}></Reviews>
                    {/*<Excursions/>*/}
                </>
            }
        </div>
    )
}