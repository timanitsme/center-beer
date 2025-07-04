import styles from "./ActiveOrders.module.scss"
import OrderCard from "../Cards/OrderCard/OrderCard.jsx";
import Bottle1 from "../../assets/bottlesMock/bottle-1.svg"
import Bottle2 from "../../assets/bottlesMock/bottle-2.svg"
import Bottle3 from "../../assets/bottlesMock/bottle-3.svg"


export default function ActiveOrders(){
    const cards = [{ date: "20 ноября", status: 1, cost: 1700, receiving: 1, address: "Московская область, Люберцы, Октябрьский проспект, 141",
        content: [Bottle1, Bottle2]},
        {date: "25 ноября", status: 2, cost: 1700, receiving: 2, address: "Московская область, Люберцы, Октябрьский проспект, 141",
            content: [Bottle1, Bottle2, Bottle3]}]
    return(
        <div className={styles.ordersSection}>
            <div className={styles.headerRow}>
                <h3 className="ma-h3">Активные заказы</h3>
                <a href="" className="ma-p"><p>Все заказы (16)</p></a>
            </div>
            <div className={styles.orderCardsContainer}>
                {cards.map((card, index) =>
                    <OrderCard key={index} cardInfo={card}/>
                )}
            </div>
        </div>
    )
}