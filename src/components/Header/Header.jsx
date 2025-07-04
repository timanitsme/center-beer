import styles from "./Header.module.scss"

import {useEffect, useRef, useState} from "react";
import {isMobile} from "react-device-detect";
import {TgIcon} from "../../assets/TgIcon.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import CenterBeerLogo from "../../assets/logo-new.svg?react"
import {BurgerIcon} from "../../assets/BurgerIcon.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import CloseIcon from "../../assets/close-icon.svg?react"
import ArrowDownIcon from "../../assets/arrow-down-icon.svg?react"
import AvatarDefault from "../../assets/avatar-default.svg";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/services/authSlice.js";


export default function Header({paths}){
    const dispatch = useDispatch()
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    const [expandedPaths, setExpandedPaths] = useState([]);
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();
    const switchTheme = () => {
        setToggleState(!toggleState);
    };
    const [isOpen, setIsOpen] = useState(false); // Состояние меню
    const menuRef = useRef(null); // Ссылка на контейнер меню
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const path = useLocation()
    const [lastScrollPosition, setLastScrollPosition] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            if (path.pathname === "/event-map/") return;
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition > lastScrollPosition) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollPosition]);

    // Закрытие меню при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const handleExit = () => {
        dispatch(logout())
        navigate("/login/")
    }

    return(
        <>
            <div className={styles.headerSpace}></div>
            <div className={`${styles.header} ${isHeaderVisible ? '' : styles.hidden}`}>
                <div className={styles.headerGrid}>
                    <div className={styles.logoMenu}>
                        <a onClick={toggleMenu}>{isMenuOpen? <CloseIcon/> : <BurgerIcon/>}</a>
                        <div className={styles.logoWrapper} onClick={() => navigate("/")}>
                            <CenterBeerLogo/>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        {!isMobile &&
                            <div className={styles.menuItems}>
                                {paths.map((path) => {
                                    return(
                                        <div className={styles.pathContainer} key={path.path} onMouseEnter={() => {setHoveredPath(path.path)}} onMouseLeave={() => {setHoveredPath(null)}}>
                                            <Link className={`${(currentPage === path.path) || (path.children?.some(child => child.path === currentPage))? styles.active: ''} aa-p1`} to={path.path}>{path.title}</Link>
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
                                        className={`${((currentPage === path.path) || (path.children?.some(child => child.path === currentPage))) ? styles.active : ''} ${expandedPaths.includes(path.path)? styles.open: ''}`}
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
                        {/*<Toggle label={toggleState ? "Темная тема" : "Светлая тема"} toggled={toggleState} onClick={switchTheme} />*/}
                        {!isMobile &&
                            <div className={styles.socials}>
                                <a href="https://t.me/Alexomel81"><TgIcon/></a>
                                <a href="https://vk.com/center.beer"><VkIcon/></a>
                                <a href="mailto:hello@center.beer"><MailIcon/></a>
                            </div>
                        }
                    </div>
                    <div className={styles.userContainer}>
                        {isAuthorized && !profileIsLoading &&
                            <div className={styles.pathContainer} ref={menuRef}>
                                <div className={styles.profile} onClick={(e) => {e.stopPropagation(); setIsOpen(!isOpen)}}>
                                    <img className={styles.avatar} src={AvatarDefault} alt=''></img>
                                    <p className={`${styles.bold} ma-p1 ${styles.mw600}`}>{userProfile?.nickname}</p>
                                </div>
                                <div className={`${styles.userMenu} ${isOpen? "": styles.hidden}`}>
                                    <a onClick={() => {setIsOpen(false); navigate("/account/")}}>Профиль</a>
                                    <a href="">Избранное <div className="quantity"><p>2</p></div></a>
                                    <a href="">Кладовка</a>
                                    <a href="">Заказы</a>
                                    <a onClick={()=> {setIsOpen(false); handleExit()}}>Выход</a>
                                </div>
                            </div>
                        }
                        {!isAuthorized && !profileIsLoading && <SimpleButton onClick={() => navigate("/login/")} text={"Войти в аккаунт"}></SimpleButton>}
                    </div>
                </div>
            </div>
        </>
    )
}