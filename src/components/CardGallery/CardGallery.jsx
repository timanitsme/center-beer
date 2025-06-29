import {useRef} from "react";
import styles from "./CardGallery.module.scss";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";


export default function GalleryCard({CardComponent, cards= []}){
    const cardRef = useRef(null);

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (cardRef.current) {
            const container = cardRef.current;
            const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
            container.scrollBy({
                left: -imageWidth, // Прокручиваем на ширину одного изображения
                behavior: 'smooth',
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (cardRef.current) {
            const container = cardRef.current;
            const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
            container.scrollBy({
                left: imageWidth, // Прокручиваем на ширину одного изображения
                behavior: 'smooth',
            });
        }
    };

    return(
        <div className={styles.cardsContainer}>
            <div className={styles.cardsPictures} ref={cardRef}>
                {cards.map((card, index) =>
                    <CardComponent key={index} cardInfo={card}/>
                )}

            </div>
            { cards && cards.length !== 0 && <div className={styles.cardsButtons}>
                <ArrowButton direction="left" onClick={scrollLeft}></ArrowButton>
                <ArrowButton direction="right" onClick={scrollRight}></ArrowButton>
            </div>}
        </div>
    )
}