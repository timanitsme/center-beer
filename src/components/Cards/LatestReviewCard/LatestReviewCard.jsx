import styles from "./LatestReviewCard.module.css"
import Bottle1 from "../../../assets/bottlesMock/bottle-1.svg"
import Review1 from "../../../assets/reviewsMocks/beer-review-1.svg"
import Review2 from "../../../assets/reviewsMocks/beer-review-2.svg"
import Review3 from "../../../assets/reviewsMocks/beer-review-3.svg"
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react";
import TrashIcon from "../../../assets/trash-icon.svg?react"
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";

export default function LatestReviewCard(){
    const cardInfo = {img: Bottle1, title: "Terra Firma", status: "published", rating: 5, comment: "Это классика, которая никогда не подводит! Легкий, освежающий вкус с мягкой горчинкой идеально подходит для жаркого летнего дня. Пью его много лет, и до сих пор это один из моих любимых вариантов. А еще отлично сочетается с соленой рыбкой или чипсами. Рекомендую всем, кто ценит простоту и качество!",
        photos: [Review1, Review2, Review3]}

    return (
        <div className={styles.card}>
            <div className={styles.headerRow}>
                <div className={styles.flexRow}>
                    <div className={styles.imageWrapper}>
                        <img src={cardInfo.img} alt=""/>
                    </div>
                    <div className={styles.flexCol}>
                        <h3>{cardInfo.title}</h3>
                        {cardInfo.status === "published" && <div className={`${styles.status} ${styles.preparing}`}><p>Опубликован</p></div>}
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <TrashIcon/>
                    <SimpleButton text="Редактировать" style="secondary"></SimpleButton>
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
                <p>Комментарий:</p>
                <p className={styles.active}>{cardInfo.comment}</p>
            </div>
            <div className={styles.description}>
                <p>Фото:</p>
                <div className={styles.itemsRow}>
                    {cardInfo.photos.map((item, index) =>
                        <div key={index} className={`${styles.imageWrapper} ${styles.photos}`}>
                            <img src={item} alt=""/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}