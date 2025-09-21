import styles from "./HeroSection.module.scss"
import EventHeroMock from "../../assets/bgPictures/event-hero-mock.webp"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {FaWhatsapp} from "react-icons/fa6";

export default function HeroSection({calculatorRef, setRequestOverlay, heroRef}){

    const handleScroll = (targetRef) => {
        if (targetRef.current) {
            const scrollToPosition = (targetRef.current.getBoundingClientRect().top + window.scrollY) - (window.innerHeight / 2) + (targetRef.current.offsetHeight / 2);
            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth",
            });
        }
    };

    const handleWhatsappRedirect = () => {
        window.location.href = "https://api.whatsapp.com/send?phone=79162980614";
    };

    return(
        <section className={styles.hero}>
            <div className={`${styles.gradient} ${styles.top}`}/>
            <div className={styles.heroContent}>
                <div>
                    <h1 className="text-giant" style={{fontWeight: 600}}>13 Правил хорошего вечера:</h1>
                    <h1 className="text-giant" style={{fontWeight: 600, color: "var(--primary)"}}>Ваш праздник в 13Rules</h1>
                </div>


                <div className={styles.features}>
                    <p className="ma-p" style={{fontWeight: 500}}>Кухня и бар</p>
                    <div className={styles.dot}/>
                    <p className="ma-p" style={{fontWeight: 500}}>Музыка</p>
                    <div className={styles.dot}/>
                    <p className="ma-p" style={{fontWeight: 500}}>Экраны</p>
                    <div className={styles.dot}/>
                    <p className="ma-p" style={{fontWeight: 500}}>Пакеты &#34;Под ключ&#34;</p>
                    <div className={styles.dot}/>
                    <p className="ma-p" style={{fontWeight: 500}}>Зал до 50 человек</p>
                </div>

                <div className={styles.buttonsRow} ref={heroRef}>
                    <div className={styles.costButton}><SimpleButton text="Узнать стоимость" onClick={() => handleScroll(calculatorRef)}/></div>
                    <SimpleButton text="Забронировать дату" onClick={() => {scrollTo(0,0); setRequestOverlay(true)}}/>
                    <div className={styles.wa} onClick={handleWhatsappRedirect}><SimpleButton text="Whatsapp"/></div>
                    <div className={styles.waMobile} onClick={handleWhatsappRedirect}><FaWhatsapp/></div>
                </div>
            </div>
            <div className={`${styles.gradient} ${styles.bottom}`}/>
        </section>
    )
}