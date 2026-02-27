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
import indexBubblesBg from "../../assets/bgPictures/index-bubbles-bg.webp";
import CaretDownIcon from "../../assets/lucide/caret-down-icon.svg?react"
import {motion} from "motion/react";

export default function Header({paths, sidePaths, scrollRef=null, sections}){
    const dispatch = useDispatch()
    const { isAuthorized, userProfile, isLoading: profileIsLoading, isRefreshing } = useSelector((state) => state.auth);
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
    const [pageNavigationExpanded, setPageNavigationExpanded] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(sections?.[0]?.id || null);


    useEffect(() => {
        const handleScroll = () => {
            if (path.pathname === "/event-map/") return;

            const currentScrollPosition = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Обновление прогресса скролла
            if (scrollHeight > 0) {
                const progress = (currentScrollPosition / scrollHeight) * 100;
                setScrollProgress(progress);
            }

            // Определение текущей секции
            if (sections && sections.length > 0) {
                const sectionElements = sections.map(section => {
                    const element = document.getElementById(section.id);
                    if (!element) return null;

                    const rect = element.getBoundingClientRect();
                    return {
                        id: section.id,
                        top: rect.top + currentScrollPosition,
                        height: rect.height,
                    };
                }).filter(Boolean);

                const viewportCenter = currentScrollPosition + window.innerHeight / 2;
                let closestSection = null;
                let smallestDistance = Infinity;

                sectionElements.forEach(section => {
                    const sectionMiddle = section.top + section.height / 2; // Центр секции
                    const distanceToCenter = Math.abs(sectionMiddle - viewportCenter);

                    if (distanceToCenter < smallestDistance) {
                        smallestDistance = distanceToCenter;
                        closestSection = section.id;
                    }
                });

                setCurrentSection(closestSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollPosition]);

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


    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
            return;
        }

        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const targetPosition = window.scrollY + rect.top - (viewportHeight - elementHeight) / 2;

        window.scrollTo({
            top: targetPosition,
            behavior: 'auto',
        });

        setPageNavigationExpanded(false);
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

    const handleExit = () => {
        dispatch(logout())
        navigate("/login/")
    }

    return(
        <>
            <div className={styles.headerSpace}></div>
            <div className={`${styles.headerContainer} ${isHeaderVisible ? '' : styles.hidden}`}>
                <div className={`${styles.header}`} style={location.pathname === "/"? {backgroundImage: `url(${indexBubblesBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top'}: {}}>
                    <div className={styles.headerGrid}>
                        <div className={styles.logoMenu}>
                            <a onClick={toggleMenu}>{isMenuOpen? <CloseIcon/> : <BurgerIcon/>}</a>
                            <div className={styles.logoWrapper}>
                                <CenterBeerLogo onClick={() => navigate("/")}/>
                            </div>
                        </div>
                        <div className={styles.menu}>
                            <div className={styles.menuItems}>
                                {paths.map((path) => {
                                    return(
                                        <div className={styles.pathContainer} key={path.path} onMouseEnter={() => {setHoveredPath(path.path)}} onMouseLeave={() => {setHoveredPath(null)}}>
                                            <Link className={`${(currentPage === path.path) || (path.children?.some(child => child.path === currentPage))? styles.active: ''} aa-p1-2`} to={path.path}>{path.title}</Link>
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
                        </div>
                        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
                            {sidePaths.map((path) => (
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
                            {isAuthorized && !profileIsLoading && !isRefreshing &&
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
                            {!isAuthorized && !profileIsLoading && !isRefreshing && <SimpleButton onClick={() => navigate("/login/")} text={"Войти в аккаунт"}></SimpleButton>}
                        </div>
                    </div>
                </div>
                <div className={`${styles.pageNavigation} ${sections? "": styles.onlyProgress}`}>
                    <div className={styles.progressBar}><div className={styles.progress} style={{ width: `${scrollProgress}%` }}></div></div>
                    <div className={`${styles.content} ${pageNavigationExpanded? styles.expanded: ""}`} onClick={() => setPageNavigationExpanded(!pageNavigationExpanded)}>
                        <p className={`${styles.noWrap} ma-p`} onClick={(e) => {e.stopPropagation(); window.scrollTo({top: 0, behavior: "smooth"});}}>В НАЧАЛО ↑</p>
                        <div className={styles.currentBlock}>
                            <p className={`${styles.ellipsis} ma-p`}>{currentSection ? sections?.find(section => section.id === currentSection)?.title: ""}</p>
                            <CaretDownIcon/>
                        </div>
                    </div>
                    <motion.div className={`${styles.pageNavigationTabs} ${pageNavigationExpanded? styles.expanded: ""}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={
                                    pageNavigationExpanded
                                        ? { height: "auto", opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.3, ease: "easeInOut" }}>
                        <div className={styles.pageNavigationTabsContent}>
                            {sections?.map((section, index) => (
                                <div
                                    key={index}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`${currentSection === section.id ? styles.active : ""}`}
                                >
                                    <p>{section.title}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}