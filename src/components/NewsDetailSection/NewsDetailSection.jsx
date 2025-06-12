import styles from "./NewsDetailSection.module.css"
import Search from "../Inputs/Search/Search.jsx";
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react"
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import FavsIcon from "../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react";
import Ad1 from "../../assets/adsMocks/ad-1.svg"
import {useState} from "react";
import NewsContentImage1 from "../../assets/newsMocks/news-content-image-1.svg"
import QuoteIcon from "../../assets/quote-icon.svg?react"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import BlogImage1 from "../../assets/newsMocks/blog-image-1.svg"
import BlogImage2 from "../../assets/newsMocks/blog-image-2.svg"
import BlogImage3 from "../../assets/newsMocks/blog-image-3.svg"
import NewsItem from "../NewsItem/NewsItem.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import {Link, useNavigate} from "react-router-dom";


export default function NewsDetailSection({style = "detail", children}){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const sectionMenuMainItems = [
        {title: "Новости и комментарии", path: "/in-dev"},
        {title: "Статьи и интервью", path: "/in-dev"},
        {title: "Переводы", path: "/in-dev"},
        {title: "Новинки недели", path: "/in-dev"}
    ]
    const sectionMenuSecondaryItems = [
        {title: "Пиво Pro", path: "/in-dev"},
        {title: "Пиво Life", path: "/in-dev"},
        {title: "Сидр, пуаре, медовуха", path: "/in-dev"},
        {title: "Законы", path: "/in-dev"},
        {title: "Технологии", path: "/in-dev"},
        {title: "Вино и крепкий алкоголь", path: "/in-dev"},
        {title: "Трезвость", path: "/in-dev"},
        {title: "Видеоканал", path: "/in-dev"}]

    const paths = [
        {title: "Новости"},
        {title: "Бары и магазины"}
    ]

    const cards = [
        {title: "Крупнейшие российские производители пива предупреждают", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля.", img: BlogImage1},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Табачный гигант Altria Group сообщил о планах продать акции компании AB InBev более чем на 2,2 млрд долларов.", img: BlogImage2},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.", img: BlogImage3},
    ]
    const navigate = useNavigate()

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                <Search text="Поиск по статьям"/>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuMainItems.map((item, index) =>
                        <Link key={index} to={item.path}>{item.title}</Link>
                    )}
                </div>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuSecondaryItems.map((item, index) =>
                        <Link key={index} to={item.path}>{item.title}</Link>
                    )}
                </div>
            </div>
            <div className={styles.section}>
                { style === "detail" && <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <Link to={"/news"}><ArrowBackIcon/></Link>
                        <LightNavChain paths={paths}/>
                    </div>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>}
                { style === "regular" && <div className={styles.sectionHeader}>
                    <ComboBox options={["По умолчанию"]}></ComboBox>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>}
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        {children}
                    </div>
                    <div className={styles.contentSide}>
                        <img src={Ad1} alt=""></img>
                        {style === "detail" &&
                            <>
                                <h3>Похожие статьи</h3>
                                {cards.map((card, index) =>
                                    <div key={index} className={styles.blogCard}>
                                        <p className={styles.cardTextPrimary}>{card.title}</p>
                                        <img className={styles.cardImg} src={card.img} alt=""/>
                                        <p className={styles.cardDescription}>{card.description}</p>
                                    </div>
                                )}
                            </>
                        }
                        {style === "detail" && <div className={styles.sideButtons}><RoundLinkButton onClick={() => navigate("/news")} text="Все статьи"/></div>}


                    </div>
                </div>
            </div>
        </div>
    )
}