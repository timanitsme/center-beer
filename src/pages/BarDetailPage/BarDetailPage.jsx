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


export default function BarDetailPage(){

    return(
        <div className="content">
            <NavChain paths={getBarPagePaths()}/>
            <BarInfo/>
            <BarEvents/>
            <AdvantagesList/>
            <Gallery/>
            <BarMenu filters={getBarPageFilters()} filterButtons={getBarPageFilterButtons()} sections={getBarPageSections()}/>
            <CurrentPromos/>
            <BarNews/>
            <Reviews images={getBarReviewsImages()} header={getBarReviewsHeader()} resume={getBarReviewsResume()}/>
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}
