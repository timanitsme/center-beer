import styles from "./BarEvents.module.css"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import eventPicture from "../../assets/event-picture.svg"
import ArrowDiagonalIcon from "../../assets/arrow-diagonal-icon.svg?react"
import {useGetBarEventsQuery} from "../../store/services/centerBeer.js";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";


export default function BarEvents({title = "Скоро в баре", barId=1}){
    const {data: events, isLoading: eventsIsLoading, error: eventsError} = useGetBarEventsQuery({bar_id: barId})
    const [containerHeight, setContainerHeight] = useState(400);
    const memoizedEvents = useMemo(() => events, [events]);

    const getImageSize = (url, containerWidth, callback) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            const originalWidth = img.width;
            const originalHeight = img.height;
            const scaledHeight = (containerWidth / originalWidth) * originalHeight;
            callback(scaledHeight);
        };

        img.onerror = () => {
            callback(0);
        };
    };


    const getContainerHeight = () => {
        let maxHeight = 0;
        const container = document.querySelector(`.${styles.eventPicture}`);
        if (!container || !container.clientWidth) return;

        const containerWidth = container.clientWidth;

        if (events && events.length > 0) {
            let processedImages = 0;

            events.forEach((event) => {
                getImageSize(event.preview, containerWidth, (scaledHeight) => {
                    if (scaledHeight > maxHeight) {
                        maxHeight = scaledHeight;
                    }

                    processedImages++;
                    if (processedImages === events.length) {
                        setContainerHeight(maxHeight); // Обновляем высоту только после завершения всех вычислений
                    }
                });
            });
        }
    };

    // Состояние для отслеживания текущего индекса события
    const [currentEventIndex, setCurrentEventIndex] = useState(0);




    // Функция для переключения на следующее событие
    const handleNextEvent = () => {
        if (events && currentEventIndex < events.length - 1) {
            setCurrentEventIndex(currentEventIndex + 1);
        }
    };

    // Функция для переключения на предыдущее событие
    const handlePreviousEvent = () => {
        if (currentEventIndex > 0) {
            setCurrentEventIndex(currentEventIndex - 1);
        }
    };

    useEffect(() => {
        if (memoizedEvents && memoizedEvents.length > 0) {
            getContainerHeight();
        }
    }, [memoizedEvents]);

    useEffect(() => {
        const handleResize = () => {
            if (memoizedEvents && memoizedEvents.length > 0) {
                getContainerHeight();
            }
        };
        window.addEventListener("resize", handleResize);
        // Очистка слушателя
        return () => window.removeEventListener("resize", handleResize);
    }, [memoizedEvents]);


    if (eventsIsLoading || eventsError || !events || events.length === 0) return null;

    const currentEvent = events[currentEventIndex];

    return(
        <div className={styles.barEventsContainer} style={{height: containerHeight}}>
            <div className={styles.barEvent}>
                <div className={styles.soonAtBar}><h1>{title}</h1></div>
                <div className={styles.eventPictureMobile}>
                    <img src={currentEvent?.preview} alt=''></img>
                </div>
                <div className={styles.eventDescriptionContainer}>
                    <ArrowButton direction="left" className={styles.leftArrow} onClick={handlePreviousEvent} withBg={true}></ArrowButton>
                    <div className={styles.eventDescription}>
                        <h2>{currentEvent?.title}</h2>
                        <p className={styles.eventDate}>{currentEvent?.date_formated}</p>
                        <p>{currentEvent?.text}</p>
                        <Link to={currentEvent?.url} className={styles.orderTable}>
                            Подробнее
                            <ArrowDiagonalIcon/>
                        </Link>
                    </div>
                    <ArrowButton direction="right" className={styles.rightArrow} onClick={handleNextEvent} withBg={true}></ArrowButton>
                </div>
            </div>
            <div className={styles.eventPicture}>
                <img src={currentEvent?.preview} alt=""></img>
            </div>
        </div>
    )
}