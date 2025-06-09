import styles from "./NewsCatalog.module.css"
import SimpleCatalogSection from "../../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import NewsCard from "../../Cards/NewsCard/NewsCard.jsx";
import MainNewsCard from "../../../assets/newsMocks/news-main-card.svg"
import {useGetNewsQuery} from "../../../store/services/centerBeer.js";
import NewsCardSkeleton from "../../Skeletons/NewsCardSkeleton/NewsCardSkeleton.jsx";

export default function NewsCatalog(){
    const {data: news, isLoading: newsIsLoading, error: newsError, isFetching: newsIsFetching} = useGetNewsQuery({global_news: true})
    const mainCard = {title: "Найти бармена в 2024 году. К чему приведет дефицит кадров в общепите", date: "21.01.2025", tags: ["цены","импорт","кадры"]}
    return(
        <div>
            <div className={styles.mainCard}>
                <img src={MainNewsCard} alt=""></img>
                <div className={styles.mainCardDescription}>
                    <p>{mainCard.date}</p>
                    <h2>{mainCard.title}</h2>
                    <div className={styles.tagsRow}>
                        {mainCard.tags.map((tag, index) =>
                            <div key={index} className={styles.tag}><p>{tag}</p></div>
                        )}
                    </div>
                </div>
            </div>
            <SimpleCatalogSection isFetching={newsIsFetching} SkeletonCardComponent={NewsCardSkeleton} CardComponent={NewsCard} cards={news?.data} totalItems={news?.["total_items"]}></SimpleCatalogSection>
        </div>
    )
}