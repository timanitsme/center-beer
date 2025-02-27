import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {
    getBreweryDetailBarsCards, getBreweryDetailFilters,
    getBreweryDetailPagePaths,
    getBreweryDetailReviewsHeader,
    getBreweryDetailReviewsImages,
    getBreweryDetailReviewsResume
} from "./BreweryDetailPageData.jsx";
import BarNews from "../../components/BarNews/BarNews.jsx";
import BarEvents from "../../components/BarEvents/BarEvents.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import BreweryInfo from "../../components/DetailInfo/BreweryInfo/BreweryInfo.jsx";
import BarsRow from "../../components/BarsRow/BarsRow.jsx";
import MinimalBarCard from "../../components/Cards/BarCard/MinimalBarCard.jsx";
import NewProduct1 from "../../assets/newProductsMocks/new-product-1.svg"
import NewProduct2 from "../../assets/newProductsMocks/new-product-2.svg"
import NewProduct3 from "../../assets/newProductsMocks/new-product-3.svg"
import NewProduct4 from "../../assets/newProductsMocks/new-product-4.svg"
import NewProduct5 from "../../assets/newProductsMocks/new-product-5.svg"
import PicturesList from "../../components/PicturesList/PicturesList.jsx";
import NewProducts from "../../components/NewProducts/NewProducts.jsx";
import BreweryHistory from "../../components/BreweryHistory/BreweryHistory.jsx";
import Excursions from "../../components/Excursions/Excursions.jsx";
import BeerCatalog from "../../components/Catalogs/BeerCatalog.jsx";
import BeerCatalogSection from "../../components/BeerCatalogSection/BeerCatalogSection.jsx";

export default function BreweryDetailPage(){
    const images = [NewProduct1, NewProduct2, NewProduct3, NewProduct4, NewProduct5, NewProduct2, NewProduct3, NewProduct4]

    return(
        <div className="content">
            <NavChain paths={getBreweryDetailPagePaths()}/>
            <BreweryInfo/>
            <BreweryHistory/>
            <BarEvents title="Новости"></BarEvents>
            <Gallery/>
            <BarsRow title="Где попробовать нашу продукцию" cards={getBreweryDetailBarsCards()} CardComponent={MinimalBarCard}/>
            <BeerCatalogSection filters={getBreweryDetailFilters()}/>
            <NewProducts images={images}/>
            <Reviews header={getBreweryDetailReviewsHeader()} images={getBreweryDetailReviewsImages()} resume={getBreweryDetailReviewsResume()}></Reviews>
            <Excursions/>
        </div>
    )
}