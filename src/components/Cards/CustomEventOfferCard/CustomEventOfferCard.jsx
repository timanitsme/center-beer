import styles from "./CustomEventOfferCard.module.scss"

export default function CustomEventOfferCard({cardInfo}){
    return(
        <div className={styles.offerCard}>
            <cardInfo.Icon/>
            <h3 className="ma-h4" style={{textAlign: "left", fontWeight: 500}}>{cardInfo.title}</h3>
            <div className={styles.priceBox}>
                <h3 className="ma-h4" style={{fontWeight: 500, color: "var(--primary)"}}>{cardInfo.price}</h3>
                {cardInfo.badge.oldPrice && <h3 className="ma-h4" style={{fontWeight: 500, color: "var(--txt-secondary)", textDecoration: "line-through"}}>{cardInfo.badge.content}</h3>}
                {cardInfo.badge.benefit && <p className={`${styles.benefit} ma-p`}>{cardInfo.badge.content}</p>}
            </div>
            {cardInfo.characteristics.map((characteristic, index) =>
                <p key={index} className={`${styles.characteristic} ma-p`}>
                    {characteristic}
                </p>
            )}
            {cardInfo.disclaimer &&
                <p className={`${styles.characteristic} ${styles.disclaimer} ma-p`}>
                    {cardInfo.disclaimer}
                </p>
            }
        </div>
    )
}