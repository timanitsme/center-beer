import styles from "./Gallery.module.scss"
import {useEffect, useRef, useState} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import SingleImageModal from "../Modals/SingleImageModal/SingleImageModal.jsx";
import placeholder from "../../assets/placeholders/card-image-placeholder.svg"

export default function Gallery({pictures= [], ref = null}){
    const containerRef = useRef(null);
    const galleryRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(placeholder);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [showingPictures, setShowingPictures] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const autoScrollInterval = useRef(null);
    const scrollDirection = useRef(1);

    useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(containerRef.current);
            } else {
                ref.current = containerRef.current;
            }
        }
    }, [ref]);

    // Инициализация "бесконечных" картинок
    useEffect(() => {
        if (pictures.length > 0) {
            setShowingPictures([...pictures, ...pictures, ...pictures]);

            setTimeout(() => {
                if (galleryRef.current) {
                    const imageWidth = galleryRef.current.querySelector('img')?.clientWidth || 0;
                    galleryRef.current.scrollLeft = pictures.length * imageWidth;
                }
            }, 0);
        }
    }, [pictures]);

    // Наблюдение за видимостью галереи для пользователя
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Автопрокрутка карусели
    useEffect(() => {
        if (isVisible && !isInteracting && showingPictures.length > 0) {
            autoScrollInterval.current = setInterval(() => {
                if (galleryRef.current && !isInteracting) {
                    scrollOneImage(scrollDirection.current);
                    checkInfiniteScroll();
                }
            }, 3000);
        }

        return () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
            }
        };
    }, [isVisible, isInteracting, showingPictures.length]);

    const getImageWidth = () => {
        if (!galleryRef.current) return 0;
        const img = galleryRef.current.querySelector('img');
        return img ? img.clientWidth + 10 : 0; // +10 для учета gap
    };

    const scrollOneImage = (direction) => {
        if (!galleryRef.current) return;
        const imageWidth = getImageWidth();
        galleryRef.current.scrollBy({
            left: imageWidth * direction,
            behavior: 'smooth'
        });
    };

    const checkInfiniteScroll = () => {
        if (!galleryRef.current) return;
        const container = galleryRef.current;
        const imageWidth = getImageWidth();
        const pictureCount = pictures.length;
        if (container.scrollLeft < imageWidth * pictureCount / 2) {
            setTimeout(() => {
                container.scrollLeft += imageWidth * pictureCount;
            }, 500);
        }
        else if (container.scrollLeft > imageWidth * pictureCount * 1.5) {
            setTimeout(() => {
                container.scrollLeft -= imageWidth * pictureCount;
            }, 500);
        }
    };

    const handleImageError = (index) => {
        const updatedPictures = [...showingPictures];
        updatedPictures[index] = placeholder;
        setShowingPictures(updatedPictures)
    };

    const handleDragStart = (e) => {
        if (!galleryRef.current) return;
        setIsDragging(true);
        setIsInteracting(true);
        const startXPosition = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
        setStartX(startXPosition);
        setScrollLeft(galleryRef.current.scrollLeft);

        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
        }
    };

    // Функция для обработки движения (мыши или касания)
    const handleDragMove = (e) => {
        if (!isDragging || !galleryRef.current) return;

        const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
        const walk = (currentX - startX) * 2;
        galleryRef.current.scrollLeft = scrollLeft - walk;
    };

    // Функция для завершения перетаскивания
    const handleDragEnd = () => {
        setIsDragging(false);
        setIsInteracting(false);

        if (galleryRef.current) {
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img')?.clientWidth || 0;

            if (container.scrollLeft < imageWidth * pictures.length / 2) {
                container.scrollLeft += imageWidth * pictures.length;
            }
            else if (container.scrollLeft > imageWidth * pictures.length * 1.5) {
                container.scrollLeft -= imageWidth * pictures.length;
            }
        }
    };

    // Функция для прокрутки влево
    const scrollLeftHandler = () => {
        if (galleryRef.current) {
            setIsInteracting(true);
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img')?.clientWidth || 0;
            container.scrollBy({
                left: -imageWidth,
                behavior: 'smooth',
            });
            setTimeout(() => setIsInteracting(false), 1000);
        }
    };

    // Функция для прокрутки вправо
    const scrollRightHandler = () => {
        if (galleryRef.current) {
            setIsInteracting(true);
            const container = galleryRef.current;
            const imageWidth = container.querySelector('img')?.clientWidth || 0;
            container.scrollBy({
                left: imageWidth,
                behavior: 'smooth',
            });

            setTimeout(() => setIsInteracting(false), 1000);
        }
    };

    return(
        <div className={styles.galleryContainer} ref={containerRef}>
            <div className={styles.galleryPictures} ref={galleryRef} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}>
                {showingPictures.map((picture, index) =>
                    <img draggable={false} onClick={() => {setCurrentImage(picture); setShowModal(true)}} onError={() => handleImageError(index)} key={index} src={picture} alt=""/>
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