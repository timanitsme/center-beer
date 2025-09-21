import styles from "./CustomEventTypeCard.module.scss"

export default function CustomEventTypeCard({cardInfo, onClick}){

    return(
        <div className={styles.card} onClick={onClick}>
            {cardInfo.promo && <p className={`${styles.promo} ma-p`}>{cardInfo.promo}</p>}
            <div className={styles.pictureContainer}>
                <img src={cardInfo.image} alt=""></img>
            </div>
            <div className={styles.description}>
                <p className={styles.title}>{cardInfo.title}</p>
                <p className="ma-p">{cardInfo.description}</p>
            </div>
            <button className={`clear-button ${styles.chooseButton}`}>
                <p className="ma-p">ВЫБРАТЬ ФОРМАТ</p>
            </button>
        </div>
    )
}