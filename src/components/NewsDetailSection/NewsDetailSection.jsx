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


export default function NewsDetailSection(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const sectionMenuMainItems = ["Новости и комментарии", "Статьи и интервью", "Переводы", "Новинки недели"]
    const sectionMenuSecondaryItems = ["Пиво Pro", "Пиво Life", "Сидр, пуаре, медовуха", "Законы", "Технологии", "Вино и крепкий алкоголь", "Трезвость", "Видеоканал"]
    const paths = [
        {title: "Новости"},
        {title: "Бары и магазины"}
    ]
    const tags = ["Цены", "Импорт", "Кадры"]

    const cards = [
        {title: "Крупнейшие российские производители пива предупреждают", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля.", img: BlogImage1},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Табачный гигант Altria Group сообщил о планах продать акции компании AB InBev более чем на 2,2 млрд долларов.", img: BlogImage2},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.", img: BlogImage3},
    ]

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                <Search text="Поиск по статьям"/>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuMainItems.map((item, index) =>
                        <a key={index}>{item}</a>
                    )}
                </div>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuSecondaryItems.map((item, index) =>
                        <a key={index}>{item}</a>
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <a><ArrowBackIcon/></a>
                        <LightNavChain paths={paths}/>
                    </div>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        <h2>AB InBev оценивает потери от неудачи маркетологов Bud Light в 1,4 млрд долларов</h2>
                        <p>27 декабря 2024</p>
                        <img src={NewsContentImage1} className={styles.mainImage} alt=""></img>
                        <p>Пивоваренная компания AB InBev могла потерять вплоть до 1,4 млрд долларов продаж из-за бойкота потребителями после сотрудничества бренда Bud Light с инфлюенсером Дилан Малвейни.</p>
                            <p>По итогам 2023 года компания получила рекордную выручку, однако заявила, что в США её «потенциал роста оказался ограничен», так как продажи снизились из-за бойкота. Выручка в органическом выражении в Северной Америке сократилась на 1,4 млрд долларов, в основном за счёт сокращения продаж Bud Light, который даёт компании львиную долю выручки.</p>
                        <div className={styles.quote}>
                            <QuoteIcon/>
                            <div className={styles.quoteContent}>
                                <p>С мая по февраль Bud Light смог восстановить только 1,2 процентного пункта потерянной доли рынка, рассказал исполнительный директор компании Мишель Дукерис во время конференц-колла с инвесторами. Он отметил что восстановление ускорилось, однако за три-четыре недели восстанавливается только 0,1-0,2 процентного пункта.</p>
                                <p>— Это не настолько быстрый темп, как мы ожидали и к чему мы стремились. Но, несмотря на это прогресс есть, — заявил Дукерис.</p>
                            </div>
                        </div>
                        <p>Продажи Bud Light начали падать в апреле: потребители стали бойкотировать бренд после того, как инфлюенсер Дилан Малвейни разместила в соцсети пост с персонализированной банкой Bud Light. Многие американцы, в том числе владельцы баров и магазинов, ошибочно сочли, что реклама с участием Малвейни вышла на телевидении или что банки с её изображением появились в продаже. На самом деле банка, показанная инфлюенсером в соцсети, была изготовлена в единственном экземпляре при помощи термоусадочной плёнки. По данным американо-канадского политического комментатора Стивена Краудера, за это компания Anheuser-Busch заплатила Дилан Малвейни 185 тысяч долларов.</p>
                        <p>Рыночная капитализация компании Anheuser-Busch на фоне недовольства части потребителей снизилась более чем на 6 млрд долларов. По сообщениям СМИ, никто из высшего руководства компании не был в курсе готовящего сотрудничества с транс-инфлюенсером, и решение было принято кем-то из младших менеджеров, занимающихся взаимодействием с инфлюенсерами. После скандала от работы отстранили вице-президента по маркетингу бренда Bud Light Алиссу Хейнершейд и её руководителя, вице-президента AB InBev по маркетингу Дэниела Блейка. Позднее компанию Anheuser-Busch покинул директор по маркетингу Бенуа Гарбе.</p>
                        <p>Сама Дилан Малвейни в своём недавнем выступлении в ходе фестиваля SXSW заявила, что бренд Bud Light должен был действовать «как родитель», чтобы защитить её от буллинга, так именно компания приняла решение привлечь её к рекламе бренда. </p>
                        <div className={styles.tagsContainer}>
                            {tags.map((tag, index) =>
                                <div key={index} className={styles.tag}><p>{tag}</p></div>
                            )}
                        </div>
                        <div className={styles.source}><p>Источник: </p><a>Profibeer</a></div>
                    </div>
                    <div className={styles.contentSide}>
                        <img src={Ad1} alt=""></img>
                        <h3>Похожие статьи</h3>
                        {cards.map((card, index) =>
                            <div key={index} className={styles.blogCard}>
                                <p className={styles.cardTextPrimary}>{card.title}</p>
                                <img className={styles.cardImg} src={card.img} alt=""/>
                                <p className={styles.cardDescription}>{card.description}</p>
                            </div>
                        )}
                        <div className={styles.sideButtons}><RoundLinkButton text="Все статьи"/></div>


                    </div>
                </div>
            </div>
        </div>
    )
}