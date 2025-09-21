import styles from "./CustomEventRequestOverlay.module.scss"
import {useEffect} from "react";
import CloseIcon from "../../assets/close-icon.svg?react"

export default function CustomEventRequestOverlay({isExpanded, setIsExpanded}){
    useEffect(() => {
        // Добавляем класс no-scroll к body при открытии overlay
        if (isExpanded) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Очистка при размонтировании компонента
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isExpanded]);


    return(
        <section className={`${styles.requestOverlay} ${isExpanded? styles.expanded: ""}`}>
            {isExpanded &&
            <div className={styles.overlayContent}>
                <div className={styles.sectionHeader}>
                    <div className={styles.mobileRemove}></div>
                    <div className={styles.textInfo}>
                        <h2 className="ma-h3">Свяжитесь с нами - мы поможем все организовать</h2>
                        <p className={`${styles.description} ma-p`}>Оставьте заявку, и мы поможем воплотить вашу идею в жизнь. Удобно, быстро, без лишних забот.</p>
                    </div>

                    <div className={styles.closeButton} onClick={() => setIsExpanded(!isExpanded)}><CloseIcon/></div>
                </div>

                <iframe className={styles.formFrame}  src="https://forms.amocrm.ru/rcltwmv"></iframe>
            </div>
            }

        </section>
    )
}