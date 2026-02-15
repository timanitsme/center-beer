import styles from "./PersonalAccountMobileAlt.module.scss"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AvatarMock from "../../../assets/avatar-default.svg";
import {RiCopperCoinFill} from "react-icons/ri";
import SettingsIcon from "../../../assets/lucide/settings-icon.svg?react";
import CoinsIcon from "../../../assets/lucide/coins-icon.svg?react";

export default function PersonalAccountMobileAlt({profile, dashboard, alias = "account", withoutInfo=false}){
    const [selectedPath, setSelectedPath] = useState(alias)
    const navigate = useNavigate()

    const paths = [
        {alias: "account", title: "Главная", path: "/account/", innerPaths: []},
        {alias: "checkIns", title: "Чек-ины", path: "/in-dev/", innerPaths: [
                {title: "Пиво", path: "/my-check-ins/beer"},
                {title: "Заведения", path: "/my-check-ins/bar"},
            ]},
        {alias: "friends", title: "Друзья", path: "/in-dev/", innerPaths: []},
        {alias: "favorite", title: "Любимое", path: "/in-dev/", innerPaths: [
                {title: "Пиво", path: "/account/fav/beer"},
                {title: "Пивоварни", path: "/account/fav/brewery"},
                {title: "Заведения", path: "/account/fav/bar"},
            ]},
        {alias: "bookmarks", title: "Кладовка", path: "/in-dev/", innerPaths: [
                {title: "Пиво", path: "/account/bookmarked/beer"},
                {title: "Пивоварни", path: "/account/bookmarked/brewery"},
                {title: "Заведения", path: "/account/bookmarked/bar"},
                {title: "Мероприятия", path: "/account/bookmarked/event"},

            ]},
        {alias: "other", title: "Прочее", path: "/in-dev/", innerPaths: [
                {title: "Заработать CB Coin", path: "/account/earn-cb"},
                {title: "Мои заказы", path: "/in-dev"},
                {title: "Магазины", path: "/in-dev"}
            ]},
    ];

    const [currentInnerPaths, setCurrentInnerPaths] = useState(paths.find(a => a.alias === alias)?.innerPaths || [])

    const handleOuterPathClick = (path) => {
        if (path.innerPaths.length === 0){
            setCurrentInnerPaths([])
            path.alias === alias? setSelectedPath(path.alias): navigate(path.path)
        }
        else{
            setSelectedPath(path.alias)
            setCurrentInnerPaths(path.innerPaths)
        }
    }


    return(
        <div className={`${styles.accountSection}`}>
            {!withoutInfo &&
                <div className={`${styles.sideContent} ${styles.mobile}`}>
                    <div className={styles.profile}>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatar} src={AvatarMock} alt=''></img>
                        </div>
                        <div style={{width: "100%"}}>
                            <p className={`${styles.bold} ${styles.overflow} ${styles.centered}`}>{profile?.nickname}</p>
                            <p className={styles.centered}>{profile?.email}</p>
                            {/*<p className={styles.centered}><span>С нами с:</span> 24.04.2025</p>*/}
                            <Link to={"/account/info/"} href="" style={{padding: "15px 0"}} className={styles.settings}><SettingsIcon/><p>Личные данные</p></Link>
                            <div className={styles.balanceBlock}>
                                <CoinsIcon/>
                                <p >CB Coin</p>
                                <p className={`${styles.coins}`}>150</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.metrics}>
                        <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.total || "0"}</p><p className="ma-p">Чек-инов</p></div>
                        <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.unique_beers || "0"}</p><p className="ma-p">Сортов пива</p></div>
                        <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.unique_bars || "0"}</p><p className="ma-p">Заведений</p></div>
                        <div className={styles.metric}><p className={styles.primary}>{dashboard?.checkins?.friends || "0"}</p><p className="ma-p">Друзей</p></div>
                    </div>
                </div>
            }
            <div className={`${styles.tagsContainer}`}>
                {paths.map((path, index) =>
                    <div key={index} className={`${styles.tag} ${path.alias === selectedPath? styles.primary: ""}`} onClick={() => handleOuterPathClick(path)}><p className="noSelect">{path.title}</p></div>
                )}
            </div>
            {currentInnerPaths.length !== 0 &&
                <div className={`${styles.tagsContainer} ${styles.outer}`}>
                    {currentInnerPaths.map((path, index) =>
                        <div key={index} className={`${styles.tag} ${path.alias === selectedPath? styles.primary: ""}`} onClick={() => navigate(path.path)}><p className="noSelect">{path.title}</p></div>
                    )}
                </div>
            }
        </div>
    )
}