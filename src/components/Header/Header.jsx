import styles from "./Header.module.css"

import {useState} from "react";
import Toggle from "../Toggle/Toggle.jsx";
import {isMobile} from "react-device-detect";
import {TgIcon} from "../../assets/TgIcon.jsx";
import {WhatsAppIcon} from "../../assets/WhatsAppIcon.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import CenterBeerLogo from "../../assets/logo-new.svg?react"
import {BurgerIcon} from "../../assets/BurgerIcon.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CloseIcon from "../../assets/close-icon.svg?react"
import ArrowDownIcon from "../../assets/arrow-down-icon.svg?react"


export default function Header({paths}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const [expandedPaths, setExpandedPaths] = useState([]);
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();
    const switchTheme = () => {
        setToggleState(!toggleState);
    };

    const toggleMenu = () => {
        if (isMenuOpen) setExpandedPaths([])
        setIsMenuOpen(!isMenuOpen); // Переключение состояния меню

    };

    const toggleExpand = (path) => {
        if (expandedPaths.includes(path)) {
            setExpandedPaths(expandedPaths.filter(p => p !== path));
        } else {
            setExpandedPaths([...expandedPaths, path]);
        }
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
                                    <div className={styles.pathContainer} key={path.path} onMouseEnter={() => setHoveredPath(path.path)} onMouseLeave={() => setHoveredPath(null)}>
                                        <Link className={(currentPage === path.path) || (path.children?.some(child => child.path === currentPage))? styles.active: ''} to={path.path}>{path.title}</Link>
                                        {hoveredPath === path.path && path.children && (
                                            <div className={styles.subMenu}>
                                                {path.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        to={child.path}
                                                        className={`${styles.subMenuItem} ${currentPage === child.path ? styles.active : ''}`}
                                                    >
                                                        {child.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                    <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
                        {paths.map((path) => (
                        <div key={path.path}>
                            <div className={styles.mobileMenuItem}>
                                <Link
                                    to={path.children? currentPage: path.path}
                                    className={((currentPage === path.path) || (path.children?.some(child => child.path === currentPage))) ? styles.active : ''}
                                    onClick={() => {
                                        if (path.children) {
                                            toggleExpand(path.path);
                                        } else {
                                            navigate(path.path)
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                >
                                    {path.title} {path.children && <ArrowDownIcon/>}
                                </Link>

                            </div>
                            {expandedPaths.includes(path.path) && path.children && (
                                <div className={styles.subMenuMobile}>
                                    {path.children.map((child) => (
                                        <Link
                                            key={child.path}
                                            to={child.path}
                                            className={`${styles.subMenuItemMobile} ${currentPage === child.path ? styles.active : ''}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {child.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
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