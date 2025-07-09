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
            stops.map((stop, index) => {
                if (window.innerWidth >= stop.width){
                    setVisibleCards(cards.slice(0, stop.count))
                }
            })

            /*if (window.innerWidth >= 1000) {
                setVisibleCards(cards.slice(0, maxCards)); // Показать 5 карточек
            } else if (window.innerWidth >= 768) {
                setVisibleCards(cards.slice(0, maxCards-2)); // Показать 3 карточки
            }
            else {
                setVisibleCards(cards.slice(0, maxCards-3)); // Показать 2 карточки
            }*/
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
            </div>

        </div>
    )
}