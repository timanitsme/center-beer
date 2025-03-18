import styles from "./OrderCard.module.css"


export default function OrderCard({cardInfo}){


    return(
        <div className={styles.card}>
            <div className={styles.headerRow}>
                <div className={styles.dateAndStatus}>
                    <h3>Заказ от {cardInfo.date}</h3>
                    {cardInfo.status === 1 && <div className={`${styles.status} ${styles.delivered}`}><p>Можно забирать</p></div>}
                    {cardInfo.status === 2 && <div className={`${styles.status} ${styles.preparing}`}><p>Готовится к отправке</p></div>}
                </div>
                <h3>{cardInfo.cost}₽</h3>
            </div>
            <div className={styles.itemsRow}>
                {cardInfo.content.map((item, index) =>
                    <div key={index} className={styles.imageWrapper}>
                        <img src={item} alt=""/>
                    </div>
                )}
            </div>
            <div className={styles.description}>
                <p>Получение:</p>
                {cardInfo.receiving === 1 && <p className={styles.active}>Самовывоз</p>}
                {cardInfo.receiving === 2 && <p className={styles.active}>Доставка курьером</p>}
            </div>
            <div className={styles.description}>
                <p>Адрес:</p>
                <p className={styles.active}>{cardInfo.address}</p>
            </div>
        </div>
    )
}