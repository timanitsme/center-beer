import {useState} from "react";
import styles from "./SwitchRowSection.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import ShortenedRowSection from "../ShortenedRowSection/ShortenedRowSection.jsx";

export default function SwitchRowSectionApi({title, option}){
    if (option?.cards.data){
        return(
            <div className={styles.sectionContainer}>
                {title && <h3>{title}</h3>}
                <ShortenedRowSection cards={option?.cards.data} maxCards={option.maxCards} CardComponent={option.CardComponent} totalItems={option.cards?.total_items}></ShortenedRowSection>
            </div>
        )
    }

}