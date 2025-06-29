import styles from "./ShortenedRowSection.module.scss"
import BarImage1 from "../../assets/barsMocks/bar-3.svg";
import BarImage2 from "../../assets/barsMocks/bar-2.svg";
import BarImage3 from "../../assets/barsMocks/bar-5.svg";
import BarImage4 from "../../assets/barsMocks/bar-4.svg";
import BarImage5 from "../../assets/barsMocks/bar-1.svg";
import MinimalBarCard from "../Cards/BarCard/MinimalBarCard.jsx";
import {useEffect, useState} from "react";

export default function ShortenedRowSection({title=null, cards=[], CardComponent, maxCards=5, totalItems=10}){
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1000) {
                setVisibleCards(cards.slice(0, maxCards)); // Показать 5 карточек
            } else if (window.innerWidth >= 768) {
                setVisibleCards(cards.slice(0, maxCards-2)); // Показать 3 карточки
            }
            else {
                setVisibleCards(cards.slice(0, maxCards-3)); // Показать 2 карточки
            }
        };

        // Устанавливаем начальное состояние
        handleResize();

        // Добавляем обработчик изменения размера окна
        window.addEventListener("resize", handleResize);

        // Очищаем обработчик при размонтировании компонента
        return () => window.removeEventListener("resize", handleResize);
    }, [cards]);

    return(
        <div className={styles.sectionContainer}>
            {title && <h3>{title}</h3>}
            <div className={styles.cardsRow}>
                {cards.length > 0 && visibleCards?.map((card, index) => {
                    return <CardComponent key={index} cardInfo={card}></CardComponent>
                })}
                {visibleCards.length < totalItems &&
                    <div className={styles.showMore}>
                        <p>Все ({totalItems})</p>
                    </div>
                }
            </div>

        </div>
    )
}