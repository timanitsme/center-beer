import styles from "./PicturesList.module.scss"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import {useState} from "react";
import ReviewSection from "../../assets/reviewsMocks/review-section.svg";
import PropTypes from "prop-types";
import placeholder from "../../assets/placeholders/card-image-placeholder.svg"
import ImageVideoModal from "../Modals/ImageVideoModal/ImageVideoModal.jsx";
import PlayButtonIcon from "../../assets/play-button-icon.svg?react"

export default function PicturesListApi({images, style="default"}){
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [currentImage, setCurrentImage] = useState(placeholder)
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
                    <div key={index} className={`${styles.imageWrapper} ${style === "secondary"? styles.secondary: ""} ${image?.type === "video"? styles.video: ''}`}>
                        {image?.original && (
                            <img
                                src={image?.original}
                                alt=""
                                onClick={() => {setCurrentImage(image); setShowModal(true)}}
                                className={styles.image}
                            />
                        )}
                        {image?.preview && image?.type === "video" && (
                            <>
                                <img
                                    src={image?.preview}
                                    alt=""
                                    onClick={() => {setCurrentImage(image); setShowModal(true)}}
                                    className={styles.image}
                                />
                                <PlayButtonIcon/>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.rightArrow}><ArrowButton direction="right"  onClick={nextPage} withBg={false}></ArrowButton></div>
            <ImageVideoModal show={showModal} setSrc={setCurrentImage} setShow={setShowModal} customType="thumb" src={currentImage}></ImageVideoModal>
        </div>
    )
}

PicturesListApi.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string)
}