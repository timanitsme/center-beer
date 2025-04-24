import styles from "./Footer.module.css"
import CenterBeerLogo from "../../assets/logo-new.svg?react";
import AppPhone from "../../assets/app-phone.svg"
import QrCode from "../../assets/qr-code.svg"
import DownloadGooglePlay from "../../assets/download-google-play.svg?react"
import DownloadAppStore from "../../assets/download-app-store.svg?react"
import RoundLink from "../../assets/round-link.svg?react"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import {Link} from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className={styles.preFooter}>
               <img src={AppPhone} className={styles.phoneImg} alt=''></img>
                <div className={styles.preFooterItems}>
                    <div className={styles.textContainer}>
                        <h3>Сообщество любителей пива, владельцев баров и мастеров-пивоваров в вашем мобильном телефоне. </h3>
                        <p className={styles.textContainerP}>Мы рады представить наше новое мобильное приложение, которое позволит вам пользоваться нашим сервисом еще удобнее. Теперь вы можете наслаждаться общением с друзьями, делиться впечатлениями о пиве, находить ближайшие пивные пабы и бары в несколько касаний. Будьте в курсе последних новостей, рецептов и уникальных пивных событий, где бы вы ни находились.</p>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.downloadButton}>
                                <DownloadGooglePlay/>
                            </button>
                            <button className={styles.downloadButton}>
                                <DownloadAppStore/>
                            </button>
                            <RoundLinkButton text="Скачать .apk"/>
                        </div>
                    </div>
                    <div className={styles.qrCodeContainer}>
                        <img className={styles.qrCode} src={QrCode} alt=''></img>
                        <p>Для быстрого скачивания приложения, наведите камеру телефона на этот QR-код и нажмите на появившуюся ссылку.</p>
                    </div>
                </div>
            </div>
            <div className={styles.footer} >
                <div className={styles.footerLeft}>
                    <div className={styles.footerTop}>
                        <div className={styles.bottomMenuColumn}>
                            <CenterBeerLogo/>
                            <p style={{maxWidth: "250px"}}>Информационный портал для всех любителей пива</p>
                        </div>
                        <div className={styles.bottomMenu}>
                            <div className={styles.bottomMenuColumn}>
                                <Link to={"/beer"}>ПИВО</Link>
                                <Link to={"/bars"}>БАРЫ И МАГАЗИНЫ</Link>
                                <Link to={"/events"}>МЕРОПРИЯТИЯ</Link>
                            </div>
                            <div className={styles.bottomMenuColumn}>
                                <Link to={"https://center.beer/about/"}>О ПРОЕКТЕ</Link>
                                <Link to={"/news"}>НОВОСТИ</Link>
                                <Link to={"/contacts"}>КОНТАКТЫ</Link>
                            </div>
                        </div>
                        <div className={styles.bottomMenuColumn} style={{gap: "5px", textAlign: "end", marginLeft: "auto" }}>
                            <h1>+7 (499) 938-46-81</h1>
                            <a href="mailto:hello@center.beer">hello@center.beer</a>
                        </div>

                    </div>
                    <div className={styles.hrtLine} />
                    <div className={styles.footerBottom}>
                        <p>©CENTER.BEER все права защищены.</p>
                        <p style={{paddingLeft: "10px"}}>Условия использования и политика конфиденциальности</p>
                    </div>
                </div>
                <div className={styles.footerRight}>

                </div>
            </div>

        </>

    )
}