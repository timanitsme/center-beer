import styles from "./RowSection.module.scss"
import {useEffect, useState} from "react";

export default function RowSection({title=null, cards=[], CardComponent, maxCards=5, totalItems=10}){
    const [visibleCards, setVisibleCards] = useState([]);
    const stops = [
        {width: 1600, count: 6},
        {width: 1300, count: 5},
        {width: 950, count: 4},
        {width: 600, count: 3},
        {width: 0, count: 2},
    ]

    useEffect(() => {
        const handleResize = () => {
            // Находим первую остановку, которая соответствует текущей ширине
            const stop = stops.find(stop => window.innerWidth >= stop.width);

            if (stop) {
                setVisibleCards(cards.slice(0, stop.count));
            } else {
                // Fallback на минимальное значение
                setVisibleCards(cards.slice(0, 2));
            }
        };

        // Устанавливаем начальное состояние
        handleResize();

        // Добавляем обработчик изменения размера окна
        window.addEventListener("resize", handleResize);

        // Очищаем обработчик при размонтировании компонента
        return () => window.removeEventListener("resize", handleResize);
    }, [cards]); // Добавляем cards в зависимости

    return(
        <div className={styles.sectionContainer}>
            {title && <h3>{title}</h3>}
            <div className={styles.cardsRow}>
                {cards.length > 0 && visibleCards?.map((card, index) => {
                    return <CardComponent key={`${card.alias}`} cardInfo={card}></CardComponent>
                })}
            </div>
        </div>
    )
}