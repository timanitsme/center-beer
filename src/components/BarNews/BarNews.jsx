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

    const {data: news, isLoading: newsIsLoading, error: newsError}  = useGetBarNewsQuery({bar_id: barId, limit: 5})

    /*const news = [
        {title: "Крупнейшие российские производители пива предупредили о повышении цен вплоть до 15%", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля."},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Производитель Marlboro избавится от 35 млн акций пивоваренной компании. Altria стала владельцем доли в AB InBev в ходе слияния с SABMiller, в которой ей принадлежало 27 процентов. В результате слияния Altria получила 9,6 процента объединённой компании, два места в совете директоров и ещё около 5 млрд долларов наличными. Сегодня общая доля Altria в AB InBev оценивается примерно в 12,7 млрд долларов. AB InBev сообщила, что акции на 200 млн у Altria она выкупит самостоятельно."},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.\n" +
                "Николаев заявил, что республика будет работать над максимальным сохранением своей доли в производстве хмеля в России."},
        {title: "Отходы пивоварения использовали для извлечения металлов из отходов электроники", description: "Австрийские биотехнологи обнаружили, что отработанные пивные дрожжи можно использовать для извлечения ценных металлов из старой электротехники и отходов промышленного производства.\n" +
                "Результаты исследования представлены в статье в журнале Frontiers in Bioengineering and Biotechnology."},

    ]*/

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
                            <p className="limited-text">{item?.text}</p>
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