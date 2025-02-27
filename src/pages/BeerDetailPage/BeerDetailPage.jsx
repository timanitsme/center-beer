import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {
    getBeerDetailBarsRowCards,
    getBeerDetailPaths,
    getBeerDetailReviewsHeader,
    getBeerDetailReviewsImages,
    getBeerDetailReviewsResume
} from "./BeerDetailPageData.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import SimilarItems from "../../components/SimilarItems/SimilarItems.jsx";
import BarsRow from "../../components/BarsRow/BarsRow.jsx";
import BeerInfo from "../../components/DetailInfo/BeerInfo/BeerInfo.jsx";
import LightBarCard from "../../components/Cards/BarCard/LightBarCard.jsx";


export default function BeerDetailPage(){
    return(
        <div className="content">
            <NavChain paths={getBeerDetailPaths()}/>
            <BeerInfo/>
            <BarsRow title="Где попробовать Czech Pilsner" cards={getBeerDetailBarsRowCards()} CardComponent={LightBarCard}/>
            <SimilarItems/>
            <Reviews header={getBeerDetailReviewsHeader()} images={getBeerDetailReviewsImages()} resume={getBeerDetailReviewsResume()}/>
        </div>
    )
}