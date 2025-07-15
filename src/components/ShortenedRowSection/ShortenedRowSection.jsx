import styles from "./ShortenedRowSection.module.scss"
import {useEffect, useState} from "react";

export default function ShortenedRowSection({title=null, cards=[], CardComponent, SkeletonCardComponent, isFetching=false, maxCards=5, totalItems=10, prefix=""}){
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
    }, [cards, isFetching]);

    return(
        <div className={styles.sectionContainer}>
            {title && <h3>{title}</h3>}
            <div className={styles.cardsRow}>
                {isFetching && maxCards?.map((card, index) => {
                    return <SkeletonCardComponent key={`${prefix}-${index}`}></SkeletonCardComponent>
                })}
                {!isFetching && cards.length > 0 && visibleCards?.map((card, index) => {
                    return <CardComponent key={`${prefix}-${index}`} cardInfo={card}></CardComponent>
                })}
                {visibleCards.length < totalItems &&
                    <div className={styles.showMore}>
                        <p className="ma-p">Все ({totalItems})</p>
                    </div>
                }
            </div>

        </div>
    )
}