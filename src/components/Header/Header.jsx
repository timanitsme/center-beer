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
import {Link, useLocation} from "react-router-dom";
import CloseIcon from "../../assets/close-icon.svg?react"


export default function Header({paths}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const currentPage = useLocation().pathname;
    const switchTheme = () => {
        setToggleState(!toggleState);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Переключение состояния меню
    };

    return(
        <div className={styles.header}>
            <div className={styles.headerGrid}>
                <div className={styles.logoMenu}>
                    <a onClick={toggleMenu}>{isMenuOpen? <CloseIcon/> : <BurgerIcon/>}</a>
                    <CenterBeerLogo/>
                </div>
                <div className={styles.menu}>
                    {!isMobile &&
                        <div className={styles.menuItems}>
                            {paths.map((path) => {
                                return(
                                    <Link className={currentPage === path.path? styles.active: ''} key={path.path} to={path.path}>{path.title}</Link>
                                )
                            })}
                        </div>
                    }
                </div>
                    <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
                        {paths.map((path) => (
                            <Link
                                className={currentPage === path.path ? styles.active : ''}
                                key={path.path}
                                to={path.path}
                                onClick={toggleMenu}
                            >
                                {path.title}
                            </Link>
                        ))}
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