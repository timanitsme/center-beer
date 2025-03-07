import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import BarInfo from "../../components/DetailInfo/BarInfo/BarInfo.jsx";
import BarEvents from "../../components/BarEvents/BarEvents.jsx";
import AdvantagesList from "../../components/AdvantagesList/AdvantagesList.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import CurrentPromos from "../../components/CurrentPromos/CurrentPromos.jsx";
import BarMenu from "../../components/BarMenu/BarMenu.jsx";
import {isMobile} from "react-device-detect";
import BarNews from "../../components/BarNews/BarNews.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import {
    getBarPagePaths,
    getBarPageFilterButtons,
    getBarPageFilters,
    getBarPageSections,
    getBarReviewsImages, getBarReviewsHeader, getBarReviewsResume
} from "./BarDetailPageData.jsx";
import {useGetBarInfoQuery} from "../../store/services/centerBeer.js";
import {useParams} from "react-router-dom";


export default function BarDetailPage(){
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBarInfoQuery(alias)
    if (!isLoading && !error) console.log(JSON.stringify(data));
    return(
        <div className="content">
            <NavChain paths={getBarPagePaths()}/>
            {!isLoading && !error && data && data.length > 0 &&
                <>
                    <BarInfo barInfo={data[0]}/>
                    <BarEvents/>
                    <AdvantagesList barInfo={data[0]}/>
                    {data[0]?.gallery?.length !== 0 && <Gallery pictures={data[0].gallery}/>}
                    <BarMenu filters={getBarPageFilters()} filterButtons={getBarPageFilterButtons()} sections={getBarPageSections()}/>
                    <CurrentPromos/>
                    <BarNews/>
                    <Reviews images={getBarReviewsImages()} header={getBarReviewsHeader()} resume={getBarReviewsResume()}/>
                </>

            }
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}
