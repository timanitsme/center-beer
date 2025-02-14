import styles from "./Gallery.module.css"
import Gallery1 from "../../assets/gallery/gallery-1.svg"
import Gallery2 from "../../assets/gallery/gallery-2.svg"
import Gallery3 from "../../assets/gallery/gallery-3.svg"
import {useRef} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";

export default function Gallery(){
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
                <img src={Gallery1}/>
                <img src={Gallery2}/>
                <img src={Gallery3}/>
                <img src={Gallery1}/>
                <img src={Gallery2}/>
                <img src={Gallery3}/>
            </div>
            <div className={styles.galleryButtons}>
                <ArrowButton direction="left" onClick={scrollLeft}></ArrowButton>
                <ArrowButton direction="right" onClick={scrollRight}></ArrowButton>
            </div>
        </div>
    )
}