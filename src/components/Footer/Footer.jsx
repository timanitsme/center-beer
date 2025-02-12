import styles from "./Footer.module.css"
import CenterBeerLogo from "../../assets/center-beer-logo.svg?react";


export default function Footer(){
    return(
        <div className={styles.footer} >
            <div className={styles.footerLeft}>
                <div className={styles.footerTop}>
                    <div className={styles.bottomMenuColumn}>
                        <CenterBeerLogo/>
                        <p style={{maxWidth: "250px"}}>Информационный портал для всех любителей пива</p>
                    </div>
                    <div className={styles.bottomMenu}>
                        <div className={styles.bottomMenuColumn}>
                            <a>ПИВО</a>
                            <a>БАРЫ И МАГАЗИНЫ</a>
                            <a>МЕРОПРИЯТИЯ</a>
                        </div>
                        <div className={styles.bottomMenuColumn}>
                            <a>О ПРОЕКТЕ</a>
                            <a>НОВОСТИ</a>
                            <a>КОНТАКТЫ</a>
                        </div>
                    </div>
                    <div className={styles.bottomMenuColumn} style={{gap: "5px", textAlign: "end", marginLeft: "auto" }}>
                        <h1>+7 (499) 938-46-71</h1>
                        <p>hello@center.beer</p>
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
    )
}