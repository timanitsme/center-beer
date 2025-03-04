import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {getNewsDetailPaths} from "./NewsDetailPageData.jsx";
import NewsDetailSection from "../../components/NewsDetailSection/NewsDetailSection.jsx";
import NewsItem from "../../components/NewsItem/NewsItem.jsx";


export default function NewsDetailPage(){
    const tags = ["Цены", "Импорт", "Кадры"]
    return(
        <div className="content">
            <NavChain paths={getNewsDetailPaths()}/>
            <NewsDetailSection>
                <NewsItem tags={tags}/>
            </NewsDetailSection>
        </div>
    )
}