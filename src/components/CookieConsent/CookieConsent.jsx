import {useEffect, useState} from "react";
import styles from "./CookieConsent.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {useNavigate} from "react-router-dom";


const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.cookieConsent}>
            <p>
                Используя сайт center.beer, вы соглашаетесь с использованием файлов cookie и обработкой Ваших персональных данных с помощью сервиса "Яндекс.Метрика".
            </p>
            <div className={styles.cookieConsentActions}>
                <SimpleButton text="Подтверждаю" onClick={handleAccept}/>
                <SimpleButton text="Подробнее" style="secondary" withBg={false} onClick={() => navigate("/in-dev")}/>
            </div>
        </div>
    );
};

export default CookieConsent;