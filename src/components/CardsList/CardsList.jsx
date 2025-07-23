import {useState} from "react";
import styles from "./CardsList.module.scss";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import PropTypes from "prop-types";


export default function CardsList({cards, CardComponent, style="default"}){
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = style === "secondary" ? window.innerWidth <= 600 ? 3 : 5 : window.innerWidth <= 600 ? 3 : 6;

    // Функция для переключения на следующую страницу
    const nextPage = () => {
        if (currentPage < Math.ceil(cards.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Функция для переключения на предыдущую страницу
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Вычисление текущего набора изображений (по 6 штук)
    const currentCards = cards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return(
        <div className={styles.picturesListContainer}>
            <div className={styles.leftArrow}><ArrowButton direction="left"  onClick={prevPage} withBg={false}></ArrowButton></div>
            <div className={styles.picturesContainer}>
                {currentCards.map((card, index) => (
                    <div key={index} className={`${styles.cardWrapper} ${style === "secondary"? styles.secondary: ""}`}>
                        {card && (
                            <div className={styles.card}><CardComponent cardInfo={card}/></div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.rightArrow}><ArrowButton direction="right"  onClick={nextPage} withBg={false}></ArrowButton></div>
        </div>
    )
}

CardsList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string)
}
