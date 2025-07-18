import styles from "./BarInfo.module.scss"
import BarLogo from "../../../assets/bar-info/bar-logo.svg?react"
import {TgIcon} from "../../../assets/TgIcon.jsx";
import {VkIcon} from "../../../assets/VkIcon.jsx";
import {MailIcon} from "../../../assets/MailIcon.jsx";
import FlagsIcon from "../../../assets/flags-icon.svg?react"
import BeerMugsIcon from "../../../assets/beer-mugs-icon.svg?react"
import PhoneIcon from "../../../assets/phone-icon.svg?react"
import SausageIcon from "../../../assets/sausage-icon.svg?react"
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react"
import TaxiIcon from "../../../assets/taxi-icon.svg?react"
import LocationIcon from "../../../assets/location-icon.svg?react"
import {useState} from "react";
import CommentIcon from "../../../assets/comment-icon.svg?react"
import CalendarIcon from "../../../assets/calendar-icon.svg?react"
import BeerBottleIcon from "../../../assets/bottle-icon.svg?react"
import HalfBeerBottleIcon from "../../../assets/bottle-half-icon.svg?react"
import EmptyBeerBottleIcon from "../../../assets/bottle-empty-icon.svg?react"
import WorktimeModal from "../../Modals/WorktimeModal/WorktimeModal.jsx";
import {useNavigate} from "react-router-dom";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";
import {useLazyAddBarToCuddyQuery, useLazyAddBarToFavQuery} from "../../../store/services/centerBeer.js";



