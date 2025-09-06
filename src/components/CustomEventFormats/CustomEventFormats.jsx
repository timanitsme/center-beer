import styles from "./CustomEventFormats.module.scss";
import LockIcon from "../../assets/lock-icon.svg?react";
import StarIcon from "../../assets/star-icon.svg?react";
import CircleQuarterIcon from "../../assets/circle-wth-quarter-icon.svg?react";
import HybridCircleIcon from "../../assets/hybrid-circle-icon.svg?react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import ArrowDownIcon from "../../assets/arrow-down-icon.svg?react"
import {useEffect, useState} from "react";

export default function CustomEventFormats(){
    const formats = [
        {id: 1, Icon: LockIcon, bg: true, title: "Полная аренда", description: "«только для своих», персонал, пульт/колонки/экраны, плейлист/диджей опционально", condition: <>от <b>50 000 ₽</b> + депозит на бар/кухню (от <b>30 000 ₽</b>)</>},
        {id: 2, Icon: StarIcon, bg: true, title: "Частичная аренда", description: "бронь 2–3 столов (10–15 чел), идеальна для мини-корпов/ДР", condition: <>депозит от <b>10 000 ₽/стол</b></>},
        {id: 3, Icon: CircleQuarterIcon, title: "Под Ключ", description: "сценарий, ведущий, диджей, декор, фото/видео", condition: <>ведущий от <b>15 000 ₽</b>, диджей от <b>20 000 ₽</b>, декор от <b>7 000 ₽</b>, фото/видео от <b>10 000 ₽</b>, тематические сеты/квизы от <b>5 000 ₽</b></>},
        {id: 4, Icon: HybridCircleIcon, title: "Гибрид", description: "открытая вечеринка + приватная зона (напр., ДР на 20 чел)"},
    ]
    const [isOpened, setIsOpened] = useState(0)


    return(
        <section className={styles.formatsSection}>
            <h1 className="ma-h2">Форматы проведения</h1>
            <div className={styles.formats}>
                {formats.map((format, index) =>
                    <div className={styles.format} key={index}>
                        {format.bg? <div className={styles.iconContainer}><format.Icon/></div>: <format.Icon/>}
                        <h3 className="ma-h4">{format.title}</h3>
                        <p className="ma-p">{format.description}</p>
                        <div className={`${styles.buttons} ${isOpened === format.id ? styles.opened: ""}`}>
                            {format.condition &&
                                <button className={`clear-button ${styles.conditionsButton}`} onClick={() => format.id !== isOpened? setIsOpened(format.id): setIsOpened(0)}>
                                    <span></span>
                                    <p className="ma-p">Условия</p>
                                    <ArrowDownIcon/>
                                </button>
                            }
                            <div className={`${styles.conditionsDetail}`}>
                                <p className="ma-p">
                                    {format.condition}
                                </p>
                            </div>
                            <button className={`clear-button ${styles.formatButton}`}><p className="ma-p">Получить смету</p></button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}