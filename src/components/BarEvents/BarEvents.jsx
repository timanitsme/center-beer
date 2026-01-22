import styles from "./BarEvents.module.scss"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import ArrowDiagonalIcon from "../../assets/arrow-diagonal-icon.svg?react"
import {useGetBarEventsQuery, useGetBreweryEventsQuery} from "../../store/services/centerBeer.js";
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";


export default function BarEvents({title = "Скоро в баре", alias="bar", id=1, ref=null}){
    const {data: barEvents, isLoading: barEventsIsLoading, error: barEventsError} = useGetBarEventsQuery({bar_id: id}, {skip: alias !== "bar"})
    const {data: breweryEvents, isLoading: breweryEventsIsLoading, error: breweryEventsError} = useGetBreweryEventsQuery({brew_id: id}, {skip: alias !== "brewery"})
    const [containerHeight, setContainerHeight] = useState(500);

    const eventsData = {
        bar: {data: barEvents, isLoading: barEventsIsLoading, error: barEventsError},
        brewery: {data: breweryEvents, isLoading: breweryEventsIsLoading, error: breweryEventsError}
    }

    const currentEvents = eventsData[alias]
    const memoizedEvents = useMemo(() => currentEvents?.data?.data, [currentEvents.data]);


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

        if (currentEvents?.data?.data && currentEvents?.data?.data.length > 0) {
            let processedImages = 0;

            currentEvents?.data?.data.forEach((event) => {
                getImageSize(event.preview, containerWidth, (scaledHeight) => {
                    if (scaledHeight > maxHeight) {
                        maxHeight = scaledHeight;
                    }

                    processedImages++;
                    if (processedImages === currentEvents?.data.data.length) {
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
        if (currentEvents?.data?.data && currentEventIndex < currentEvents?.data?.data.length - 1) {
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
    }, [memoizedEvents, currentEvents?.isLoading]);


    if (currentEvents?.isLoading || currentEvents?.error || !currentEvents?.data || currentEvents?.data?.data?.length === 0 || !currentEvents?.data?.data?.length) return null;
    const currentEvent = currentEvents?.data?.data?.[currentEventIndex];

    return(
        <div id="bar-events" className={styles.barEventsContainer} style={{minHeight: containerHeight}} ref={ref}>
            <div className={styles.barEvent}>
                <div className={styles.soonAtBar}><h1 className="text-big">{title}</h1></div>
                <div className={styles.eventPictureMobile}>
                    <img src={currentEvent?.preview} alt=''></img>
                </div>
                <div className={styles.eventDescriptionContainer}>
                    <ArrowButton direction="left" className={styles.leftArrow} onClick={handlePreviousEvent} withBg={true}></ArrowButton>
                    <div className={styles.eventDescription}>
                        <h4 className="ma-h4">{currentEvent?.title}</h4>
                        <p className={`${styles.eventDate} ma-p`}>{currentEvent?.date_formated}</p>
                        <div className="ma-p" dangerouslySetInnerHTML={{ __html: currentEvent?.text }} />
                        <Link to={currentEvent?.url} className={`${styles.orderTable} ma-p`}>
                            Подробнее
                            <ArrowDiagonalIcon/>
                        </Link>
                    </div>
                    <ArrowButton direction="right" className={styles.rightArrow} onClick={handleNextEvent} withBg={true}></ArrowButton>
                </div>
            </div>
            <div className={styles.eventPicture}>
                <img onClick={() => window.location.href = currentEvent?.url} src={currentEvent?.preview} alt=""></img>
            </div>
        </div>
    )
}