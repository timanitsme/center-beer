import styles from "./HeroSection.module.scss"
import EventHeroMock from "../../assets/bgPictures/event-hero-mock.webp"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function HeroSection({calculatorRef, orderRef}){

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
        <section className={styles.hero}>
            <div className={`${styles.gradient} ${styles.top}`}/>
            <div className={styles.heroContent}>
                <h1 className="ma-h1" style={{fontWeight: 500}}>13 Правил хорошего вечера: Ваш праздник в 13Rules</h1>

                <div className={styles.features}>
                    <p className="ma-p">Кухня и бар</p>
                    <div className={styles.dot}/>
                    <p className="ma-p">Музыка</p>
                    <div className={styles.dot}/>
                    <p className="ma-p">Экраны</p>
                    <div className={styles.dot}/>
                    <p className="ma-p">Пакеты &#34;Под ключ&#34;</p>
                    <div className={styles.dot}/>
                    <p className="ma-p">Зал до 50 человек</p>
                </div>

                <div className={styles.buttonsRow}>
                    <SimpleButton text="Узнать стоимость" style="third" onClick={() => handleScroll(calculatorRef)} textStyle="white"/>
                    <SimpleButton text="Забронировать дату" onClick={() => handleScroll(orderRef)}/>
                    <SimpleButton text="Связаться с нами" style="third" textStyle="white"/>
                </div>
            </div>
            <div className={`${styles.gradient} ${styles.bottom}`}/>
        </section>
    )
}