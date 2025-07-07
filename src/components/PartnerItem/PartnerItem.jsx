import {useNavigate} from "react-router-dom";
import styles from "./PartnerItem.module.scss";
import PlayButtonIcon from "../../assets/play-button-icon.svg?react"
import SingleVideoModal from "../Modals/SingleVideoModal/SingleVideoModal.jsx";
import {useState} from "react";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import SimpleVideoCard from "../Cards/SimpleVideoCard/SimpleVideoCard.jsx";

export default function PartnerItem({items, mainImage, title, video, sideVideos}){
    const navigate = useNavigate()
    const [showVideo, setShowVideo] = useState(false)
    const [src, setSrc] = useState(video)


    return(
        <>
            <div className={styles.itemContainer}>
                <h2 className="ma-h2-small">{title}</h2>
                <div className={styles.videoContainer} onClick={() => setShowVideo(true)}>
                    <PlayButtonIcon/>
                    <img src={mainImage} className={styles.mainImage} alt=""></img>
                </div>
                <div className={styles.iconRow}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.iconItem}>
                            <div className={styles.iconBox}><item.Icon/></div>
                            <p className={`${styles.iconText} ma-p1`}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.showMobile}>
                <SimpleCatalogSection CardComponent={SimpleVideoCard} cards={sideVideos} ></SimpleCatalogSection>
            </div>
            <SingleVideoModal show={showVideo} setShow={setShowVideo} src={src} setSrc={setSrc} />
        </>
    )
}