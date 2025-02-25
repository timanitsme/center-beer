import styles from "./BeerInfo.module.css"
import {useState} from "react";
import BeerBottleIcon from "../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../assets/bottle-empty-icon.svg?react";
import BarLogo from "../../assets/bar-info/bar-logo.svg?react";
import {TgIcon} from "../../assets/TgIcon.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import SausageIcon from "../../assets/sausage-icon.svg?react";
import FlagsIcon from "../../assets/flags-icon.svg?react";
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react";
import PhoneIcon from "../../assets/phone-icon.svg?react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import FavsIcon from "../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react";
import CommentIcon from "../../assets/comment-icon.svg?react";
import CalendarIcon from "../../assets/calendar-icon.svg?react";
import LocationIcon from "../../assets/location-icon.svg?react";
import TaxiIcon from "../../assets/taxi-icon.svg?react";
import CheckInIcon from "../../assets/check-in-icon.svg?react"
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react"
import HopIcon from "../../assets/hop-icon.svg?react"
import BeerDetailPicture1 from "../../assets/bottlesMock/beer-detail-picture-1.svg"
import BeerDetailPicture2 from "../../assets/bottlesMock/beer-detail-picture-2.svg"
import BeerDetailPicture3 from "../../assets/bottlesMock/beer-detail-picture-3.svg"
import BeerDetailPicture4 from "../../assets/bottlesMock/beer-detail-picture-4.svg"

export default function BeerInfo(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const rating = 3.5
    const pictures = [BeerDetailPicture1, BeerDetailPicture2, BeerDetailPicture3, BeerDetailPicture4]
    const [selectedPicture, setSelectedPicture] = useState(pictures[0])

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
                <div className={styles.beerPictures}>
                    <div className={styles.picturesColumn}>
                        {pictures.map((picture, index) =>(
                            <div key={index} className={picture === selectedPicture? styles.selected : ""}><img src={picture} onClick={() => setSelectedPicture(picture)} alt=""/></div>
                        ))}
                    </div>
                    <div>
                        <img src={selectedPicture} alt=""/>
                    </div>
                </div>
                <div className={styles.barDescription}>
                    <h2 className={styles.beerTitle}>Czech Pilsner</h2>
                    <div className={styles.characteristics}>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Крепость: <span style={{color: "var(--txt-primary)"}}>5%</span></p>
                        </div>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Плотность: <span style={{color: "var(--txt-primary)"}}>12%</span></p>
                        </div>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Горечь: <span style={{color: "var(--txt-primary)"}}>32</span></p>
                        </div>
                    </div>
                    <p className={styles.notMobile}>Классический светлый пилснер в чешском стиле. Сваренный на светлом солоде типа пилс, с жатецким хмелем Saaz. Прозрачного золотистого цвета, с плотной пенной шапкой. Имеет насыщенный хмелевой аромат с цветочными нотами. Вкус яркий, искристый с отличным хмелево-солодовым балансом. Горечь уверенная, но не выпирающая. Послевкусие хмелевое.</p>
                    <div className={styles.notMobile}>
                        <ul className={styles.characteristicsList}>
                            <li><p>Пивоварня: <a href="">Švyturys</a></p></li>
                            <li><p>Стиль: <a href="">Altbier (Альтбир)</a></p></li>
                            <li><p>Начало выпуска: <p style={{color: "var(--txt-active)"}}>09.07.2019</p></p></li>
                            <li><p>Производство: <p style={{color: "var(--txt-active)"}}>постоянный выпуск</p></p></li>
                        </ul>
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
                    <IconButton text="добавить check-in" style="secondary"><CheckInIcon/></IconButton>
                    <div className={styles.cartAndPrice}>
                        <h2 style={{color: "var(--primary)"}}>380₽</h2>
                        <IconButton text="Добавить в корзину" style="primary"><BottlesPairIcon/></IconButton>
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
                <IconButton text="добавить check-in" style="secondary"><CheckInIcon/></IconButton>
                <div className={styles.cartAndPrice}>
                    <h2 style={{color: "var(--primary)"}}>380₽</h2>
                    <IconButton text="Добавить в корзину" style="primary"><BottlesPairIcon/></IconButton>
                </div>
            </div>
            <div className={styles.descriptionMobile}>
                <p>Классический светлый пилснер в чешском стиле. Сваренный на светлом солоде типа пилс, с жатецким хмелем Saaz. Прозрачного золотистого цвета, с плотной пенной шапкой. Имеет насыщенный хмелевой аромат с цветочными нотами. Вкус яркий, искристый с отличным хмелево-солодовым балансом. Горечь уверенная, но не выпирающая. Послевкусие хмелевое.</p>
                <div>
                    <ul className={styles.characteristicsList}>
                        <li><p>Пивоварня: <a href="">Švyturys</a></p></li>
                        <li><p>Стиль: <a href="">Altbier (Альтбир)</a></p></li>
                        <li><p>Начало выпуска: <p style={{color: "var(--txt-active)"}}>09.07.2019</p></p></li>
                        <li><p>Производство: <p style={{color: "var(--txt-active)"}}>постоянный выпуск</p></p></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}
