import styles from "./PersonalAccount.module.css"
import AvatarMock from "../../assets/avatar-default.svg"
import {MdPhotoCamera} from "react-icons/md";
import {RiCopperCoinFill} from "react-icons/ri";
import {Link} from "react-router-dom";

export default function PersonalAccount({isMobile = false, profile}){
    console.log(JSON.stringify(profile))
    return(
        <div className={`${styles.accountSection}`}>
            <div className={`${styles.sideContent} ${isMobile? styles.mobile: ""}`}>
                {!isMobile &&
                    <>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatar} src={AvatarMock} alt=''></img>
                            <div className={styles.updateAvatar}>
                                <MdPhotoCamera/>
                            </div>
                        </div>
                        <div>
                            <p className={styles.bold}>{profile?.nickname}</p>
                            <p>{profile?.email}</p>
                            <p><span className={styles.active}>Присоединился:</span> 24.04.2025</p>
                            <Link to={"/in-dev"} href="" style={{padding: "15px 0"}}>Личные данные</Link>
                            <div style={{display: "flex", alignItems: "flex-end", gap: "5px"}} className={styles.balance}><p className={styles.active}>На счету</p> <p>150</p> <p className={styles.active}>CB Coin</p> <RiCopperCoinFill color="var(--primary)"/></div>
                        </div>
                    </>
                }
                {isMobile && <div style={{display: "flex", flexDirection: "column", maxWidth: "100px", gap: "5px"}}>
                    <div className={styles.avatarWrapper}>
                        <img className={styles.avatar} src={AvatarMock} alt=''></img>
                        <div className={styles.updateAvatarMobile}>
                            <div className={styles.container}>
                                <MdPhotoCamera/>
                            </div>
                        </div>
                    </div>
                    <p className={`${styles.bold} ${styles.overflow}`}>{profile?.nickname}</p>
                </div>}
                <div>
                    <p className={styles.bold}>Чек-ины</p>
                    <ul className={styles.innerList}>
                        <li><Link to="/in-dev">Пиво <div className="quantity"><p>2</p></div></Link></li>
                        <li><Link to="/in-dev">Заведения <div className="quantity"><p>2</p></div></Link></li>
                    </ul>
                </div>
                <div>
                    <Link to={"/in-dev"} className={`${styles.bold} ${styles.hoverPrimary}`}>Друзья</Link>
                    <ul className={styles.innerList}></ul>
                </div>
                <div>
                    <p className={styles.bold}>Любимое</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Пиво</a></li>
                        <li><a href="">Пивоварни <div className="quantity"><p>12</p></div></a></li>
                        <li><a href="">Заведения <div className="quantity"><p>1</p></div></a></li>
                    </ul>
                </div>
                <div>
                    <p className={styles.bold}>Кладовка</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Пиво</a></li>
                        <li><a href="">Пивоварни <div className="quantity"><p>12</p></div></a></li>
                        <li><a href="">Заведения <div className="quantity"><p>1</p></div></a></li>
                        <li><a href="">Мероприятия <div className="quantity"><p>1</p></div></a></li>
                    </ul>
                </div>
                <div>
                    <p className={styles.bold}>Прочее</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Заработать CB Coin</a></li>
                        <li><a href="">Мои заказы <div className="quantity"><p>64</p></div> </a></li>
                        <li><a href="">Магазин</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}