export default function BarInfo({barInfo={}, sections = []}){
    const [showModal, setShowModal] = useState(false)
    const [isFavourite, setIsFavourite] = useState(barInfo.is_favor || false);
    const [isBookmarked, setIsBookmarked] = useState(barInfo.is_liked || false);
    const rating = 4.8
    const navigate = useNavigate()
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBarToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBarToFavQuery();


    const handleAddToCuddy = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToCuddy(id).unwrap();
            setIsBookmarked(!isBookmarked)
        } catch (err) {
            console.log(`add to cuddy error: ${err}`)
        }
    }

    const handleAddToFav = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToFav(id).unwrap();
            setIsFavourite(!isFavourite)
        } catch (err) {
            console.log(`add to fav error: ${err}`)
        }
    }

    const handleScroll = (targetRef) => {
        if (targetRef.current) {
            const elementPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };




    const today = new Date()
    const dayOfWeek = today.getDay()
    const getDayOfWeek = () =>  dayOfWeek === 0? 6: dayOfWeek-1
    const intervals = barInfo?.work_time_list[getDayOfWeek()]?.interval?.split(" - ")
    return(
        <div>
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    {barInfo.logo !== undefined && barInfo.logo !== "" ? <img className={styles.logoImg} src={barInfo.logo} alt=""></img> :<BarLogo/>}
                    <div className={styles.socials}>
                        {barInfo["social_media"].tg && <a href={barInfo["social_media"].tg}><TgIcon/></a>}
                        {barInfo["social_media"].vk && <a href={barInfo["social_media"].vk}><VkIcon/></a>}
                        <a href={`mailto:${barInfo.email}`}><MailIcon/></a>
                    </div>
                </div>
                <div style={{width: "100%"}}>
                    <div className={styles.infoHeader}>
                        <div className={styles.descriptionRow}>
                            <h2 className="ma-h2">{barInfo.name} </h2>
                            <div className={styles.openedSection}>
                                <div className={`${styles.bigCircle} ${barInfo?.work_time_list[getDayOfWeek()]?.active? styles.green : styles.red}`}/>
                                <p className="ma-p">{barInfo?.work_time_list[getDayOfWeek()]?.active? `открыт до ${intervals?.[1]}`:`закрыт до ${intervals?.[0]}`}</p>
                            </div>
                        </div>
                        <div className={styles.infoButtons}>
                            <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''} noWrap`} onClick={(e) => handleAddToFav(e, barInfo?.id)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                            <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''} noWrap`} onClick={(e) => handleAddToCuddy(e, barInfo?.id)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                        </div>
                    </div>
                    <div className={styles.barInfoColumns}>
                        <div className={styles.barDescription}>
                            <p className="ma-p">{barInfo.description}</p>
                            <div className={styles.barButtons}>
                                {sections.map((section, index) =>
                                    <IconButton key={index} onClick={() => handleScroll(section.ref)} text={section.title}>{section.IconComponent}</IconButton>
                                )}
                                <SimpleButton onClick={() => navigate("/in-dev")} text={"забронировать стол"}/>
                            </div>
                        </div>
                        <div className={`${styles.barInfo} ${styles.regular}`}>
                            <div className={styles.ratingAndComments}>
                                <div className={styles.beerBottles}>
                                    {getRatingIcons(rating)}
                                </div>
                                <p>({rating})</p>
                                <div className={styles.circle}/>
                                <a className="ma-p"> <CommentIcon/> 116 комментариев</a>
                            </div>
                            <h2>{barInfo.contacts}</h2>
                            <p>{barInfo.address}</p>
                            <a className={styles.aUnderlinedIconButton} href="https://center.beer/about-us/contact/"><CommentIcon/>Связаться с нами</a>
                            <a className={styles.aUnderlinedIconButton} onClick={() => setShowModal(true)}><CalendarIcon/>График работы</a>
                            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-end"}}>
                                <IconButton text="Найти на карте" onClick={() => navigate("/map")} style="secondary"><LocationIcon/></IconButton>
                                <IconButton text="Заказать такси" onClick={() => window.location.href = `https://3.redirect.appmetrica.yandex.com/route?end-lat=${barInfo?.lon}&end-lon=${barInfo?.lat}&ref=centerbeer&appmetrica_tracking_id=25395763362139037`} style="secondary"><TaxiIcon/></IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.barInfo} ${styles.mobile}`}>
                <div>
                    <a className={`${styles.aIconButton} ma-p ${isFavourite ? styles.added : ''}`} onClick={(e) => handleAddToFav(e, barInfo?.id)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                    <a className={`${styles.aIconButton} ma-p ${isBookmarked ? styles.added : ''}`} onClick={(e) => handleAddToCuddy(e, barInfo?.id)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                </div>
                <div className={styles.ratingAndComments}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(rating)}
                    </div>
                    <p className="ma-p">({rating})</p>
                    <div className={styles.circle}/>
                    <a className="ma-p"> <CommentIcon/> 116 комментариев</a>
                </div>
                <h2 className="ma-h2">{barInfo.contacts}</h2>
                <p className="ma-p">{barInfo.address}</p>
                <a className={`${styles.aUnderlinedIconButton} ma-p`} href="https://center.beer/contacts/"><CommentIcon/>Связаться с нами</a>
                <a className={`${styles.aUnderlinedIconButton} ma-p`} onClick={() => setShowModal(true)}><CalendarIcon/>График работы</a>
                <div>
                    <IconButton text="Найти на карте" onClick={() => navigate("/map")} style="secondary"><LocationIcon/></IconButton>
                    <IconButton text="Заказать такси" onClick={() => window.location.href = `https://3.redirect.appmetrica.yandex.com/route?end-lat=${barInfo?.lon}&end-lon=${barInfo?.lat}&ref=centerbeer&appmetrica_tracking_id=25395763362139037`} style="secondary"><TaxiIcon/></IconButton>
                </div>
                <div className={styles.socials}>
                    {barInfo["social_media"].tg && <a href={barInfo["social_media"].tg}><TgIcon/></a>}
                    {barInfo["social_media"].vk && <a href={barInfo["social_media"].vk}><VkIcon/></a>}
                    <a href={`mailto:${barInfo.email}`}><MailIcon/></a>
                </div>
            </div>
            <div className={styles.barButtonsMobile}>
                {sections.map((section, index) =>
                    <IconButton key={index} onClick={() => handleScroll(section.ref)} text={section.title}>{section.IconComponent}</IconButton>
                )}
                <SimpleButton onClick={() => navigate("/in-dev")} text={"забронировать стол"}/>
            </div>
            <WorktimeModal setShow={setShowModal} show={showModal} workTimeList={barInfo["work_time_list"]}/>
        </div>

    )
}