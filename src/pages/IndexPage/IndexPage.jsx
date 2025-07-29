import IndexSection from "../../components/IndexSection/IndexSection.jsx";
import BeerMapSection from "../../components/BeerMapSection/BeerMapSection.jsx";
import BarNews from "../../components/BarNews/BarNews.jsx";
import NewsPhotoIndex from "../../assets/news-photo-index.svg"
import QuoteSection from "../../components/QuoteSection/QuoteSection.jsx";
import PopularPosts from "../../components/PopularPosts/PopularPosts.jsx";
import IndexVisitSection from "../../components/IndexVisitSection/IndexVisitSection.jsx";
import IndexEvents from "../../components/IndexEvents/IndexEvents.jsx";
import {useEffect} from "react";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp";
import newProductsBg from "../../assets/bgPictures/new-products-bg.webp";
import indexBubblesBg from "../../assets/bgPictures/index-bubbles-bg.webp"

export default function IndexPage(){
    useEffect(() => {
        document.title = `center.beer | Главная`
    }, []);

    return(
        <div className="content">
            <div >
                <IndexSection></IndexSection>
            </div>

            <div style={{backgroundImage: `url(${newProductsBg})`, backgroundRepeat: 'no-repeat'}}>
                <IndexVisitSection/>
            </div>

            <div style={{backgroundImage: `url(${contactsBg})`, backgroundRepeat: 'no-repeat'}}>
                <IndexEvents></IndexEvents>
                <BeerMapSection></BeerMapSection>
            </div>
            <PopularPosts/>
            <BarNews description="О крафте, лучших заведениях и напитках" picture={NewsPhotoIndex}></BarNews>
            <QuoteSection></QuoteSection>
        </div>
    )
}