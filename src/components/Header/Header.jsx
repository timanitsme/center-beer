import styles from "./Header.module.css"

import {useState} from "react";
import Toggle from "../Toggle/Toggle.jsx";
import {isMobile} from "react-device-detect";
import {TgIcon} from "../../assets/TgIcon.jsx";
import {WhatsAppIcon} from "../../assets/WhatsAppIcon.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import CenterBeerLogo from "../../assets/center-beer-logo.svg?react"
import {BurgerIcon} from "../../assets/BurgerIcon.jsx";


export default function Header(){
    const [toggleState, setToggleState] = useState(false);

    const switchTheme = () =>{
        setToggleState(!toggleState);
    }
    return(
        <div className={styles.header}>
            <div className={styles.headerGrid}>
                <div className={styles.logoMenu}>
                    <BurgerIcon/>
                    <CenterBeerLogo/>
                </div>
                <div className={styles.menu}>
                    {!isMobile &&
                        <div className={styles.menuItems}>
                            <a>ПИВО</a>
                            <a>БАРЫ И МАГАЗИНЫ</a>
                            <a>МЕРОПРИЯТИЯ</a>
                            <a>О ПРОЕКТЕ</a>
                            <a>НОВОСТИ</a>
                            <a>КОНТАКТЫ</a>
                        </div>
                    }
                </div>
                <div className={styles.socialsTheme}>
                    <Toggle label={toggleState ? "Темная тема" : "Светлая тема"} toggled={toggleState} onClick={switchTheme} />
                    {!isMobile &&
                    <div className={styles.socials}>
                        <TgIcon/>
                        <WhatsAppIcon/>
                        <a href="https://vk.com/center.beer.news"><VkIcon/></a>
                        <a href="mailto:hello@center.beer"><MailIcon/></a>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}