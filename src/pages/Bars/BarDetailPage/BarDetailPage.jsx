import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import BarInfo from "../../../components/DetailInfo/BarInfo/BarInfo.jsx";
import BarEvents from "../../../components/BarEvents/BarEvents.jsx";
import AdvantagesList from "../../../components/AdvantagesList/AdvantagesList.jsx";
import Gallery from "../../../components/Gallery/Gallery.jsx";
import CurrentPromos from "../../../components/CurrentPromos/CurrentPromos.jsx";
import BarMenu from "../../../components/BarMenu/BarMenu.jsx";
import {isMobile} from "react-device-detect";
import BarNews from "../../../components/BarNews/BarNews.jsx";
import Reviews from "../../../components/Reviews/Reviews.jsx";
import {
    getBarPagePaths,
    getBarPageFilterButtons,
    getBarPageFilters,
    getBarPageSections,
    getBarReviewsImages, getBarReviewsHeader, getBarReviewsResume
} from "./BarDetailPageData.jsx";
import {useGetBarEventsQuery, useGetBarInfoByIdQuery, useGetBarInfoQuery} from "../../../store/services/centerBeer.js";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import BeerMugsIcon from "../../../assets/beer-mugs-icon.svg?react"
import SausageIcon from "../../../assets/sausage-icon.svg?react"
import FlagsIcon from "../../../assets/flags-icon.svg?react"
import {getBeerDetailPaths} from "../../Beer/BeerDetailPage/BeerDetailPageData.jsx";


export default function BarDetailPage(){
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBarInfoQuery(alias)

    useEffect(() => {
        document.title = `center.beer | Бары: ${data?.data[0]?.name}`
    }, [data]);

    const menuRef = useRef(null)
    const promosRef = useRef(null)
    const newsRef = useRef(null)
    const sections = [
        {title: "меню", IconComponent: <SausageIcon/>, ref: menuRef},
        {title: "скидки и акции", IconComponent: <FlagsIcon/>, ref: promosRef},
        {title: "новости", IconComponent: <BeerMugsIcon/>, ref: newsRef}
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div className="content">
            {!isLoading && !error && data && data?.data?.length > 0 &&
                <>
                    <NavChain paths={[...getBarPagePaths(), {title: data?.data[0].name, path: ""}]}/>
                    <BarInfo barInfo={data?.data[0]} sections={sections}/>
                    <AdvantagesList barInfo={data?.data[0]}/>
                    <BarEvents barId={data?.data[0].id}/>
                    {data?.data[0]?.gallery?.length !== 0 && <Gallery pictures={data?.data[0].gallery}/>}
                    <BarMenu filters={getBarPageFilters()} filterButtons={getBarPageFilterButtons()} sections={getBarPageSections()} ref={menuRef}/>
                    <CurrentPromos barId={data?.data[0].id} ref={promosRef}/>
                    <BarNews barId={data?.data[0].id} ref={newsRef}/>
                    <Reviews images={getBarReviewsImages()} header={getBarReviewsHeader()} resume={getBarReviewsResume()}/>
                </>

            }
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}
