import styles from "./Gallery.module.css"
import {useEffect, useRef, useState} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import EventImage from "../../assets/eventsMocks/event-picture-1.svg";
import SingleImageModal from "../Modals/SingleImageModal/SingleImageModal.jsx";
import placeholder from "../../assets/placeholders/card-image-placeholder.svg"

export default function Gallery({pictures= [], ref = null}){
    const galleryRef = useRef(null);
    const [showModal, setShowModal] = useState(false)
    const [currentImage, setCurrentImage] = useState(placeholder)
    const [isDragging, setIsDragging] = useState(false); // Состояние для отслеживания перетаскивания
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false)
    const [autoScrollInterval, setAutoScrollInterval] = useState(null);
    const [autoScrollTimeout, setAutoScrollTimeout] = useState(null); // Таймер для автоматической прокрутки

    const handleDragStart = (e) => {
        if (!galleryRef.current) return;
        setIsDragging(true);
        setIsInteracting(true)
        // Определяем начальную позицию X
        const startXPosition = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
        setStartX(startXPosition);

        // Сохраняем текущую прокрутку
        setScrollLeft(galleryRef.current.scrollLeft);
        resetAutoScrollTimer();
    };

    // Функция для обработки движения (мыши или касания)
    const handleDragMove = (e) => {
        if (!isDragging || !galleryRef.current) return;

        // Определяем текущую позицию X
        const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;

        // Вычисляем расстояние для прокрутки
        const walk = (currentX - startX) * 2; // Умножаем для чувствительности
        galleryRef.current.scrollLeft = scrollLeft - walk;

    };

    // Функция для запуска автоматической прокрутки после задержки
    const startAutoScrollAfterDelay = () => {
        // Очищаем предыдущий таймер, если он существует
        if (autoScrollTimeout) {
            clearTimeout(autoScrollTimeout);
        }

        const timeoutId = setTimeout(() => {
            if (!isInteracting && galleryRef.current) {
                startAutoScroll(); // Начинаем автоматическую прокрутку
            }
        }, 10000); // 10 секунд бездействия
        setAutoScrollTimeout(timeoutId);
    };

    // Функция для запуска автоматической прокрутки
    const startAutoScroll = () => {
        // Останавливаем предыдущий интервал, если он существует
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        const intervalId = setInterval(() => {
            if (!isInteracting && galleryRef.current) {
                scrollRightHandler(); // Прокручиваем на одно изображение вправо
            }
        }, 5000); // Каждые 5 секунд
        setAutoScrollInterval(intervalId);
    };



    const stopAutoScroll = () => {
        if (autoScrollTimeout) {
            clearTimeout(autoScrollTimeout); // Останавливаем таймер
            setAutoScrollTimeout(null);
        }
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval); // Останавливаем интервал
            setAutoScrollInterval(null);
        }
    };

    // Функция для сброса таймера автоматической прокрутки
    const resetAutoScrollTimer = () => {
        stopAutoScroll(); // Останавливаем текущие таймеры
        startAutoScrollAfterDelay(); // Запускаем новый таймер
    };

    // При монтировании компонента запускаем таймер
    useEffect(() => {
        startAutoScrollAfterDelay();

        // Очищаем интервал при размонтировании компонента
        return () => {
            stopAutoScroll();
        };
    }, []);

    // Функция для завершения перетаскивания
    const handleDragEnd = () => {
        setIsDragging(false);
        setIsInteracting(false);
        startAutoScrollAfterDelay();
    };

    // Функция для прокрутки влево
    const scrollLeftHandler = () => {
        if (galleryRef.current) {
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
            container.scrollBy({
                left: -imageWidth,
                behavior: 'smooth',
            });
        }
        resetAutoScrollTimer();
    };

    // Функция для прокрутки вправо
        const scrollRightHandler = () => {
            if (galleryRef.current) {
                const container = galleryRef.current;
                const imageWidth = container.querySelector('img').clientWidth + 10; // Ширина одного изображения + gap
                container.scrollBy({
                    left: imageWidth,
                    behavior: 'smooth',
                });
            }

        };

    return(
        <div className={styles.galleryContainer} ref={ref}>
            <div className={styles.galleryPictures} ref={galleryRef} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}>
                {pictures.map((picture, index) =>
                    <img draggable={false} onClick={() => {setCurrentImage(picture); setShowModal(true)}} key={index} src={picture} alt=""/>
                )}
            </div>
            { pictures && pictures.length !== 0 && <div className={styles.galleryButtons}>
                <ArrowButton direction="left" onClick={scrollLeftHandler}></ArrowButton>
                <ArrowButton direction="right" onClick={scrollRightHandler}></ArrowButton>
            </div>}
            <SingleImageModal show={showModal} setSrc={setCurrentImage} setShow={setShowModal} src={currentImage}></SingleImageModal>
        </div>
    )
}