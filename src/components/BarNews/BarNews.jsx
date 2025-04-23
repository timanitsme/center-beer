import styles from "./BarNews.module.css"
import BeerCalendarIcon from "../../assets/beer-calendar-icon.svg?react";
import NewsPhoto from "../../assets/news-photo.svg";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import {useNavigate} from "react-router-dom";
import {useGetBarNewsQuery} from "../../store/services/centerBeer.js";

export default function BarNews({barId = 1, ref, description = "Будьте с нами, чтобы не пропустить ни одного яркого момента и всегда быть в курсе всех новостей и предложений бара.", picture = NewsPhoto}){
    const navigate = useNavigate()

    const {data: news, isLoading: newsIsLoading, error: newsError}  = useGetBarNewsQuery({bar_id: barId, lim: 5})

    const paths = [
        {title: "Новости", path: "/news"},
        {title: "Пиво", path: "/news"},
    ]

    if (!news || news?.length === 0 || newsIsLoading || newsError) return null

    return(
        <div className={styles.news} ref={ref}>
            <div className={styles.mobileHeader}>
                <div className={styles.newsIcon}><BeerCalendarIcon/></div>
                <h3>Новости</h3>
            </div>
            <div className={styles.newsHeader}>
                <ComponentHeader title="Новости" description={description} HeaderIcon={BeerCalendarIcon}/>
                <div className={styles.pictureContainer}>
                    <img src={picture} alt=""></img>
                </div>
            </div>
            <div className={styles.newsContainer}>
                {news.map(((item, index) => {
                    return(
                        <div key={index} className={styles.newsCard}>
                            <LightNavChain paths={paths}/>
                            <h3>{item?.title}</h3>
                            <div className="limited-text" dangerouslySetInnerHTML={{ __html: item?.text }} />
                            <div className="hrtLine" style={{margin: "10px 0"}}/>
                        </div>
                    )
                }))}
                <div className={styles.buttonContainer}>
                    <RoundLinkButton onClick={() => navigate("/news")} text="Все новости"></RoundLinkButton>
                </div>

            </div>
        </div>
    )
}