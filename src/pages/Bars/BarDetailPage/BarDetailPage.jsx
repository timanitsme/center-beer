import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import BarInfo from "../../../components/DetailInfo/BarInfo/BarInfo.jsx";
import BarEvents from "../../../components/BarEvents/BarEvents.jsx";
import AdvantagesList from "../../../components/AdvantagesList/AdvantagesList.jsx";
import Gallery from "../../../components/Gallery/Gallery.jsx";
import CurrentPromos from "../../../components/CurrentPromos/CurrentPromos.jsx";
import {isMobile} from "react-device-detect";
import BarNews from "../../../components/BarNews/BarNews.jsx";
import Reviews from "../../../components/Reviews/Reviews.jsx";
import {
    getBarPagePaths,
    getBarReviewsImages, getBarReviewsHeader, getBarReviewsResume
} from "./BarDetailPageData.jsx";
import {useGetBarInfoQuery} from "../../../store/services/centerBeer.js";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import BeerMugsIcon from "../../../assets/beer-mugs-icon.svg?react"
import SausageIcon from "../../../assets/sausage-icon.svg?react"
import FlagsIcon from "../../../assets/flags-icon.svg?react"
import BarMenuContainer from "../../../components/BarMenu/BarMenuContainer/BarMenuContainer.jsx";
import barEventsBg from "../../../assets/bgPictures/bar-events-n-gallery.webp"

export default function BarDetailPage(){
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBarInfoQuery(alias)
    const [searchParams] = useSearchParams();
    const menuAlias = searchParams.get('menu');

    useEffect(() => {
        document.title = `center.beer | Бары: ${data?.data[0]?.name}`
    }, [data]);

    const menuRef = useRef(null)
    const promosRef = useRef(null)
    const newsRef = useRef(null)

    const [isMenuReady, setIsMenuReady] = useState(false);

    const sections = [
        {title: "меню", IconComponent: <SausageIcon/>, ref: menuRef},
        {title: "скидки и акции", IconComponent: <FlagsIcon/>, ref: promosRef},
        {title: "новости", IconComponent: <BeerMugsIcon/>, ref: newsRef}
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (menuAlias && isMenuReady && menuRef.current) {
            menuRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [menuAlias, isMenuReady, menuRef]);

    useEffect(() => {
        console.log(`menu ready: ${isMenuReady}`)
    }, [isMenuReady])

    const handleMenuReady = () => {
        setIsMenuReady(true);
    };

    return(
        <div className="content">
            {!isLoading && !error && data && data?.data?.length > 0 && data?.data?.[0]?.id &&
                <>
                    <NavChain paths={[...getBarPagePaths(), {title: data?.data[0].name, path: ""}]}/>
                    <BarInfo barInfo={data?.data[0]} sections={data?.data[0].alias === "13rules_suchevskiy_val"?  [...sections, {title: "Забронировать мероприятие", IconComponent: <FlagsIcon/>, path: "events"}]: sections}/>
                    <div style={{backgroundImage: `url(${barEventsBg})`, backgroundRepeat: 'no-repeat'}}>
                        <AdvantagesList barInfo={data?.data[0]}/>
                        <BarEvents id={data?.data[0].id}/>
                        {data?.data[0]?.gallery?.length !== 0 && <Gallery pictures={data?.data[0].gallery}/>}
                    </div>
                    {/*<BarMenu filters={getBarPageFilters()} filterButtons={getBarPageFilterButtons()} sections={getBarPageSections()} ref={menuRef} barId={Number(data?.data?.[0]?.id)}/>*/}
                    <BarMenuContainer ref={menuRef} barId={Number(data?.data?.[0]?.id)} onReady={handleMenuReady}/>
                    <CurrentPromos barId={data?.data[0].id} ref={promosRef}/>
                    <BarNews id={data?.data[0].id} ref={newsRef}/>
                    <Reviews images={getBarReviewsImages()} header={getBarReviewsHeader()} resume={getBarReviewsResume()} id={data?.data[0].id} alias="bar"/>
                </>

            }
            {!isMobile && <div style={{height: "200px"}}></div>}
        </div>
    )
}
