import styles from "./PersonalAccountAlt.module.scss"
import AvatarMock from "../../../assets/avatar-default.svg"
import {RiCopperCoinFill} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import BeerIcon from "../../../assets/lucide/beer-lucide-icon.svg?react"
import CaretRightIcon from "../../../assets/lucide/caret-right-icon.svg?react"
import SettingsIcon from "../../../assets/lucide/settings-icon.svg?react"
import CoinsIcon from "../../../assets/lucide/coins-icon.svg?react"
import UsersIcon from "../../../assets/lucide/users-lucide-icon.svg?react"
import ShoppingBagIcon from "../../../assets/lucide/shopping-bag-icon.svg?react"
import HeartIcon from "../../../assets/lucide/heart-icon.svg?react"
import ArchiveIcon from "../../../assets/lucide/archive-icon.svg?react"

export default function PersonalAccountAlt({profile, dashboard}){
    const [expandedTabs, setExpandedTabs] = useState([])


    const navigationData = [
        {
            id: 1,
            title: "Чек-ины",
            icon: BeerIcon,
            children: [
                { label: "Пиво", to: "/my-check-ins/beer", alias: dashboard?.checkins?.unique_beers},
                { label: "Заведения", to: "/my-check-ins/bar", alias: dashboard?.checkins?.unique_bars},
            ],
        },
        {
            id: 2,
            title: "Друзья",
            icon: UsersIcon,
            to: "/in-dev",
        },
        {
            id: 3,
            title: "Любимое",
            icon: HeartIcon,
            children: [
                { label: "Пиво", to: "/account/fav/beer", alias: dashboard?.favorites?.beer },
                { label: "Пивоварни", to: "/account/fav/brewery", alias: dashboard?.favorites?.brewery},
                { label: "Заведения", to: "/account/fav/bar", alias: dashboard?.favorites?.bar},
            ],
        },
        {
            id: 4,
            title: "Кладовка",
            icon: ArchiveIcon,
            children: [
                { label: "Пиво", to: "/account/bookmarked/beer", alias: dashboard?.cuddy?.beer },
                { label: "Пивоварни", to: "/account/bookmarked/brewery", alias: dashboard?.cuddy?.brewery },
                { label: "Заведения", to: "/account/bookmarked/bar", alias: dashboard?.cuddy?.bar},
                { label: "Мероприятия", to: "/account/bookmarked/event", alias: dashboard?.cuddy?.events},
            ],
        },
        {
            id: 5,
            title: "Прочее",
            icon: ShoppingBagIcon,
            children: [
                { label: "Заработать CB Coin", to: "/account/earn-cb" },
                { label: "Мои заказы", to: "/in-dev", quantity: 64 },
                { label: "Магазин", to: "/in-dev" },
            ],
        },
    ];

    const navigate = useNavigate()
    return(
        <div className={`${styles.accountSection} ${styles.pc}`}>
            <div className={styles.sideContent}>
                <div className={styles.primaryBlock}>
                    <div className={styles.avatarWrapper}>
                        <img className={styles.avatar} src={AvatarMock} alt=''></img>
                    </div>
                    <div>
                        <p className={`${styles.bold} ${styles.centered}`}>{profile?.nickname}</p>
                        <p className={styles.centered}>{profile?.email}</p>
                        {/*<p className={`${styles.centered} aa-p3`} style={{marginTop: "10px"}}>С нами с 24.04.2025</p>*/}
                        <Link to={"/account/info/"} href="" style={{padding: "15px 0"}} className={styles.settings}><SettingsIcon/><p>Личные данные</p></Link>
                        <div className={styles.balanceBlock}>
                            <CoinsIcon/>
                            <p >CB Coin</p>
                            <p className={`${styles.coins}`}>150</p>
                        </div>
                    </div>
                </div>
                <div className={styles.metrics}>
                    <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.total || "0"}</p><p className="aa-p2">Чек-инов</p></div>
                    <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.unique_beers || "0"}</p><p className="aa-p2">Сортов пива</p></div>
                    <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.unique_bars || "0"}</p><p className="aa-p2">Заведений</p></div>
                    <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.friends || "0"}</p><p className="aa-p2">Друзей</p></div>
                </div>


                {navigationData.map((nav, index) =>{
                    return(
                        <div key={index} className={`${styles.navigationBlock} ${expandedTabs.includes(nav.id)? styles.expanded: ""}`}>
                            <div className={`${styles.navigationSection}`} onClick={
                                () => {
                                    return(
                                        nav.children?
                                        setExpandedTabs((prev) =>
                                            prev.includes(nav.id)
                                                ? prev.filter((tabId) => tabId !== nav.id)
                                                : [...prev, nav.id]
                                        ):
                                        navigate(nav.to)
                                    )
                                }
                            }><nav.icon/><p className={styles.bold}>{nav.title}</p> {nav.children && <CaretRightIcon className={styles.arrowRight}/>}</div>
                            {nav.children && <div className={`${styles.navigationSectionContent} `}>
                                {nav.children.map((child, index) =>
                                    <Link key={index} to={child.to}>{child.label} {child.alias !== undefined && child.alias !== 0 && <div className={styles.quantity}><p>{child.alias}</p></div>}</Link>
                                )}
                            </div>}
                        </div>
                    )
                    }
                )}
            </div>
        </div>
    )
}