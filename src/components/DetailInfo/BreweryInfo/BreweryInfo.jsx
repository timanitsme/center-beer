import styles from "./BreweryInfo.module.scss"
import {TgIcon} from "../../../assets/TgIcon.jsx";
import {VkIcon} from "../../../assets/VkIcon.jsx";
import {MailIcon} from "../../../assets/MailIcon.jsx";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import FavsIcon from "../../../assets/fav-unfill-icon.svg?react"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react"
import {useState} from "react";
import CommentIcon from "../../../assets/comment-icon.svg?react"
import BreweryLogo from "../../../assets/bar-info/brewery-logo.svg?react"
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";
import BeardIcon from "../../../assets/beard-icon.svg?react";



export default function BreweryInfo({breweryInfo={}, sections=[]}){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleScroll = (targetRef) => {
        if (targetRef.current) {
            const elementPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
            return;
        }

        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const targetPosition = window.scrollY + rect.top - (viewportHeight - elementHeight) / 2;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    };

    return(
        <div id="brewery-info">
            <div className={styles.barInfoContainer}>
                <div className={styles.barIcons}>
                    {breweryInfo.logo !== undefined && breweryInfo.logo !== "" ? <img className={styles.logoImg} src={breweryInfo.logo} alt=""></img> :<BreweryLogo/>}
                </div>
                {/*

                */}
                <div className={styles.infoRows}>
                    <div className={styles.infoHeader}>
                        <h2 className="ma-h2">{breweryInfo?.name}</h2>
                        <div>
                            <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                            <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                        </div>
                    </div>
                    <div className={styles.barInfoColumns}>
                        <div className={styles.barDescription}>

                            <p className="ma-p">{breweryInfo?.description}</p>
                            <div className={styles.barButtons}>
                                {sections.map((section, index) =>{
                                    if (section.hasSection){
                                        return <IconButton key={index} onClick={() => handleScroll(section.ref)} text={section.title}>{section.IconComponent}</IconButton>
                                    }
                                })}
                            </div>
                        </div>
                        <div className={`${styles.barInfo} ${styles.regular}`}>
                            <div className={styles.ratingAndComments}>
                                <div className={styles.beerBottles}>
                                    {getRatingIcons(breweryInfo?.rating)}
                                </div>
                                <p>({breweryInfo?.rating?.toFixed(1)})</p>
                                <div className={styles.circle}/>
                                <a className="noWrap"> <CommentIcon/> 116 комментариев</a>
                            </div>
                            <h2>{breweryInfo?.contacts}</h2>
                            <p>{breweryInfo?.country && breweryInfo?.address
                                ? `${breweryInfo.country}, ${breweryInfo.address}`
                                : breweryInfo?.country || breweryInfo?.address || ''}</p>
                            {/*<a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>*/}
                            {breweryInfo["social_media"] &&
                                <div className={styles.socials}>
                                    {breweryInfo["social_media"].tg && <a href={breweryInfo["social_media"].tg}><TgIcon/></a>}
                                    {breweryInfo["social_media"].vk && <a href={breweryInfo["social_media"].vk}><VkIcon/></a>}
                                    {breweryInfo.email && <a href={`mailto:${breweryInfo.email}`}><MailIcon/></a>}
                                </div>
                            }
                            <IconButton text="Оставить отзыв" onClick={() => scrollToSection("reviews")} style=""><BeardIcon/></IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.barInfo} ${styles.mobile}`}>
                <div>
                    <a className={`${styles.aIconButton} ma-p ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</a>
                    <a className={`${styles.aIconButton} ma-p ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</a>
                </div>
                <div className={styles.ratingAndComments}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(breweryInfo?.rating)}
                    </div>
                    <p className="ma-p">({breweryInfo?.rating?.toFixed(1)})</p>
                    <div className={styles.circle}/>
                    <a className="ma-p"> <CommentIcon/> 116 комментариев</a>
                </div>
                <h2 className="ma-h2">{breweryInfo?.contacts}</h2>
                <p className='ma-p'>{breweryInfo?.country && breweryInfo?.address
                    ? `${breweryInfo.country}, ${breweryInfo.address}`
                    : breweryInfo?.country || breweryInfo?.address || ''}</p>
                {/*<a className={styles.aUnderlinedIconButton}><CommentIcon/>Связаться с нами</a>*/}
                <div className={styles.socials}>
                    <TgIcon/>
                    <a href="https://vk.com/center.beer.news"><VkIcon/></a>
                    <a href="mailto:hello@center.beer"><MailIcon/></a>
                </div>
                <div style={{alignSelf: "flex-end"}}><IconButton text="Оставить отзыв" onClick={() => scrollToSection("reviews")} style=""><BeardIcon/></IconButton></div>
            </div>
            <div className={styles.barButtonsMobile}>
                {sections.map((section, index) =>
                    <IconButton key={index} onClick={() => handleScroll(section.ref)} text={section.title}>{section.IconComponent}</IconButton>
                )}
            </div>
        </div>

    )
}