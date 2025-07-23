import styles from "./EventMapSidebar.module.scss"
import {useRef, useState} from "react";
import {FaChevronRight} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import FestBeerCard from "../../Cards/BottledBeerCard/FestBeerCard.jsx";
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react"
import LocationIcon from "../../../assets/location-filled-icon.svg?react"
import SearchInput from "../../ApiInputs/Search/SearchInput.jsx";

export default function EventMapSidebar({selectedMarker, setSelectedMarker, breweries, setLightMarker, isMobile=false}){
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

    const goToBreweryPage = (breweryAlias) => {
        navigate(`/brewery/${breweryAlias}`, {
            state: { from: location.pathname }
        });
    };
    return(
        <div className={`${styles.sidebar} ${selectedMarker? styles.expanded: ''} ${isMobile? styles.mobile: ""}`}>
            {selectedMarker && selectedMarker !==-1 &&
                <div className={styles.sidebarContent}>
                    <div className={styles.buttonsRow}>
                        <button className={styles.closeButton} onClick={() => setSelectedMarker(null)}>
                            <ArrowLeftIcon/>
                        </button>
                    </div>
                    <div className={styles.brewery} onClick={() => goToBreweryPage(brewery?.brewery_alias)}>
                        <div className={styles.imgContainer}>
                            <img src={brewery?.brewery_logo} alt=""/>
                        </div>
                        <div className={styles.description}>
                            <h6 className={styles.title} dangerouslySetInnerHTML={{__html: brewery.brewery_name}}></h6>
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
            {selectedMarker && selectedMarker ===-1 &&
                <div className={styles.sidebarContent}>
                    <div className={styles.buttonsRow}>
                        <button className={styles.closeButton} onClick={() => setSelectedMarker(null)}>
                            <ArrowLeftIcon/>
                        </button>
                    </div>
                    <div style={{height: "20px"}}></div>
                    <SearchInput title="Поиск пивоварни" onChange={() => {}}></SearchInput>
                    {Object.keys(breweries).map((brewIndex) => {
                        return(
                            <div key={brewIndex} className={styles.brewery} onClick={() => goToBreweryPage(breweries[brewIndex]?.brewery_alias)}>
                                <div className={styles.imgContainer}>
                                    <img src={breweries[brewIndex]?.brewery_logo} alt=""/>
                                </div>
                                <div className={styles.description}>
                                    <p className={styles.title} dangerouslySetInnerHTML={{__html: breweries[brewIndex].brewery_name}}></p>
                                </div>
                                <div className={styles.toBrew}>
                                    <div className={styles.locButton} onClick={(e) => {e.stopPropagation(); setSelectedMarker(null); setLightMarker(brewIndex);}}>
                                        <LocationIcon/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}