import styles from "./IndexSection.module.css"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import Cap from "../../assets/cap.svg?react"
import NoCapBottle from "../../assets/bottle-no-cap.svg?react"
import IndexBackground from "../../assets/index-background.svg"
import {useState} from "react";

export default function IndexSection(){
    const [showTitle, setShowTitle] = useState(false);

    return(
        <div className={styles.sectionContainer}>

            <div className={`${styles.cap} ${showTitle? styles.show: ""}`}><Cap/></div>
            <div className={`${styles.titleContainer} ${showTitle? styles.show: ""}`} >
                <p className={styles.textPrimary}>Центральный портал о пиве</p>
                <div>
                    <h1 style={{color: "var(--txt-secondary)"}}>Для тех, кто его</h1>
                    <h1>Варит, любит и продаёт</h1>
                </div>
                <SimpleButton text="Подробнее о проекте"></SimpleButton>
            </div>
            <div className={styles.bottle} onClick={() => setShowTitle(!showTitle)}><NoCapBottle/></div>
        </div>
    )
}