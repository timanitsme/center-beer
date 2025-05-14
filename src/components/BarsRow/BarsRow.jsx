import styles from "./BarsRow.module.css"
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react"
import {useState} from "react";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {Link} from "react-router-dom";
import MarketBar1 from "../../../src/assets/marketBarRowMocks/market-bar-1.png"
import MarketBar2 from "../../../src/assets/marketBarRowMocks/market-bar-2.png"
import MarketBar3 from "../../../src/assets/marketBarRowMocks/market-bar-3.png"
import MarketBar4 from "../../../src/assets/marketBarRowMocks/market-bar-4.png"

export default function BarsRow({title, beerTitle, barCards, marketCards, CardComponent}){
    const [buttonSwitch, setButtonSwitch] = useState('market')
    const comboboxOptions = ["Сначала рядом со мной", "По умолчанию"]
    const [currentCards, setCurrentCards] = useState(marketCards)
    const placeholders = [MarketBar1, MarketBar2, MarketBar3, MarketBar4]
    return(
        <div className={styles.barsRowContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerIcon}><BeerTapIcon/></div>
                <div className={styles.headerDescription}>
                    <h3>{title}</h3>
                    <div className={styles.headerBottom}>
                        <div className={styles.bottomPart}>
                            <div className={styles.buttonSwitch}>
                                <IconButton text="В магазине" style={buttonSwitch !== 'market'? "secondary": "primary"} onClick={() => {setButtonSwitch('market'); setCurrentCards(marketCards)}}><BeerCaseIcon/></IconButton>
                                <IconButton text="В баре" style={buttonSwitch === 'bar' ? "primary": "secondary"} onClick={() => {setButtonSwitch('bar'); setCurrentCards(barCards)}}><BeerTapIcon/></IconButton>
                            </div>
                            <Link to={"/map"} className={styles.aIconButton}><LocationIcon/>Посмотреть на карте</Link>
                        </div>
                        <div className={styles.bottomPart}>
                            <CheckBox text="Можно купить с собой"/>
                            <ComboBox options={comboboxOptions}/>
                        </div>

                    </div>
                </div>
            </div>
            {currentCards?.length === 0 &&
                <div className={styles.placeholdersRow}>
                    {placeholders.map((placeholder, index) => {
                        return <div key={index} className={styles.imageWrapper}><img src={placeholder}></img></div>

                    })}
                </div>
            }
            <SimpleCatalogSection CardComponent={CardComponent} cards={currentCards} wideColumns={false} title={beerTitle}></SimpleCatalogSection>
        </div>
    )
}