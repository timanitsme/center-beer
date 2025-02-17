import styles from "./BarEvents.module.css"
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import eventPicture from "../../assets/event-picture.svg"
import ArrowDiagonalIcon from "../../assets/arrow-diagonal-icon.svg?react"


export default function BarEvents(){
    const handleClick = () =>{

    }

    return(
        <div className={styles.barEventsContainer}>
            <div className={styles.barEvent}>
                <div className={styles.soonAtBar}><h1>Скоро в баре</h1></div>
                <div className={styles.eventPictureMobile}>
                    <img src={eventPicture}></img>
                </div>
                <div className={styles.eventDescriptionContainer}>
                    <ArrowButton direction="left" className={styles.leftArrow} onClick={handleClick} withBg={true}></ArrowButton>
                    <div className={styles.eventDescription}>
                        <h2>Московское дерби: ЦСКА - Спартак</h2>
                        <p className={styles.eventDate}>чт. 20 Сентября, 20:00</p>
                        <p>Друзья, как ваши дела? Как настроение? Сегодня у нас футбол!<br/><br/>
                            Давайте поддержим наших! Вас будет ждать наше классное пиво, наш заряженный бармен и ваша теплая дружная компания.</p>
                        <a className={styles.orderTable}>
                            Забронировать стол
                            <ArrowDiagonalIcon/>
                        </a>
                    </div>
                    <ArrowButton direction="right" className={styles.rightArrow} onClick={handleClick} withBg={true}></ArrowButton>
                </div>
            </div>
            <div className={styles.eventPicture}>
                <img src={eventPicture}></img>
            </div>
        </div>
    )
}