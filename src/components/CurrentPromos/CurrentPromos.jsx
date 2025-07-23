import styles from "./CurrentPromos.module.scss"
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import {useState} from "react";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {useGetBarPromoQuery} from "../../store/services/centerBeer.js";
import {useNavigate} from "react-router-dom";


export default function CurrentPromos({barId = 1, ref}){
    const {data: promos, isLoading: promosIsLoading, error: promosError} = useGetBarPromoQuery({bar_id: barId})
    const navigate = useNavigate()
    //const images = [promo1, promo2, promo1, promo1, promo2, promo2, promo1];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Функция для показа следующих двух изображений
    const showNext = () => {
        setCurrentIndex((prevIndex) => currentIndex < promos[0]?.promo_list?.length-2 ? prevIndex + 2 : prevIndex);
    };

    // Функция для показа предыдущих двух изображений
    const showPrevious = () => {
        setCurrentIndex((prevIndex) => currentIndex > 0 ? prevIndex-2 : prevIndex);
    };

    if (!promos || promos?.length === 0 || promosIsLoading || promosError) return null


    return(
        <div className={styles.currentPromosContainer} ref={ref}>
            <div className={styles.promosDescriptionContainer}>
                <div className={styles.descriptionIcon}><BeerMugsIcon/></div>
                <div className={styles.promosDescription}>
                    <h3 className="ma-h3">текущие акции</h3>
                    <p>Погрузитесь в мир выгодных предложений и специальных условий в нашем баре! Скидки на ваше любимое пиво, вкусные комбо-наборы, а также уникальные предложения для больших компаний. Не упустите шанс насладиться отличными напитками и закусками по привлекательным ценам.</p>
                </div>
                <div className={styles.max600}><IconButton text="Забронировать стол" onClick={() => navigate("/in-dev")}><BeerMugsIcon/></IconButton></div>
            </div>
            <div className={styles.promosPictures}>
                <div>
                    <img src={promos[0]?.promo_list[currentIndex]?.preview} alt=""/>
                </div>
                <div>
                    {currentIndex < promos[0]?.promo_list?.length-1 ? <img src={promos[0].promo_list[currentIndex+1]?.preview} alt=""/> : <img src={promos[0].promo_list[0]?.preview} style={{visibility: "hidden"}} alt=""/>}
                </div>
            </div>
            <div className={styles.promosButtons}>
                <div className={styles.arrowButtons}>
                    <ArrowButton direction="left" onClick={showPrevious}></ArrowButton>
                    <ArrowButton direction="right" onClick={showNext}></ArrowButton>
                </div>
                <RoundLinkButton text="Все акции" onClick={() => navigate("/in-dev")}/>
            </div>
        </div>
    )
}