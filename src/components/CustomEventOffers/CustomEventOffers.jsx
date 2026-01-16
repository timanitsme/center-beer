import styles from "./CustomEventOffers.module.scss"
import SectionHeader from "../SectionHeader/SectionHeader.jsx";
import CustomEventOfferCard from "../Cards/CustomEventOfferCard/CustomEventOfferCard.jsx";

export default function CustomEventOffers({cards}){
    return(
        <section className={styles.offersSection} id="custom-event-offers">
            <SectionHeader title="ПАКЕТЫ И СПЕЦПРЕДЛОЖЕНИЯ" description="Неважно, какой у вас план — отмечать личный праздник, собрать команду или устроить тематическую вечеринку. Мы знаем, как сделать ваше событие особенным!"/>
            <div className={styles.offerCards}>
                {cards?.map((card, index) =>
                    <CustomEventOfferCard cardInfo={card} key={index}/>
                )}
            </div>
        </section>
    )
}