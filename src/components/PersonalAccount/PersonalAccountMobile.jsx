import {useEffect, useState} from "react";
import styles from "./PersonalAccount.module.scss";
import AvatarMock from "../../assets/avatar-default.svg";
import {MdPhotoCamera} from "react-icons/md";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RiCopperCoinFill} from "react-icons/ri";

export default function PersonalAccountMobile({profile, alias = "account", withoutInfo=false}){
    const [selectedPath, setSelectedPath] = useState(alias)
    const navigate = useNavigate()

    const paths = [
        {alias: "account", title: "Главная", path: "/account/", innerPaths: []},
        {alias: "data", title: "Личные данные", path: "/account/info", innerPaths: []},
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
                        <div>
                            <p className={`${styles.bold} ${styles.overflow}`}>{profile?.nickname}</p>
                            <p>{profile?.email}</p>
                            <p><span className={styles.active}>Присоединился:</span> 24.04.2025</p>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "flex-end", gap: "5px"}} className={styles.balance}><p className={styles.active}>На счету</p> <p>150</p> <p className={styles.active}>CB Coin</p> <RiCopperCoinFill color="var(--primary)"/></div>
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