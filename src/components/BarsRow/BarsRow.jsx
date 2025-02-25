import styles from "./BarsRow.module.css"
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react"
import {useState} from "react";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import LightBarCard from "../Cards/BarCard/LightBarCard.jsx";
import Bar1 from "../../assets/barsMocks/bar-1.svg"
import Bar2 from "../../assets/barsMocks/bar-2.svg"
import Bar3 from "../../assets/barsMocks/bar-3.svg"
import Bar4 from "../../assets/barsMocks/bar-4.svg"
import Bar5 from "../../assets/barsMocks/bar-5.svg"
import Bar6 from "../../assets/barsMocks/bar-6.svg"

export default function BarsRow(){
    const [buttonSwitch, setButtonSwitch] = useState(false)
    const comboboxOptions = ["Сначала рядом со мной", "По умолчанию"]
    const cardsBars = [
        {title: "13 RULES (Народный бар)", img: Bar1, expensiveness: 3, address: "г. Москва, Сущевский вал, 41", metro: "Лубянка, Сретенский бульвар", rating: 5, comments: 116, closed: false},
        {title: "13 RULES (Народный бар)", img: Bar2, expensiveness: 2, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, comments: 116, closed: false},
        {title: "13 RULES (Народный бар)", img: Bar3, expensiveness: 1, address: "г. Москва, Сущевский вал, 41", metro: "Проспект Мира, Рижская", rating: 5, comments: 116, closed: true},
        {title: "13 RULES (Народный бар)", img: Bar4, expensiveness: 4, address: "г. Москва, Сущевский вал, 41", metro: "Александровский сад", rating: 5, comments: 116, closed: false},
    ]

    return(
        <div className={styles.barsRowContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerIcon}><BeerTapIcon/></div>
                <div className={styles.headerDescription}>
                    <h3>Где попробовать Czech Pilsner</h3>
                    <div className={styles.headerBottom}>
                        <div className={styles.bottomPart}>
                            <div className={styles.buttonSwitch}>
                                <IconButton text="В магазине" style={buttonSwitch? "secondary": "primary"} onClick={() => setButtonSwitch(!buttonSwitch)}><BeerCaseIcon/></IconButton>
                                <IconButton text="В баре" style={buttonSwitch? "primary": "secondary"} onClick={() => setButtonSwitch(!buttonSwitch)}><BeerTapIcon/></IconButton>
                            </div>
                            <a className={styles.aIconButton}><LocationIcon/>Посмотреть на карте</a>
                        </div>
                        <div className={styles.bottomPart}>
                            <CheckBox text="Можно купить с собой"/>
                            <ComboBox options={comboboxOptions}/>
                        </div>

                    </div>
                </div>
            </div>
            <SimpleCatalogSection CardComponent={LightBarCard} cards={cardsBars} wideColumns={false}></SimpleCatalogSection>
        </div>
    )
}