import styles from "./PersonalAccount.module.scss"
import AvatarMock from "../../assets/avatar-default.svg"
import {RiCopperCoinFill} from "react-icons/ri";
import {Link} from "react-router-dom";
import {useState} from "react";

export default function PersonalAccount({profile}){
    const [isFavoriteExpanded, setIsFavoriteExpanded] = useState(false);

    return(
        <div className={`${styles.accountSection}`}>
            <div className={styles.sideContent}>
                <div className={styles.avatarWrapper}>
                    <img className={styles.avatar} src={AvatarMock} alt=''></img>
                </div>
                <div>
                    <p className={styles.bold}>{profile?.nickname}</p>
                    <p>{profile?.email}</p>
                    <p><span className={styles.active}>Присоединился:</span> 24.04.2025</p>
                    <Link to={"/account/info/"} href="" style={{padding: "15px 0"}}>Личные данные</Link>
                    <div style={{display: "flex", alignItems: "flex-end", gap: "5px"}} className={styles.balance}><p className={styles.active}>На счету</p> <p>150</p> <p className={styles.active}>CB Coin</p> <RiCopperCoinFill color="var(--primary)"/></div>
                </div>
                <div>
                    <p className={styles.bold}>Чек-ины</p>
                    <ul className={styles.innerList}>
                        <li><Link to="/my-check-ins/beer">Пиво <div className="quantity"><p>2</p></div></Link></li>
                        <li><Link to="/my-check-ins/bar">Заведения <div className="quantity"><p>2</p></div></Link></li>
                    </ul>
                </div>
                <div>
                    <Link to={"/in-dev"} className={`${styles.bold} ${styles.hoverPrimary}`}>Друзья</Link>
                    <ul className={styles.innerList}></ul>
                </div>
                <div>
                    <p className={styles.bold}>Любимое</p>
                    <ul className={styles.innerList}>
                        <li><Link to="/account/fav/beer">Пиво</Link></li>
                        <li><Link to="/account/fav/brewery">Пивоварни <div className="quantity"><p>12</p></div></Link></li>
                        <li><Link to="/account/fav/bar">Заведения <div className="quantity"><p>1</p></div></Link></li>
                    </ul>
                </div>
                <div>
                    <p className={styles.bold}>Кладовка</p>
                    <ul className={styles.innerList}>
                        <li><Link to="/account/bookmarked/beer">Пиво</Link></li>
                        <li><Link to="/account/bookmarked/brewery">Пивоварни <div className="quantity"><p>12</p></div></Link></li>
                        <li><Link to="/account/bookmarked/bar">Заведения <div className="quantity"><p>1</p></div></Link></li>
                        <li><Link to="/account/bookmarked/event">Мероприятия <div className="quantity"><p>1</p></div></Link></li>
                    </ul>
                </div>
                <div>
                    <p className={styles.bold}>Прочее</p>
                    <ul className={styles.innerList}>
                        <li><Link to="/account/earn-cb">Заработать CB Coin</Link></li>
                        <li><Link to="/in-dev">Мои заказы <div className="quantity"><p>64</p></div> </Link></li>
                        <li><Link to="/in-dev">Магазин</Link></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}