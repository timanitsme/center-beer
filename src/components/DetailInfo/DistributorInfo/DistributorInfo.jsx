import {useState} from "react";
import styles from "./DistributorInfo.module.css";
import BreweryLogo from "../../../assets/bar-info/brewery-logo.svg?react";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import CommentIcon from "../../../assets/comment-icon.svg?react";
import {TgIcon} from "../../../assets/TgIcon.jsx?react";
import {VkIcon} from "../../../assets/VkIcon.jsx?react";
import {MailIcon} from "../../../assets/MailIcon.jsx?react";

export default function DistributorInfo(){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    return(
        <div>
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    <BreweryLogo/>
                </div>
                <div className={styles.barDescription}>
                    <h2>Jaws Brewery</h2>
                    <p>Пивоварня была открыта в 2008 году, в городе Заречный Свердловской области. Она расположилась в старом здании бывшей прачечной, которое было реконструировано и обновлено. Поэтому один из самых знаменитых сортов называется «Атомная Прачечная» в честь места, где они открылись. Как и многие другие энтузиасты-новички крафтового пивоварения, ребята очень рисковали, ведь чтобы решиться на такую авантюру в небольшом российском городе, надо обладать отчаянной смелостью. Они задались благородной целью – знакомить людей с новыми, малоизвестными в нашей стране стилями пива. Поначалу зыбкая затея постепенно стала обретать твердую почву и горячий отклик среди пивоманов.</p>

                </div>
                <div className={`${styles.barInfo} ${styles.regular}`}>
                    <div>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
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

    )
}