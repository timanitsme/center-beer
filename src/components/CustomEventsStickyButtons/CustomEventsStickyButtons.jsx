import styles from "./CustomEventsStickyButtons.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {motion} from "motion/react"
import {FaWhatsapp} from "react-icons/fa6";


export default function CustomEventsStickyButtons({isVisible, calculatorRef, requestOverlay, setRequestOverlay}){
    if (isVisible || requestOverlay) return null;

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const handleWhatsappRedirect = () => {
        window.location.href = "https://api.whatsapp.com/send?phone=79162980614";
    };

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
        <motion.section className={styles.stickyButtons} variants={containerVariants} initial="hidden" animate="visible">
            <div className={styles.costButton}><SimpleButton text="Узнать стоимость" onClick={() => handleScroll(calculatorRef)}/></div>
            <SimpleButton text="Забронировать дату" onClick={() => {window.scrollTo(0, 0);setRequestOverlay(true)}}/>
            <div className={styles.wa} onClick={handleWhatsappRedirect}><SimpleButton text="Whatsapp"/></div>
            <div className={styles.waMobile} onClick={handleWhatsappRedirect}><FaWhatsapp/></div>
        </motion.section>
    )
}