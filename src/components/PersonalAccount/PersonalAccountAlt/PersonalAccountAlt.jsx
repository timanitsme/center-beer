import styles from "./PersonalAccountAlt.module.scss"
import AvatarMock from "../../../assets/avatar-default.svg"
import {RiCopperCoinFill} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import BeerIcon from "../../../assets/lucide/beer-lucide-icon.svg?react"
import CaretRightIcon from "../../../assets/lucide/caret-right-icon.svg?react"
import SettingsIcon from "../../../assets/lucide/settings-icon.svg?react"
import CoinsIcon from "../../../assets/lucide/coins-icon.svg?react"

export default function PersonalAccountAlt({profile}){
    const [expandedTabs, setExpandedTabs] = useState([])

    const navigationData = [
        {
            id: 1,
            title: "Чек-ины",
            icon: BeerIcon,
            children: [
                { label: "Пиво", to: "/my-check-ins/beer", quantity: 2 },
                { label: "Заведения", to: "/my-check-ins/bar", quantity: 2 },
            ],
        },
        {
            id: 2,
            title: "Друзья",
            icon: BeerIcon,
            to: "/in-dev",
        },
        {
            id: 3,
            title: "Любимое",
            icon: BeerIcon,
            children: [
                { label: "Пиво", to: "/account/fav/beer" },
                { label: "Пивоварни", to: "/account/fav/brewery", quantity: 12 },
                { label: "Заведения", to: "/account/fav/bar", quantity: 1 },
            ],
        },
        {
            id: 4,
            title: "Кладовка",
            icon: BeerIcon,
            children: [
                { label: "Пиво", to: "/account/bookmarked/beer" },
                { label: "Пивоварни", to: "/account/bookmarked/brewery", quantity: 12 },
                { label: "Заведения", to: "/account/bookmarked/bar", quantity: 1 },
                { label: "Мероприятия", to: "/account/bookmarked/event", quantity: 1 },
            ],
        },
        {
            id: 5,
            title: "Прочее",
            icon: BeerIcon,
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
                        <p className={`${styles.centered} aa-p3`} style={{marginTop: "10px"}}>С нами с 24.04.2025</p>
                        <Link to={"/account/info/"} href="" style={{padding: "15px 0"}} className={styles.settings}><SettingsIcon/><p>Личные данные</p></Link>
                        <div className={styles.balanceBlock}>
                            <CoinsIcon/>
                            <p >CB Coin</p>
                            <p className={`${styles.coins}`}>150</p>
                        </div>
                    </div>
                </div>

                <div className={styles.metrics}>
                    <div className={styles.metric}><p className={styles.primary}>342</p><p className="aa-p2">Чек-инов</p></div>
                    <div className={styles.metric}><p className={styles.primary}>178</p><p className="aa-p2">Сортов пива</p></div>
                    <div className={styles.metric}><p className={styles.primary}>6</p><p className="aa-p2">Заведений</p></div>
                    <div className={styles.metric}><p className={styles.primary}>89</p><p className="aa-p2">Друзей</p></div>
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
                                    <Link key={index} to={child.to}>{child.label} {child.quantity && <div className={styles.quantity}><p>{child.quantity}</p></div>}</Link>
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