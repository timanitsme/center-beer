import styles from "./CheckIn.module.scss"
import AvatarDefault from "../../assets/avatar-default.svg";
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import BottleIcon from "../../assets/bottle-icon.svg?react"
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import ImageMock from "../../assets/partners/bar-partner.webp"
import formatDateWithTextMonth from "../../utils/DateFunctions/formatDateWithTextMonth.js";

export default function CheckIn({profile, data}) {
    return(
        <div className={styles.checkIn}>
            <div className={styles.header}>
                <img src={AvatarDefault} alt=""/>
                <div className={styles.headerRows}>
                    <div className={styles.spaceBtw}>
                        <p className={`${styles.pHeader} ma-p`}>Анонимный пользователь</p>
                        <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                            {getRatingIcons(4.2)}
                        </div>
                    </div>
                    <div className={styles.characteristics}>
                        <div>
                            <BottleIcon/>
                            <p className={`ma-p ${styles.active}`}>Бутылка</p>
                        </div>
                        <div className={styles.notMobile}>
                            <LocationIcon/>
                            <p className={`ma-p ${styles.active}`}>Выпил в <a href="" className={styles.primary}>13 Rules (Народный бар)</a></p>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            <p className={`ma-p ${styles.active}`}>{formatDateWithTextMonth(data?.create_date)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.checkInContent}>
                <div className={styles.imageContainer}>
                    <img src={ImageMock}></img>
                </div>
                <div className={styles.checkInComment}>
                    <p className="ma-p">Отличное пиво! Идеально сбалансированный вкус: лёгкая сладость солода и приятная горчинка хмеля. Пена держится долго, а аромат просто восхитительный — свежий, с нотками цитруса. Подходит как для отдыха после работы, так и для дружеских посиделок. Качественный напиток, который хочется заказывать снова и снова!</p>
                </div>
            </div>
            <div className={`${styles.characteristic} ${styles.mobile}`}>
                <LocationIcon/>
                <p className={`ma-p ${styles.active}`}>Выпил в <a href="" className={styles.primary}>13 Rules (Народный бар)</a></p>
            </div>
        </div>
    )
}