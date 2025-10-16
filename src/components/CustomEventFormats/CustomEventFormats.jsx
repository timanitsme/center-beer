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
        {id: 1, Icon: LockIcon, bg: true, title: "Полная аренда", description: "весь бар только для вас и ваших гостей на весь день", price: "от 50 000 ₽", condition: <><p>
                Аренда бара — от 2 до 8 часов<br/>
                📅 Любой день недели (кроме пятницы и
                субботы — обсуждаются индивидуально).
            </p>
                <br/><b>Включено:</b>
                <li><p>ТВ-экраны и музыкальное оборудование</p></li>
                <li><p>Колонки (для презентаций, тренингов, караоке, квизов и др.)</p></li>
                <li>Бармен</li>
                <b>Дополнительно:</b>
                <br/><p>🍴 Банкет или фуршет</p>
                <br/><p>🥂 Возможность принести свои еду и напитки</p>
                <br/><p>🎤 Ведущий, живая музыка, фотограф, DJ</p>
                <br/><p>👨‍🍳 Мастер-класс от шеф-повара</p></>},
        {id: 2, Icon: CircleQuarterIcon, title: "Частичная аренда", description: "днём бар полностью ваш до 19:00", price: "от 30 000 ₽", condition: <>
                <p>Бронь столика — от 6 человек</p>
                <br/><p>💳 Депозитная система</p>
                <br/><p>🍸 Скидка 20% на бар</p>
                <br/><p>👨‍🍳 Комплимент от шеф-повара</p></>},
        {id: 3, Icon: StarIcon, bg: true, title: "Все включено", description: "еда, напитки, программа, фото и видео. Всё под одной крышей", price: "от 100 000 ₽", condition: <>Полная аренда, ведущий, диджей, welcome-drink, комбо-наборы, декор, фото и видео</>},
        {id: 4, Icon: HybridCircleIcon, title: "Гибрид", description: "Индивидуальное решение для вашего формата", price: "Договорная цена", condition: <>ведущий от <b>15 000 ₽</b>, диджей от <b>20 000 ₽</b>, декор от <b>7 000 ₽</b>, фото/видео от <b>10 000 ₽</b>, тематические сеты/квизы от <b>5 000 ₽</b></>},
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
                        <div>
                            <p className="ma-p">{format.description}</p>
                        </div>

                        <div className={`${styles.buttons} ${isOpened === format.id ? styles.opened: ""}`}>
                            <h3 className="ma-h4" style={{color: "var(--primary)", marginBottom: "15px"}}>{format.price}</h3>
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
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}