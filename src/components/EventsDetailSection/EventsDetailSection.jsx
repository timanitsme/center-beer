import styles from "./EventsDetailSection.module.scss"
import {useState} from "react";
import BlogImage1 from "../../assets/newsMocks/blog-image-1.svg";
import BlogImage2 from "../../assets/newsMocks/blog-image-2.svg";
import BlogImage3 from "../../assets/newsMocks/blog-image-3.svg";
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react";
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import FavsIcon from "../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import {Link, useNavigate} from "react-router-dom";
import BorderedGradientButton from "../Buttons/BorderedGradientButton/BorderedGradientButton.jsx";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";
import Ad1 from "../../assets/adsMocks/ad-1.svg";

export default function EventsDetailSection({style = "detail", children}){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate()
    const sectionMenuMainItems = [
        {title: "Все мероприятия", path: "/events"},
        {title: "Мероприятия заведений", path: "/events/restaurants"},
        {title: "Мероприятия пивоварен", path: "/events/breweries"},
    ]
    //    ["","Мероприятия заведений", "Мероприятия пивоварен"]
    const sectionMenuSecondaryItems = [
        {title: "Фестивали", path: "/events/festivals"}
    ]
    const paths = [
        {title: "Мероприятия", path: "/events"},
        {title: "Мероприятия заведений", path: "/events/restaurants"}
    ]

    const cards = [
        {title: "Крупнейшие российские производители пива предупреждают", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля.", img: BlogImage1},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Табачный гигант Altria Group сообщил о планах продать акции компании AB InBev более чем на 2,2 млрд долларов.", img: BlogImage2},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.", img: BlogImage3},
    ]

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                {style !== "detail" && <SearchInput onChange={() => {}} title="Поиск мероприятий"/>}
                <div className={styles.menuItemsContainer}>
                    {sectionMenuMainItems.map((item, index) =>
                        <BorderedGradientButton key={index} onClick={() => navigate(item.path)} text={item.title}/>
                    )}
                </div>
                <div className={styles.menuItemsContainer}>
                    {sectionMenuSecondaryItems.map((item, index) =>
                        <BorderedGradientButton key={index} onClick={() => navigate(item.path)} text={item.title}/>
                    )}

                </div>
            </div>
            <div className={styles.section}>
                { style === "detail" && <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <Link to={"/events"}><ArrowBackIcon/></Link>
                        <LightNavChain paths={paths}/>
                    </div>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>}
                { style === "regular" && <div className={styles.sectionHeader}>
                    <ComboBox options={["По умолчанию"]}></ComboBox>
                </div>}
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={styles.banner}>
                <img src={Ad1} alt=""></img>
            </div>
        </div>
    )
}