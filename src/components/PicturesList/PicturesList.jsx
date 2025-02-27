import styles from "./PicturesList.module.css"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import {useState} from "react";
import ReviewSection from "../../assets/reviewsMocks/review-section.svg";
import PropTypes from "prop-types";

export default function PicturesList({images, style="default"}){
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = style === "secondary" ? window.innerWidth <= 600 ? 3 : 5 : window.innerWidth <= 600 ? 3 : 6;

    // Функция для переключения на следующую страницу
    const nextPage = () => {
        if (currentPage < Math.ceil(images.length / itemsPerPage) - 1) {
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
    const currentImages = images.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Добавляем заполнители, если в последней группе меньше 6 картинок
    const filledImages = [...currentImages];
    while (filledImages.length < itemsPerPage) {
        filledImages.push(ReviewSection);
    }

    return(
        <div className={styles.picturesListContainer}>
            <div className={styles.leftArrow}><ArrowButton direction="left"  onClick={prevPage} withBg={false}></ArrowButton></div>
            <div className={styles.picturesContainer}>
                {filledImages.map((image, index) => (
                    <div key={index} className={`${styles.imageWrapper} ${style === "secondary"? styles.secondary: ""}`}>
                        {image && (
                            <img
                                src={image}
                                alt=""
                                className={styles.image}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.rightArrow}><ArrowButton direction="right"  onClick={nextPage} withBg={false}></ArrowButton></div>
        </div>
    )
}

PicturesList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string)
}
