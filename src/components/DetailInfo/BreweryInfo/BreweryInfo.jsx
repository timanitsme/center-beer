import styles from "./BreweryInfo.module.css"
import {TgIcon} from "../../../assets/TgIcon.jsx";
import {VkIcon} from "../../../assets/VkIcon.jsx";
import {MailIcon} from "../../../assets/MailIcon.jsx";
import FlagsIcon from "../../../assets/flags-icon.svg?react"
import PhoneIcon from "../../../assets/phone-icon.svg?react"
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react"
import {useState} from "react";
import CommentIcon from "../../../assets/comment-icon.svg?react"
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react"
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react"
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react"
import BreweryLogo from "../../../assets/bar-info/brewery-logo.svg?react"
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react"
import BarrelIcon from "../../../assets/barrel-icon.svg?react"
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";



export default function BreweryInfo({breweryInfo={}}){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const rating = 4.9

    return(
        <div>
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    {breweryInfo.logo !== undefined && breweryInfo.logo !== "" ? <img className={styles.logoImg} src={breweryInfo.logo} alt=""></img> :<BreweryLogo/>}
                </div>
                <div className={styles.barDescription}>
                    <h2>{breweryInfo?.name}</h2>
                    <p>{breweryInfo?.description}</p>
                    {/*
                    <div className={styles.barButtons}>
                        <IconButton text="наши новинки"><BottlesPairIcon/></IconButton>
                        <IconButton text="мероприятия"><FlagsIcon/></IconButton>
                        <IconButton text="ассортимент"><PhoneIcon/></IconButton>
                        <IconButton text="фото"><PhoneIcon/></IconButton>
                        <IconButton text="экскурсии"><BarrelIcon/></IconButton>
                    </div>
                    */}
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
                    {/*<h2>+7 (916) 298-06-14</h2>*/}
                    <p>{breweryInfo?.country}</p>
                    {/*<a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>*/}
                    <div className={styles.socials}>
                        {breweryInfo["social_media"].tg && <a href={breweryInfo["social_media"].tg}><TgIcon/></a>}
                        {breweryInfo["social_media"].vk && <a href={breweryInfo["social_media"].vk}><VkIcon/></a>}
                        {breweryInfo.email && <a href={`mailto:${breweryInfo.email}`}><MailIcon/></a>}
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
                {/*<h2>+7 (916) 298-06-14</h2>*/}
                <p>{breweryInfo?.country}</p>
                {/*<a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>*/}
                <div className={styles.socials}>
                    <TgIcon/>
                    <a href="https://vk.com/center.beer.news"><VkIcon/></a>
                    <a href="mailto:hello@center.beer"><MailIcon/></a>
                </div>
            </div>
            <div className={styles.barButtonsMobile}>
                <IconButton text="наши новинки"><BottlesPairIcon/></IconButton>
                <IconButton text="мероприятия"><FlagsIcon/></IconButton>
                <IconButton text="ассортимент"><PhoneIcon/></IconButton>
                <IconButton text="фото"><PhoneIcon/></IconButton>
                <IconButton text="экскурсии"><BarrelIcon/></IconButton>

            </div>
        </div>

    )
}