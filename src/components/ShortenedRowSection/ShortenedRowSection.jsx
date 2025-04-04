import styles from "./ShortenedRowSection.module.css"
import BarImage1 from "../../assets/barsMocks/bar-3.svg";
import BarImage2 from "../../assets/barsMocks/bar-2.svg";
import BarImage3 from "../../assets/barsMocks/bar-5.svg";
import BarImage4 from "../../assets/barsMocks/bar-4.svg";
import BarImage5 from "../../assets/barsMocks/bar-1.svg";
import MinimalBarCard from "../Cards/BarCard/MinimalBarCard.jsx";

export default function ShortenedRowSection({title, cards=[], CardComponent}){
    return(
        <div className={styles.sectionContainer}>
            <h3>{title}</h3>
            <div className={styles.cardsRow}>
                {cards.length > 0 && cards?.map((card, index) => {
                    return <CardComponent key={index} cardInfo={card}></CardComponent>
                })}
                <div className={styles.showMore}>
                    <p>Все (22)</p>
                </div>
            </div>

        </div>
    )
}