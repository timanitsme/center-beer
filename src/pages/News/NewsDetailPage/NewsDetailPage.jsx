import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {getNewsDetailPaths} from "./NewsDetailPageData.jsx";
import NewsDetailSection from "../../../components/NewsDetailSection/NewsDetailSection.jsx";
import NewsItem from "../../../components/NewsItem/NewsItem.jsx";
import {useParams} from "react-router-dom";
import {useGetNewsItemQuery} from "../../../store/services/centerBeer.js";
import {useEffect} from "react";
import NewsMobileSection from "../../../components/NewsMobileSection/NewsMobileSection.jsx";



export default function NewsDetailPage(){
    const {id} = useParams();
    const {data, isLoading, error} = useGetNewsItemQuery(id)

    useEffect(() => {
        document.title = `center.beer | Новости: ${data?.title}`
    }, [data]);

    return(
        <div className="content">
            {!isLoading && !error && data &&
                <>
                    <NavChain paths={[...getNewsDetailPaths(), {title: data?.title, path: ""}]}/>
                    <NewsMobileSection withInput={false}/>
                    <NewsDetailSection postId={data?.id}>
                        <NewsItem newsInfo={data}/>
                    </NewsDetailSection>
                </>
            }
        </div>
    )
}