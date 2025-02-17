import styles from "./BarInfo.module.css"
import BarLogo from "../../assets/bar-info/bar-logo.svg?react"
import {TgIcon} from "../../assets/TgIcon.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import FlagsIcon from "../../assets/flags-icon.svg?react"
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react"
import PhoneIcon from "../../assets/phone-icon.svg?react"
import SausageIcon from "../../assets/sausage-icon.svg?react"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import FavsIcon from "../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react"
import TaxiIcon from "../../assets/taxi-icon.svg?react"
import LocationIcon from "../../assets/location-icon.svg?react"
import {useState} from "react";
import CommentIcon from "../../assets/comment-icon.svg?react"
import CalendarIcon from "../../assets/calendar-icon.svg?react"
import BeerBottleIcon from "../../assets/bottle-icon.svg?react"
import HalfBeerBottleIcon from "../../assets/bottle-half-icon.svg?react"
import EmptyBeerBottleIcon from "../../assets/bottle-empty-icon.svg?react"


export default function BarInfo(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const rating = 3.5

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
                    <BarLogo/>
                    <div className={styles.socials}>
                        <TgIcon/>
                        <a href="https://vk.com/center.beer.news"><VkIcon/></a>
                        <a href="mailto:hello@center.beer"><MailIcon/></a>
                    </div>
                </div>
                <div className={styles.barDescription}>
                    <h2>13 rules (народный бар)</h2>
                    <p>Добро пожаловать в бар 13 RULES — идеальное место для ценителей крафтового пива и домашней атмосферы. В двух шагах от метро Марьина Роща и Савёловская, вас ждёт атмосферный паб с живой музыкой, домашними настойками и трансляциями спортивных событий. Наслаждайтесь вкусными бизнес-ланчами, воспользуйтесь скидками и акциями. Забронируйте стол сейчас и откройте новый уровень отдыха с друзьями и близкими!</p>
                    <div className={styles.barButtons}>
                        <IconButton text="меню"><SausageIcon/></IconButton>
                        <IconButton text="скидки и акции"><FlagsIcon/></IconButton>
                        <IconButton text="новости"><BeerMugsIcon/></IconButton>
                        <IconButton text="приложение"><PhoneIcon/></IconButton>
                        <SimpleButton text={"забронировать стол"}/>
                    </div>
                </div>
                <div className={styles.barInfo}>
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