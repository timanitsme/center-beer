import styles from "./BarInfo.module.css"
import BarLogo from "../../../assets/bar-info/bar-logo.svg?react"
import {TgIcon} from "../../../assets/TgIcon.jsx";
import {VkIcon} from "../../../assets/VkIcon.jsx";
import {MailIcon} from "../../../assets/MailIcon.jsx";
import FlagsIcon from "../../../assets/flags-icon.svg?react"
import BeerMugsIcon from "../../../assets/beer-mugs-icon.svg?react"
import PhoneIcon from "../../../assets/phone-icon.svg?react"
import SausageIcon from "../../../assets/sausage-icon.svg?react"
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react"
import TaxiIcon from "../../../assets/taxi-icon.svg?react"
import LocationIcon from "../../../assets/location-icon.svg?react"
import {useState} from "react";
import CommentIcon from "../../../assets/comment-icon.svg?react"
import CalendarIcon from "../../../assets/calendar-icon.svg?react"
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react"
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react"
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react"


export default function BarInfo({barInfo, sections = []}){
    const [isFavourite, setIsFavourite] = useState(barInfo.is_favor || false);
    const [isBookmarked, setIsBookmarked] = useState(barInfo.is_liked || false);
    const rating = 3.5

    const handleScroll = (targetRef) => {
        if (targetRef.current) {
            const elementPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    const getRatingIcons = (rating) => {
        const icons = [];
        const fullBottles = Math.floor(rating); // Целая часть рейтинга
        const hasHalfBottle = rating - fullBottles >= 0.1; // Есть ли половина бутылки

        for (let i = 0; i < 5; i++) {
            if (i < fullBottles) {
                icons.push(<BeerBottleIcon key={i} className={styles.beerIcon} />);
            } else if (i === fullBottles && hasHalfBottle) {
                icons.push(<HalfBeerBottleIcon key={i} className={styles.beerIcon} />);
            } else {
                icons.push(<EmptyBeerBottleIcon key={i} className={styles.beerIcon} />);
            }
        }

        return icons;
    };

    return(
        <div>
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    {barInfo.logo !== undefined && barInfo.logo !== "" ? <img className={styles.logoImg} src={barInfo.logo} alt=""></img> :<BarLogo/>}
                    <div className={styles.socials}>
                        {barInfo["social_media"].tg && <a href={barInfo["social_media"].tg}><TgIcon/></a>}
                        {barInfo["social_media"].vk && <a href={barInfo["social_media"].vk}><VkIcon/></a>}
                        <a href={`mailto:${barInfo.email}`}><MailIcon/></a>
                    </div>
                </div>
                <div className={styles.barDescription}>
                    <h2>{barInfo.name}</h2>

                    <p>{barInfo.description}</p>

                    <div className={styles.barButtons}>
                        {sections.map((section, index) =>
                            <IconButton key={index} onClick={() => handleScroll(section.ref)} text={section.title}>{section.IconComponent}</IconButton>
                        )}
                        {/*<SimpleButton text={"забронировать стол"}/>*/}
                    </div>
                </div>
                <div className={`${styles.barInfo} ${styles.regular}`}>
                    <div>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                    </div>
                    <div className={styles.ratingAndComments}>
                        <div className={styles.beerBottles}>
                            {getRatingIcons(rating)}
                        </div>
                        <p>({rating})</p>
                        <div className={styles.circle}/>
                        <a> <CommentIcon/> 116 комментариев</a>
                    </div>
                    <h2>{barInfo.contacts}</h2>
                    <p>{barInfo.address}</p>
                    <a className={styles.aUnderlinedIconButton} href="https://center.beer/about-us/contact/"><CommentIcon/>Связаться с нами</a>
                    {/*FIXME <a className={styles.aUnderlinedIconButton}><CalendarIcon/>График работы</a>*/}
                    <div>
                        {/* FIXME <IconButton text="Найти на карте" style="secondary"><LocationIcon/></IconButton>*/}
                        {/* FIXME <IconButton text="Заказать такси" style="secondary"><TaxiIcon/></IconButton>*/}
                    </div>
                </div>
            </div>
            <div className={`${styles.barInfo} ${styles.mobile}`}>
                <div>
                    <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                    <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                </div>
                <div className={styles.ratingAndComments}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(rating)}
                    </div>
                    <p>({rating})</p>
                    <div className={styles.circle}/>
                    <a> <CommentIcon/> 116 комментариев</a>
                </div>
                <h2>+7 (916) 298-06-14</h2>
                <p>г. Москва, Сущевский вал, 41</p>
                <a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>
                <a className={styles.aUnderlinedIconButton}><CalendarIcon/>График работы</a>
                <div>
                    <IconButton text="Найти на карте" style="secondary"><LocationIcon/></IconButton>
                    <IconButton text="Заказать такси" style="secondary"><TaxiIcon/></IconButton>
                </div>
            </div>
            <div className={styles.barButtonsMobile}>
                <IconButton text="меню"><SausageIcon/></IconButton>
                <IconButton text="скидки и акции"><FlagsIcon/></IconButton>
                <IconButton text="новости"><BeerMugsIcon/></IconButton>
                <IconButton text="приложение"><PhoneIcon/></IconButton>
                <SimpleButton text={"забронировать стол"}/>
            </div>
        </div>

    )
}