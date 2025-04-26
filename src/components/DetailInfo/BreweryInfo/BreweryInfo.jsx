import styles from "./BreweryInfo.module.css"
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
import {useState} from "react";
import CommentIcon from "../../../assets/comment-icon.svg?react"
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react"
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react"
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react"
import BreweryLogo from "../../../assets/bar-info/brewery-logo.svg?react"
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react"
import BarrelIcon from "../../../assets/barrel-icon.svg?react"
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";



export default function BreweryInfo(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const rating = 3.5

    return(
        <div>
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    <BreweryLogo/>
                </div>
                <div className={styles.barDescription}>
                    <h2>Jaws Brewery</h2>
                    <p>Пивоварня была открыта в 2008 году, в городе Заречный Свердловской области. Она расположилась в старом здании бывшей прачечной, которое было реконструировано и обновлено. Поэтому один из самых знаменитых сортов называется «Атомная Прачечная» в честь места, где они открылись. Как и многие другие энтузиасты-новички крафтового пивоварения, ребята очень рисковали, ведь чтобы решиться на такую авантюру в небольшом российском городе, надо обладать отчаянной смелостью. Они задались благородной целью – знакомить людей с новыми, малоизвестными в нашей стране стилями пива. Поначалу зыбкая затея постепенно стала обретать твердую почву и горячий отклик среди пивоманов.</p>
                    <div className={styles.barButtons}>
                        <IconButton text="наши новинки"><BottlesPairIcon/></IconButton>
                        <IconButton text="мероприятия"><FlagsIcon/></IconButton>
                        <IconButton text="ассортимент"><PhoneIcon/></IconButton>
                        <IconButton text="фото"><PhoneIcon/></IconButton>
                        <IconButton text="экскурсии"><BarrelIcon/></IconButton>
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
                    <h2>+7 (916) 298-06-14</h2>
                    <p>г. Москва, Сущевский вал, 41</p>
                    <a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>
                    <div className={styles.socials}>
                        <TgIcon/>
                        <a href="https://vk.com/center.beer.news"><VkIcon/></a>
                        <a href="mailto:hello@center.beer"><MailIcon/></a>
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