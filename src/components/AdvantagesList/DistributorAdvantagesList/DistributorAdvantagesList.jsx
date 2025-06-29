import WalletIcon from "../../../assets/advantages/WalletIcon.jsx";
import TimeWalletIcon from "../../../assets/advantages/time-wallet-icon.svg?react";
import MapIcon from "../../../assets/advantages/map-icon.svg?react";
import TruckIcon from "../../../assets/advantages/truck-icon.svg?react";
import DiscountIcon from "../../../assets/advantages/discount-icon.svg?react";
import BankCardsIcon from "../../../assets/advantages/bank-cards-icon.svg?react";
import BeerTapIcon from "../../../assets/advantages/beer-tap-outlined-icon.svg?react";
import SpeakerIcon from "../../../assets/advantages/speaker-icon.svg?react";
import styles from "../AdvantagesList.module.scss";

export default function DistributorAdvantagesList(){
    const mainAdvantage = {icon: <MapIcon/>, title: "ПОКРЫТИЕ", description: ["Москва, Санкт-Петербург, Новосибирск, Екатеринбург, Казань, Нижний Новгород, Челябинск, Самара, Омск, Ростов-на-Дону, Уфа, Красноярск, Воронеж, Пермь, Волгоград"]}
    const advantages = [
        {icon: <TruckIcon/>, title: "РАБОТАЕМ С ТРАНСПОРТНЫМИ КОМПАНИЯМИ", description: ["ПЭК", "Деловые линии", "СДЭК"]},
        {icon: <WalletIcon/>, title: "МИНИМАЛЬНАЯ СУММА ЗАКАЗА", description: ["20000₽"]},
        {icon: <TimeWalletIcon/>, title: "МАКСИМАЛЬНАЯ ОТСРОЧКА", description: ["6 месяцев"]},
        {icon: <TruckIcon/>, title: "УСЛОВИЯ НА ПЕРВЫЕ ПОСТАВКИ", description: ["от 20000₽", "предоплата 100%", "от 4 видов продукции"]},
        {icon: <BankCardsIcon/>, title: "СПОСОБЫ ОПЛАТЫ", description: ["наличный", "безналичный"]},
        {icon: <BeerTapIcon/>, title: "ПРЕДОСТАВЛЯЕМ ОБОРУДОВАНИЕ", description: ["да"]},
        {icon: <SpeakerIcon/>, title: "МАРКЕТИНГОВЫЙ БЮДЖЕТ", description: ["да"]},
        {icon: <DiscountIcon/>, title: "POSM", description: ["да"]},
    ]


    return(
        <div className={styles.advantagesListContainer}>
            <div className={styles.mainAdvantage}>
                    {mainAdvantage.icon}
                    <div>
                        <h3>{mainAdvantage.title}</h3>
                        {mainAdvantage.description.map((item) => {
                            return(
                                <p key={item}>{item}</p>
                            )
                        })}
                    </div>
            </div>
            {advantages.map((advantage, index) =>{
                return(
                    <div key={index} className={styles.advantagesListItem}>
                        {advantage.icon}
                        <div>
                            <h3>{advantage.title}</h3>
                            {advantage.description.map((item) => {
                                return(
                                    <p key={item}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}