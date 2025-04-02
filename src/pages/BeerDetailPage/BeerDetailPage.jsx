import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {
    getBeerDetailPaths,
    getBeerDetailReviewsHeader,
} from "./BeerDetailPageData.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import SimilarItems from "../../components/SimilarItems/SimilarItems.jsx";
import BarsRow from "../../components/BarsRow/BarsRow.jsx";
import BeerInfo from "../../components/DetailInfo/BeerInfo/BeerInfo.jsx";
import LightBarCard from "../../components/Cards/BarCard/LightBarCard.jsx";
import {useParams} from "react-router-dom";
import {useGetBeerInfoQuery} from "../../store/services/centerBeer.js";


export default function BeerDetailPage(){
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBeerInfoQuery(alias)

    const reviewsResume = (title) => {return {
        title: "Пиво нравится",
        rated: `${title} оценило 344 посетителя.`,
        rating: 4.9,
        description: "В среднем это на 15% выше, чем у других сортов пива в нашем рейтинге."
    }}

    return(
        <div className="content">
            {!isLoading && !error && data && data.length > 0 &&
                <>
                    <NavChain paths={[...getBeerDetailPaths(), {title:data[0]?.name, path: ""}]}/>
                    <BeerInfo beerInfo={data[0]}/>
                    <BarsRow title={data[0]?.name} barCards={data[0]?.sales_in_bars} marketCards={data[0]?.sales_in_markets} CardComponent={LightBarCard}/>
                    <SimilarItems title={data[0]?.name} cards={data[0]?.related_items}/>
                    <Reviews header={getBeerDetailReviewsHeader(data[0]?.name)} images={data[0]?.reviews_gallery} resume={reviewsResume(data[0]?.name)}/>
                </>
            }
        </div>
    )
}