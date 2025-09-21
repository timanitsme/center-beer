import styles from "./CustomEventTypes.module.scss";
import SectionHeader from "../SectionHeader/SectionHeader.jsx";
import CustomEventTypeCard from "../Cards/CustomEventTypeCard/CustomEventTypeCard.jsx";

export default function CustomEventTypes({cards, orderRef, setRequestOverlay}){

    const handleScroll = (targetRef) => {
        if (targetRef.current) {
            const scrollToPosition = (targetRef.current.getBoundingClientRect().top + window.scrollY) - (window.innerHeight / 2) + (targetRef.current.offsetHeight / 2);
            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth",
            });
        }
    };

    return(
        <>
            <SectionHeader title={"Организуем мероприятие под любой повод"} description={"Неважно, какой у вас план — отмечать личный праздник, собрать команду или устроить тематическую вечеринку. Мы знаем, как сделать ваше событие особенным!"}/>
            <div className={styles.typesCatalog}>
                {cards.map((card, index) =>
                    <CustomEventTypeCard key={index} cardInfo={card} onClick={() => setRequestOverlay(true)}/>
                )}

            </div>

        </>
    )
}