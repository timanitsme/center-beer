import styles from "./ShortenedRowSection.module.scss"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ShortenedRowSection({title=null, cards=[], CardComponent, totalItemsLink = "", SkeletonCardComponent, isFetching=false, maxCards=5, totalItems=10, prefix=""}){
    const [visibleCards, setVisibleCards] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1600) {
                setVisibleCards(cards.slice(0, maxCards)); // Показать 5 карточек
            } else if (window.innerWidth >= 1300) {
                setVisibleCards(cards.slice(0, maxCards-1)); // Показать 3 карточки
            }
            else if (window.innerWidth >= 900) {
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
                {isFetching && maxCards?.map((card) => {
                    return <SkeletonCardComponent key={`${prefix}-${card.id}`}></SkeletonCardComponent>
                })}
                {!isFetching && cards.length > 0 && visibleCards?.map((card) => {
                    return <CardComponent key={`${prefix}-${card.id}`} cardInfo={card}></CardComponent>
                })}
                {visibleCards.length < totalItems &&
                    <div onClick={() => navigate(totalItemsLink)} className={styles.showMore}>
                        <p className="ma-p">Все ({totalItems})</p>
                    </div>
                }
            </div>

        </div>
    )
}