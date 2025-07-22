import styles from "./NewsCatalog.module.scss"
import SimpleCatalogSection from "../../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import NewsCard from "../../Cards/NewsCard/NewsCard.jsx";
import MainNewsCard from "../../../assets/newsMocks/news-main-card.svg"
import {useGetNewsQuery} from "../../../store/services/centerBeer.js";
import NewsCardSkeleton from "../../Skeletons/NewsCardSkeleton/NewsCardSkeleton.jsx";

export default function NewsCatalog({searchText = ""}){
    const {data: news, isLoading: newsIsLoading, error: newsError, isFetching: newsIsFetching} = useGetNewsQuery({global_news: true, search_text: searchText})
    const mainCard = {title: "Найти бармена в 2024 году. К чему приведет дефицит кадров в общепите", date: "21.01.2025", tags: ["цены","импорт","кадры"]}
    console.log(JSON.stringify(searchText))
    return(
        <div>
            <div className={styles.mainCard}>
                <img src={MainNewsCard} alt=""></img>
                <div className={styles.mainCardDescription}>
                    <p className="ma-p1">{mainCard.date}</p>
                    <h2 className="ma-h2">{mainCard.title}</h2>
                    <div className={styles.tagsRow}>
                        {mainCard.tags.map((tag, index) =>
                            <div key={index} className={styles.tag}><p className="text-small">{tag}</p></div>
                        )}
                    </div>
                </div>
            </div>
            <SimpleCatalogSection alias="news" isFetching={newsIsFetching} SkeletonCardComponent={NewsCardSkeleton} CardComponent={NewsCard} cards={news?.data} totalItems={news?.["total_items"]}></SimpleCatalogSection>
        </div>
    )
}