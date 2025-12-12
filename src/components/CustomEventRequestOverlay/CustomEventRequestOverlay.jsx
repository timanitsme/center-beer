import styles from "./CustomEventRequestOverlay.module.scss"
import {useEffect, useRef} from "react";
import CloseIcon from "../../assets/close-icon.svg?react"

export default function CustomEventRequestOverlay({ isExpanded, setIsExpanded }) {
    const formContainerRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            document.body.classList.add('no-scroll');

            const existingScript = document.querySelector('script[data-b24-form]');
            if (!existingScript && formContainerRef.current) {
                const script = document.createElement('script');
                script.src = `https://cdn-ru.bitrix24.ru/b35920520/crm/form/loader_6.js?${Date.now() / 180000 | 0}`;
                script.async = true;
                script.setAttribute('data-b24-form', 'inline/6/behc11');
                script.setAttribute('data-skip-moving', 'true');

                formContainerRef.current.appendChild(script);

                return () => {
                    document.body.classList.remove('no-scroll');
                    if (formContainerRef.current && formContainerRef.current.contains(script)) {
                        formContainerRef.current.removeChild(script);
                    }
                };
            }
        } else {
            document.body.classList.remove('no-scroll');
        }
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

                <div ref={formContainerRef} data-b24-form="inline/6/behc11" data-skip-moving="true"></div>
            </div>
            }

        </section>
    )
}