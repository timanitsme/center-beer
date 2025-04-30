import styles from "./EventMapSidebar.module.css"
import {useRef, useState} from "react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import BreweryCard from "../../Cards/BreweryCard/BreweryCard.jsx";
import {FaChevronRight} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import BottledBeerCard from "../../Cards/BottledBeerCard/BottledBeerCard.jsx";
import FestBeerCard from "../../Cards/BottledBeerCard/FestBeerCard.jsx";

export default function EventMapSidebar({selectedMarker, setSelectedMarker, breweries, isMobile=false}){
    const brewery = breweries[selectedMarker]
    const navigate = useNavigate()

    const containerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleWheel = (e) => {
        if (!containerRef.current || isScrolling) return;

        const scrollAmount = e.deltaY * 2;
        setIsScrolling(true);
        requestAnimationFrame(() => {
            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
            setTimeout(() => setIsScrolling(false), 100);
        });
    };

    return(
        <div className={`${styles.sidebar} ${selectedMarker? styles.expanded: ''} ${isMobile? styles.mobile: ""}`}>
            {selectedMarker &&
                <div className={styles.sidebarContent}>
                    <div className={styles.buttonsRow}>
                        <button className={styles.closeButton} onClick={() => setSelectedMarker(null)}>
                            <CloseIcon/>
                        </button>
                    </div>
                    <div className={styles.brewery} onClick={() => navigate(`/brewery/${brewery?.brewery_alias}`)}>
                        <div className={styles.imgContainer}>
                            <img src={brewery?.brewery_logo} alt=""/>
                        </div>
                        <div className={styles.description}>
                            <p className={styles.title} dangerouslySetInnerHTML={{__html: brewery.brewery_name}}></p>
                        </div>
                        <div className={styles.toBrew}>
                            <FaChevronRight/>
                        </div>
                    </div>
                    <div className={styles.desc} dangerouslySetInnerHTML={{__html: brewery?.brewery_description}}></div>
                    <div className={styles.beerCardsRow} ref={containerRef} onWheel={handleWheel}>
                        {Object.values(brewery.taps).map((tap) => {
                            if (tap.beer_id !== null){
                                return <FestBeerCard key={tap.beer_id} cardInfo={tap} />
                            }
                        })}
                    </div>
                </div>
            }
        </div>
    )
}