import styles from "./CheckInCard.module.css"
import Bottle1 from "../../../assets/bottlesMock/bottle-1.svg";
import Review1 from "../../../assets/reviewsMocks/beer-review-1.svg";
import Review2 from "../../../assets/reviewsMocks/beer-review-2.svg";
import Review3 from "../../../assets/reviewsMocks/beer-review-3.svg";
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react";
import TrashIcon from "../../../assets/trash-icon.svg?react";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import HopIcon from "../../../assets/hop-icon.svg?react";
import {HiDotsVertical} from "react-icons/hi";

export default function CheckInCard(){
    const cardInfo = {img: Bottle1, title: "Terra Firma", status: "published", rating: 5, comment: "Это классика, которая никогда не подводит! Легкий, освежающий вкус с мягкой горчинкой идеально подходит для жаркого летнего дня. Пью его много лет, и до сих пор это один из моих любимых вариантов. А еще отлично сочетается с соленой рыбкой или чипсами. Рекомендую всем, кто ценит простоту и качество!",
        photos: [Review1, Review2, Review3]}


    const getRatingIcons = (rating) => {
        const icons = [];
        const fullBottles = Math.floor(rating); // Целая часть рейтинга
        const hasHalfBottle = rating - fullBottles >= 0.1; // Есть ли половина бутылки

        for (let i = 0; i < 5; i++) {
            if (i < fullBottles) {
                icons.push(<BeerBottleIcon key={i} className={styles.beerIcon} />);
            } else if (i === fullBottles && hasHalfBottle) {
                icons.push(<HalfBeerBottleIcon key={i} className={styles.beerIcon} />);
            } else {
                icons.push(<EmptyBeerBottleIcon key={i} className={styles.beerIcon} />);
            }
        }

        return icons;
    };

    return(
        <div className={styles.card}>
            <div className={styles.headerRow}>
                <div className={styles.flexRow}>
                    <div className={styles.imageWrapper}>
                        <img src={cardInfo.img} alt=""/>
                    </div>
                    <div className={styles.flexCol}>
                        <h3>{cardInfo.title}</h3>
                        <p><span className={styles.active}>Производитель:</span> Konix Brewery</p>
                        <p><span className={styles.active}>Стиль:</span> APA - American</p>
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <HiDotsVertical/>
                </div>
            </div>
            <div className={styles.characteristics}>
                <div>
                    <p>Крепость:</p>
                    <p className={styles.active}>10%</p>
                </div>
                <div>
                    <p>Плотность:</p>
                    <p className={styles.active}>12%</p>
                </div>
                <div>
                    <p>Горечь</p>
                    <p className={styles.active}>40</p>
                </div>
            </div>
            <div className={styles.description}>
                <p>Оценка:</p>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(cardInfo.rating)}
                    </div>
                    <p className={styles.active}>({cardInfo.rating})</p>
                </div>
            </div>
            <div className={styles.description}>
                <p>Число дегустаций:</p>
                <p className={styles.active}>1</p>
            </div>
            <div className={styles.description}>
                <p>Первая проба:</p>
                <p className={styles.active}>1 апр. 2021</p>
            </div>
        </div>
    )
}