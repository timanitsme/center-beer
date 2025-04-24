import styles from "./PersonalAccount.module.css"
import AvatarMock from "../../assets/avatar-mock.svg"
import {MdPhotoCamera} from "react-icons/md";
import {RiCopperCoinFill} from "react-icons/ri";

export default function PersonalAccount({isMobile = false}){


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
                            <p className={styles.bold}>Вячеслав Крыжовников</p>
                            <p>example@gmail.com</p>
                            <p><span className={styles.active}>Присоединился:</span> 24.04.2025</p>
                            <div style={{display: "flex", alignItems: "flex-end", gap: "5px"}}><p className={styles.active}>Баланс:</p> <p>150</p> <RiCopperCoinFill color="var(--primary"/></div>
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
                    <p className={`${styles.bold} ${styles.overflow}`}>Вячеслав Крыжовников</p>
                </div>}
                <div>
                    <p className={styles.bold}>Чек-ины</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Пиво <div className="quantity"><p>2</p></div></a></li>
                        <li><a href="">Заведения <div className="quantity"><p>2</p></div></a></li>
                    </ul>
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
                    <p className={styles.bold}>Профиль</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Личные данные</a></li>
                        <li><a href="">Мои отзывы</a></li>
                        <li><a href="">Мои заказы <div className="quantity"><p>64</p></div> </a></li>
                    </ul>
                </div>
                <div>
                    <p className={styles.bold}>Прочее</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Личные данные</a></li>
                        <li><a href="">Мои адреса</a></li>
                        <li><a href="">Мои отзывы</a></li>
                        <li><a href="">Мои заказы <div className="quantity"><p>64</p></div> </a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}