import styles from "./Gallery.module.css"
import {useRef, useState} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import EventImage from "../../assets/eventsMocks/event-picture-1.svg";
import SingleImageModal from "../Modals/SingleImageModal/SingleImageModal.jsx";
import placeholder from "../../assets/placeholders/card-image-placeholder.svg"

export default function Gallery({pictures= [], ref = null}){
    const galleryRef = useRef(null);
    const [showModal, setShowModal] = useState(false)
    const [currentImage, setCurrentImage] = useState(placeholder)

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (galleryRef.current) {
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
            container.scrollBy({
                left: -imageWidth, // Прокручиваем на ширину одного изображения
                behavior: 'smooth',
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (galleryRef.current) {
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
            container.scrollBy({
                left: imageWidth, // Прокручиваем на ширину одного изображения
                behavior: 'smooth',
            });
        }
    };

    return(
        <div className={styles.galleryContainer} ref={ref}>
            <div className={styles.galleryPictures} ref={galleryRef}>
                {pictures.map((picture, index) =>
                    <img onClick={() => {setCurrentImage(picture); setShowModal(true)}} key={index} src={picture} alt=""/>
                )}
            </div>
            { pictures && pictures.length !== 0 && <div className={styles.galleryButtons}>
                <ArrowButton direction="left" onClick={scrollLeft}></ArrowButton>
                <ArrowButton direction="right" onClick={scrollRight}></ArrowButton>
            </div>}
            <SingleImageModal show={showModal} setSrc={setCurrentImage} setShow={setShowModal} src={currentImage}></SingleImageModal>
        </div>
    )
}