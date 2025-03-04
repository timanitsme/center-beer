import styles from "./SectionHeader.module.css"

export default function SectionHeader({title, description, addMargin=true, filler=true}){
    return(
        <div className={`${styles.catalogHeader} ${addMargin && styles.margin}`}>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {/*Филлер для переноса текста*/}
            {filler && <div className={styles.filler} style={{width: "20%"}}></div>}
        </div>
    )
}