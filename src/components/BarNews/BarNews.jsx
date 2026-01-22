import styles from "./BarNews.module.scss"
import BeerCalendarIcon from "../../assets/beer-calendar-icon.svg?react";
import NewsPhoto from "../../assets/news-photo.svg";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import {useNavigate} from "react-router-dom";
import {useGetBarNewsQuery, useGetBreweryNewsQuery} from "../../store/services/centerBeer.js";
import {useState} from "react";
import {current} from "@reduxjs/toolkit";

export default function BarNews({id = 1, alias = "bar", ref=null, description = "Будьте с нами, чтобы не пропустить ни одного яркого момента и всегда быть в курсе всех новостей и предложений бара.", picture = NewsPhoto}){
    const navigate = useNavigate()
    const [unlimitedNews, setUnlimitedNews] = useState(new Set())
    const {data: barNews, isLoading: barNewsIsLoading, error: barNewsError}  = useGetBarNewsQuery({bar_id: id, lim: 5}, {skip: alias !== "bar"})
    const {data: breweryNews, isLoading: breweryNewsIsLoading, error: breweryNewsError}  = useGetBreweryNewsQuery({brew_id: id, lim: 5}, {skip: alias !== "brewery"})

    const newsData = {
        bar: {data: barNews, isLoading: barNewsIsLoading, error: barNewsError},
        brewery: {data: breweryNews, isLoading: breweryNewsIsLoading, error: breweryNewsError}
    }

    const currentNews = newsData[alias]

    const paths = [
        {title: "Новости", path: "/news"},
        {title: "Пиво", path: "/news"},
    ]

    if (!currentNews.data || currentNews.data?.length === 0 || currentNews.isLoading || currentNews.error) return null

    function parseEmojis(htmlText) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const emojiElements = doc.querySelectorAll("i.emoji");

        emojiElements.forEach((emoji) => {
            const style = emoji.getAttribute("style");
            const urlMatch = style?.match(/url\(['"]?(.*?)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
                const emojiUrl = urlMatch[1];

                const img = document.createElement("img");
                img.src = emojiUrl;
                img.alt = "Emoji";
                img.style.width = "16px";
                img.style.height = "16px";

                emoji.replaceWith(img);
            }
        });


        let firstChild = doc.body.firstChild;
        while (firstChild && firstChild.tagName === "BR") {
            firstChild.remove();
            firstChild = doc.body.firstChild;
        }

        return doc.body.innerHTML;
    }

    return(
        <div id="bar-news" className={styles.news} ref={ref}>
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
                {currentNews.data.data.map(((item, index) => {
                    const idNum = Number(item.id)
                    const unlimited = unlimitedNews.has(idNum);
                    return(
                        <a key={index} className={styles.newsCard} href={item?.url} target="_blank" rel="noopener noreferrer">
                            <LightNavChain paths={paths}/>
                            {/*<h3 className="ma-h3-small">{item?.title}</h3>*/}
                            <div className={`${unlimited? "": "limited-text-7"} ${styles.newsText}`} dangerouslySetInnerHTML={{ __html: parseEmojis(item?.text) }} />
                            <p onClick={(e) => {
                                e.preventDefault();
                                setUnlimitedNews(prev => {
                                    const newSet = new Set(prev);
                                    newSet.add(idNum);
                                    return newSet;
                                });
                            }} className={` ${styles.expand} ${unlimited? styles.none: ""}`}>Читать полностью</p>
                            <p onClick={(e) => {
                                e.preventDefault();
                                setUnlimitedNews(prev => {
                                    const newSet = new Set(prev);
                                    newSet.delete(idNum);
                                    return newSet;
                                });
                            }}  className={`${styles.expand} ${unlimited? "": styles.none}`}>Свернуть</p>
                            <div className="hrtLine" style={{margin: "10px 0"}}/>
                        </a>
                    )
                }))}
                <div className={styles.buttonContainer}>
                    <RoundLinkButton onClick={() => navigate("/news")} text="Все новости"></RoundLinkButton>
                </div>

            </div>
        </div>
    )
}