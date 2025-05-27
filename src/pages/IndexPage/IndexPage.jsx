import IndexSection from "../../components/IndexSection/IndexSection.jsx";
import BeerMapSection from "../../components/BeerMapSection/BeerMapSection.jsx";
import BarNews from "../../components/BarNews/BarNews.jsx";
import NewsPhotoIndex from "../../assets/news-photo-index.svg"
import QuoteSection from "../../components/QuoteSection/QuoteSection.jsx";
import PopularPosts from "../../components/PopularPosts/PopularPosts.jsx";
import IndexVisitSection from "../../components/IndexVisitSection/IndexVisitSection.jsx";
import IndexEvents from "../../components/IndexEvents/IndexEvents.jsx";
import {useEffect} from "react";

export default function IndexPage(){
    useEffect(() => {
        document.title = `center.beer | Главная`
    }, []);

    return(
        <div className="content">
            <IndexSection></IndexSection>
            <IndexVisitSection/>
            <IndexEvents></IndexEvents>
            <BeerMapSection></BeerMapSection>
            <PopularPosts/>
            <BarNews description="О крафте, лучших заведениях и напитках" picture={NewsPhotoIndex}></BarNews>
            <QuoteSection></QuoteSection>
        </div>
    )
}