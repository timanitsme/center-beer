import styles from "./CheckIn.module.scss"
import AvatarDefault from "../../assets/avatar-default.svg";
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import BottleIcon from "../../assets/bottle-icon.svg?react"
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import ImageMock from "../../assets/partners/bar-partner.webp"
import formatDateWithTextMonth from "../../utils/DateFunctions/formatDateWithTextMonth.js";
import {Link} from "react-router-dom"

export default function CheckIn({profile, data, onShowPicture}) {
    if (!data) return null;
    return(
        <div className={styles.checkIn}>
            <div className={styles.header}>
                <img src={data?.user_photo} className={styles.avatar} alt=""/>
                <div className={styles.headerRows}>
                    <div className={styles.spaceBtw}>
                        <p className={`${styles.pHeader} ma-p`}>{data?.username}</p>
                        <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                            {getRatingIcons(data?.rating)}
                        </div>
                    </div>
                    <div className={styles.characteristics}>
                        <div>
                            <BottleIcon/>
                            <p className={`ma-p ${styles.active}`}>Бутылка</p>
                        </div>
                        <div className={styles.notMobile}>
                            <LocationIcon/>
                            <p className={`ma-p ${styles.active}`}>Выпил в <Link to={`/bar/${data?.bar_alias}`} className={styles.primary}>{data?.bar_name || ""}</Link></p>
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            <p className={`ma-p ${styles.active}`}>{formatDateWithTextMonth(data?.created_at)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.checkInContent}>
                {data?.media?.length > 0 &&
                    <div className={styles.imageContainer} onClick={() => onShowPicture(data?.media[0])}>
                        <img src={data?.media[0]}></img>
                    </div>
                }
                <div className={styles.checkInComment}>
                    <p className="ma-p">{data?.comment}</p>
                </div>
            </div>
            <div className={`${styles.characteristic} ${styles.mobile}`}>
                <LocationIcon/>
                <p className={`ma-p ${styles.active}`}>Выпил в <a href="" className={styles.primary}>13 Rules (Народный бар)</a></p>
            </div>
        </div>
    )
}