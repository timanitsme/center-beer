import styles from "./CurrentPromos.module.css"
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react"
import promo1 from "../../assets/promos/promo-1.svg"
import promo2 from "../../assets/promos/promo-2.svg"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import {useState} from "react";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";


export default function CurrentPromos(){
    const images = [promo1, promo2, promo1, promo1, promo2, promo2, promo1];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Функция для показа следующих двух изображений
    const showNext = () => {
        setCurrentIndex((prevIndex) => currentIndex < images.length-2 ? prevIndex + 2 : prevIndex);
    };

    // Функция для показа предыдущих двух изображений
    const showPrevious = () => {
        setCurrentIndex((prevIndex) => currentIndex > 0 ? prevIndex-2 : prevIndex);
    };

    return(
        <div className={styles.currentPromosContainer}>
            <div className={styles.promosDescriptionContainer}>
                <div className={styles.descriptionIcon}><BeerMugsIcon/></div>
                <div className={styles.promosDescription}>
                    <h3>текущие акции</h3>
                    <p>Погрузитесь в мир выгодных предложений и специальных условий в нашем баре! Скидки на ваше любимое пиво, вкусные комбо-наборы, а также уникальные предложения для больших компаний. Не упустите шанс насладиться отличными напитками и закусками по привлекательным ценам.</p>
                </div>
                <IconButton text="Забронировать стол"><BeerMugsIcon/></IconButton>
            </div>
            <div className={styles.promosPictures}>
                <div>
                    <img src={images[currentIndex]} alt=""/>
                </div>
                <div>
                    {currentIndex < images.length-1 ? <img src={images[currentIndex+1]} alt=""/> : <img src={images[0]} style={{visibility: "hidden"}} alt=""/>}
                </div>
            </div>
            <div className={styles.promosButtons}>
                <div className={styles.arrowButtons}>
                    <ArrowButton direction="left" onClick={showPrevious}></ArrowButton>
                    <ArrowButton direction="right" onClick={showNext}></ArrowButton>
                </div>
                <RoundLinkButton text="Все акции"/>
            </div>
        </div>
    )
}