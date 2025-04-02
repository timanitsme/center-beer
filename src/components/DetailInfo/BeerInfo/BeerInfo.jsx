import styles from "./BeerInfo.module.css"
import {useState} from "react";
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import CommentIcon from "../../../assets/comment-icon.svg?react";
import CheckInIcon from "../../../assets/check-in-icon.svg?react"
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react"
import HopIcon from "../../../assets/hop-icon.svg?react"
import PlayButtonIcon from "../../../assets/play-button-icon.svg?react"
import SingleImageModal from "../../Modals/SingleImageModal/SingleImageModal.jsx";
import ImageVideoModal from "../../Modals/ImageVideoModal/ImageVideoModal.jsx";

export default function BeerInfo({beerInfo={}}){
    const [isFavourite, setIsFavourite] = useState(beerInfo?.is_favor || false);
    const [isBookmarked, setIsBookmarked] = useState(beerInfo?.is_liked || false);
    const rating = 3.5
    const [selectedPicture, setSelectedPicture] = useState(beerInfo?.gallery[0])
    const [showModal ,setShowModal] = useState(false)

    const formatNumber = (num) => Number(num).toString()

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
                        {beerInfo?.gallery.map((picture, index) =>(
                            <div key={index} onClick={() => setSelectedPicture(picture)} className={`${picture === selectedPicture? styles.selected : ""} ${styles.sidePictureContainer}`}>
                                {picture?.type === "video" && <PlayButtonIcon/>}
                                <img src={picture?.preview} alt=""/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.selectedPictureContainer} onClick={() => setShowModal(true)}>
                        {selectedPicture?.type === "video" && <PlayButtonIcon/>}
                        <img src={selectedPicture.preview} alt=""/>
                    </div>
                </div>
                <div className={styles.barDescription}>
                    <h2 className={styles.beerTitle}>{beerInfo?.name}</h2>
                    <div className={styles.characteristics}>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Крепость: <span style={{color: "var(--txt-primary)"}}>{formatNumber(beerInfo?.abv || "0")}%</span></p>
                        </div>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Плотность: <span style={{color: "var(--txt-primary)"}}>{formatNumber(beerInfo?.og || '0')}%</span></p>
                        </div>
                        <div className={styles.characteristic}>
                            <HopIcon/>
                            <p>Горечь: <span style={{color: "var(--txt-primary)"}}>{formatNumber(beerInfo?.ibu || '0')}</span></p>
                        </div>
                    </div>
                    <p className={styles.notMobile}>{beerInfo?.description}</p>
                    <div className={styles.notMobile}>
                        <ul className={styles.characteristicsList}>
                            <li><p>Пивоварня: <a href="">{beerInfo?.brewery_name}</a></p></li>
                            <li><p>Стиль: <a href="">{beerInfo?.style_name}</a></p></li>
                            <li><p>Начало выпуска: <p style={{color: "var(--txt-active)"}}>{beerInfo?.start_date_sales}</p></p></li>
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
            <ImageVideoModal src={selectedPicture} setSrc={setSelectedPicture} show={showModal} setShow={setShowModal} />








        </div>

    )
}
