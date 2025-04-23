import styles from "./PersonalAccount.module.css"
import AvatarMock from "../../assets/avatar-mock.svg"
import {MdPhotoCamera} from "react-icons/md";

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
                        <p className={styles.bold}>Вячеслав Крыжовников</p>
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
                    <p className={styles.bold}>Покупки</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Активные заказы <div className="quantity"><p>2</p></div></a></li>
                        <li><a href="">Архив заказов</a></li>
                        <li><a href="">Настройки покупок</a></li>
                    </ul>
                </div>

                <div>
                    <p className={styles.bold}>Профиль</p>
                    <ul className={styles.innerList}>
                        <li><a href="">Личные данные</a></li>
                        <li><a href="">Мои адреса</a></li>
                        <li><a href="">Мои отзывы</a></li>
                        <li><a href="">Избранное <div className="quantity"><p>64</p></div> </a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}