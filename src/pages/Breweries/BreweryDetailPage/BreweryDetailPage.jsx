import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {
    getBreweryDetailPagePaths,
    getBreweryDetailReviewsHeader,
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
import styles from "./BreweryDetailPage.module.scss"
import Excursions from "../../../components/Excursions/Excursions.jsx";
import NewProducts from "../../../components/NewProducts/NewProducts.jsx";
import LightBarCard from "../../../components/Cards/BarCard/LightBarCard.jsx";
import BarsRow from "../../../components/BarsRow/BarsRow.jsx";
import {useEffect, useRef, useState} from "react";
import BreweryHistoryApi from "../../../components/BreweryHistory/BreweryHistoryApi.jsx";
import FlagsIcon from "../../../assets/flags-icon.svg?react";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react"
import BarrelIcon from "../../../assets/barrel-icon.svg?react"
import PhoneIcon from "../../../assets/phone-icon.svg?react"
import newProductsBg from "../../../assets/bgPictures/new-products-bg.webp"

export default function BreweryDetailPage(){
    const images = [
        {type: "image", preview: NewProduct1},
        {type: "image", preview: NewProduct2},
        {type: "image", preview: NewProduct3},
        {type: "image", preview: NewProduct4},
        {type: "image", preview: NewProduct5},
        ]
    const {alias} = useParams();
    const {data, isLoading, error} = useGetBreweryInfoQuery(alias)
    const location = useLocation();
    const prevPath = location.state?.from || null;
    const navigate = useNavigate();
    const {data: beerMocks, isLoading: beerIsLoading, error: beerError} = useGetBeerInfoQuery("bumble-beer-yadernaya-utka-ipa")

    const newProductsRef = useRef(null)
    const eventsRef = useRef(null)
    const menuRef = useRef(null)
    const galleryRef = useRef(null)
    const excursionsRef = useRef(null)

    const [sections, setSections] = useState(
        [
            {title: "наши новинки", IconComponent: <BottlesPairIcon/>, ref: newProductsRef, hasSection: false},
            {title: "мероприятия", IconComponent: <FlagsIcon/>, ref: eventsRef, hasSection: false},
            {title: "ассортимент", IconComponent: <PhoneIcon/>, ref: menuRef, hasSection: true},
            {title: "фото", IconComponent: <PhoneIcon/>, ref: galleryRef, hasSection: false},
            {title: "экскурсии", IconComponent: <BarrelIcon/>, ref: excursionsRef, hasSection: false},
        ]
    )

    const setHasSection = (title) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.title === title ? {...section, hasSection: true} : section
            )
        );
    }

    useEffect(() => {
        document.title = `center.beer | Пивоварни: ${data?.[0]?.name}`
    }, [data]);

    const handleBack = () => {
        navigate(prevPath, { replace: true });
    };

    const reviewsResume = (title) => {return {
        title: "Продукция нравится",
        rated: `${title} оценило 344 посетителя.`,
        rating: 4.9,
        description: "В среднем это на 15% выше, чем у других пивоварен в нашем рейтинге."
    }}

    useEffect(() => {
        if (data?.[0]?.alias === "jaws"){
            setHasSection("мероприятия")
            setHasSection("наши новинки")
            setHasSection("экскурсии")
        }
        if (Array.isArray(data?.[0]?.gallery) && data?.[0]?.gallery.length > 0) {
            setHasSection("фото");
        } else {
            // Если галерея отсутствует, убедимся, что "фото" не активно
            setSections((prevSections) =>
                prevSections.map((section) =>
                    section.title === "фото" ? { ...section, hasSection: false } : section
                )
            );
        }

    }, [data]);

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
                    <BreweryInfo breweryInfo={data[0]} sections={sections}/>
                    {data[0]?.history_block && <BreweryHistoryApi stories={data[0]?.history_block}/>}
                    {data[0].alias === "jaws" && <BarEvents title="Новости" ref={eventsRef}></BarEvents>}
                    {data[0]?.gallery?.length !== 0 && <Gallery ref={galleryRef} pictures={data[0].gallery}/>}
                    <div style={{backgroundImage: `url(${newProductsBg})`}}>
                        {data[0].alias === "jaws" && <NewProducts images={images} ref={newProductsRef}/>}
                        {!beerIsLoading && !beerError && beerMocks[0]?.sales_in_bars && beerMocks[0]?.sales_in_markets && <BarsRow title="Где попробовать нашу продукцию" cards={beerMocks[0]?.sales_in_bars} marketCards={beerMocks[0]?.sales_in_markets} CardComponent={LightBarCard}/>}
                    </div>

                    <BeerCatalogSection withoutPrice={true} breweryId={data[0].id} ref={menuRef}/>
                    <Reviews header={getBreweryDetailReviewsHeader(data[0]?.name)} resume={reviewsResume(data[0]?.name)} id={data[0].id} alias="brewery"></Reviews>
                    {data[0].alias === "jaws" && <Excursions ref={excursionsRef}/>}
                </>
            }
        </div>
    )
}