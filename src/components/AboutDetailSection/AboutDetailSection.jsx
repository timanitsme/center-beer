import {useState} from "react";
import BlogImage1 from "../../assets/newsMocks/blog-image-1.svg";
import BlogImage2 from "../../assets/newsMocks/blog-image-2.svg";
import BlogImage3 from "../../assets/newsMocks/blog-image-3.svg";
import styles from "./AboutDetailSection.module.css";
import {Link} from "react-router-dom";
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";


export default function AboutDetailSection({children, paths, sectionMenuItems}){

    const cards = [
        {title: "Крупнейшие российские производители пива предупреждают", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля.", img: BlogImage1},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Табачный гигант Altria Group сообщил о планах продать акции компании AB InBev более чем на 2,2 млрд долларов.", img: BlogImage2},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.", img: BlogImage3},
    ]

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuItems.map((item, index) =>
                        <Link key={index} to={item.path}>{item.title}</Link>
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <a><ArrowBackIcon/></a>
                        <LightNavChain paths={paths}/>
                    </div>
                </div>
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        {children}
                    </div>
                    <div className={styles.contentSide}>
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