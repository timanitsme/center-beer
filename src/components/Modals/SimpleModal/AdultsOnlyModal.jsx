import {useEffect, useState} from "react";
import styles from "./SimpleModal.module.scss";
import CloseIcon from "../../../assets/close-icon.svg?react";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";

export default function AdultsOnlyModal(){
    const [show, setShow] = useState(false)
    const style = {}
    const title = "Привет"
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    useEffect(() => {
        const adult = localStorage.getItem("adultConsent");
        if (!adult) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("adultConsent", "accepted");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()} style={style}>
                <div className={styles.adultContent}>
                    <h2 className={`${styles.outlineTitle} text-large`}>Вам есть 18 лет?</h2>
                    <p className={styles.center}>Информация на сайте не предназначена для посетителей младше 18 лет. <br/> Для доступа к ней подтвердите, пожалуйста, свое совершеннолетие.</p>
                    <SimpleButton text="Да, мне есть 18 лет" onClick={handleAccept}/>
                </div>
            </div>
        </div>
    )

}