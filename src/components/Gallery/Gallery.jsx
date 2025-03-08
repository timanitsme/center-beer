import styles from "./Gallery.module.css"
import {useRef} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";

export default function Gallery({pictures= []}){
    const galleryRef = useRef(null);

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
        <div className={styles.galleryContainer}>
            <div className={styles.galleryPictures} ref={galleryRef}>
                {pictures.map((picture, index) =>
                    <img key={index} src={picture} alt=""/>
                )}

            </div>
            { pictures && pictures.length !== 0 && <div className={styles.galleryButtons}>
                <ArrowButton direction="left" onClick={scrollLeft}></ArrowButton>
                <ArrowButton direction="right" onClick={scrollRight}></ArrowButton>
            </div>}
        </div>
    )
}