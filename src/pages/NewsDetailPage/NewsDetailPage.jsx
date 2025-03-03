import NavChain from "../../components/Navigation/NavChain/NavChain.jsx";
import {getNewsDetailPaths} from "./NewsDetailPageData.jsx";
import NewsDetailSection from "../../components/NewsDetailSection/NewsDetailSection.jsx";


export default function NewsDetailPage(){

    return(
        <div className="content">
            <NavChain paths={getNewsDetailPaths()}/>
            <NewsDetailSection/>
        </div>
    )
}