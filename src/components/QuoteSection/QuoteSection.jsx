import styles from "./QuoteSection.module.scss"
import QuoteIcon from "../../assets/quote-icon.svg?react"

export default function QuoteSection(){
    return(
        <div className={styles.quoteSection} id="quote-section">
            <h1>Цитаты великих</h1>
            <div className={styles.quoteContainer}>
                <QuoteIcon></QuoteIcon>
                <div className={styles.quoteDescription}>
                    <h3 className="ma-h3-small">Можно выпить только 30 или даже 40 кружек пива в день, независимо от того, насколько ты богат.</h3>
                    <p className="ma-p">Адольф Буш</p>
                </div>
            </div>
        </div>
    )
}