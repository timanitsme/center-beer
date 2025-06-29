import styles from "./QuoteSection.module.scss"
import QuoteIcon from "../../assets/quote-icon.svg?react"

export default function QuoteSection(){
    return(
        <div className={styles.quoteSection}>
            <h1>Цитаты великих</h1>
            <div className={styles.quoteContainer}>
                <QuoteIcon></QuoteIcon>
                <div className={styles.quoteDescription}>
                    <h3>Можно выпить только 30 или даже 40 кружек пива в день, независимо от того, насколько ты богат.</h3>
                    <p>Адольф Буш</p>
                </div>
            </div>
        </div>
    )
}