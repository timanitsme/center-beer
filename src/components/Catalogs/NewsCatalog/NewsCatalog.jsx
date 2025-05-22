import styles from "./NewsCatalog.module.css"
import NewsCard1 from "../../../assets/newsMocks/news-card-1.svg"
import NewsCard2 from "../../../assets/newsMocks/news-card-2.svg"
import NewsCard3 from "../../../assets/newsMocks/news-card-3.svg"
import NewsCard4 from "../../../assets/newsMocks/news-card-4.svg"
import NewsCard5 from "../../../assets/newsMocks/news-card-5.svg"
import NewsCard6 from "../../../assets/newsMocks/news-card-6.svg"
import NewsCard7 from "../../../assets/newsMocks/news-card-7.svg"
import NewsCard8 from "../../../assets/newsMocks/news-card-8.svg"
import NewsCard9 from "../../../assets/newsMocks/news-card-9.svg"
import NewsCard10 from "../../../assets/newsMocks/news-card-10.svg"
import NewsCard11 from "../../../assets/newsMocks/news-card-11.svg"
import NewsCard12 from "../../../assets/newsMocks/news-card-12.svg"
import SimpleCatalogSection from "../../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import NewsCard from "../../Cards/NewsCard/NewsCard.jsx";
import MainNewsCard from "../../../assets/newsMocks/news-main-card.svg"
import {useGetNewsQuery} from "../../../store/services/centerBeer.js";

export default function NewsCatalog(){
    const {data: news, isLoading: newsIsLoading, error: newsError} = useGetNewsQuery({global_news: true})
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
            {news && !newsIsLoading && !newsError && <SimpleCatalogSection CardComponent={NewsCard} cards={news.data}></SimpleCatalogSection>}
        </div>
    )
}