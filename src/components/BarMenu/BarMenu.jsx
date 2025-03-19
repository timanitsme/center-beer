import styles from "./BarMenu.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import CatalogSection from "../CatalogSections/CatalogSection/CatalogSection.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import PropTypes from "prop-types";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {
    useLazyGetBarMenuAlcQuery,
    useLazyGetBarMenuBeerQuery,
    useLazyGetBarMenuBottleQuery, useLazyGetBarMenuCocktailsQuery, useLazyGetBarMenuFoodQuery,
    useGetBarMenuTabsQuery
} from "../../store/services/centerBeer.js";
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react";
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react";
import MeatIcon from "../../assets/meat-icon.svg?react";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg?react";
import CoctailIcon from "../../assets/coctail-icon.svg?react"
import {useEffect, useState} from "react";
import DraftBeerCard from "../Cards/DraftBeerCard/DraftBeerCard.jsx";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import StrongAlcoholCard from "../Cards/StrongAlcoCard/StrongAlcoholCard.jsx";
import ProductCard from "../Cards/ProductCard/ProductCard.jsx";

export default function BarMenu({filters, filterButtons, sections, barId = 1}){
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery({bar_id: barId})
    const [filteredTabs, setFilteredTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState("")

    // Тригеры для вызова хуков
    const {trigger: beerTrigger} = useLazyGetBarMenuBeerQuery()
    const {trigger: bottleTrigger} = useLazyGetBarMenuBottleQuery()
    const {trigger: alcTrigger} = useLazyGetBarMenuAlcQuery()
    const {trigger: cocktailsTrigger} = useLazyGetBarMenuCocktailsQuery()
    const {trigger: foodTrigger} = useLazyGetBarMenuFoodQuery()

    const tabsSpecs = {
        beer: {icon: BeerTapIcon, wideColumns: false, filterTitle: "На кранах", CardComponent: DraftBeerCard, hook: beerTrigger, data: [], isLoading: false, error: false},
        beer_bottle: {icon: BottlesPairIcon, wideColumns: false, filterTitle: "Фасованное пиво", CardComponent: BottledBeerCard, hook:  bottleTrigger, data: [], isLoading: false, error: false},
        alc: {icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Крепкий алкоголь", CardComponent: StrongAlcoholCard, hook: alcTrigger, data: [], isLoading: false, error: false},
        cocktails: {icon: CoctailIcon, wideColumns: false, filterTitle: "Безалкогольные напитки", CardComponent: ProductCard, hook: cocktailsTrigger, data: [], isLoading: false, error: false},
        food: {icon: MeatIcon, wideColumns: true, filterTitle: "Еда", CardComponent: ProductCard, hook: foodTrigger, data: [], isLoading: false, error: false},
        tincture: {icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Настойки", CardComponent: ProductCard}
    }

    useEffect(() => {
        if (tabs && !tabsIsLoading && !tabsError && tabs?.length > 0 ){
            if (selectedTab.length > 0){
                setFilteredTabs(tabs?.filter(x => x?.alias === selectedTab))
            }
            else{
                setFilteredTabs(tabs)
            }
        }
    }, [tabs, selectedTab, tabsIsLoading, tabsError]);


    if (!tabs || tabsIsLoading || tabsError || tabs?.length === 0) return null

    const loadTabData = (alias) => {
        const tabSpec = tabsSpecs[alias]
        if (tabSpec?.hook){
            tabSpec.hook({bar_id: barId}).then((response) => {
                tabSpec.data = response.data
            })
        }
    }

    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <h2>Наше меню</h2>
                <div className={styles.filterButtons}>
                    {tabs?.map((tab, index) => {
                        const IconComponent = tabsSpecs[tab?.alias]?.icon || AlcoBottleIcon
                        return (<IconButton style={selectedTab === tab?.alias? "primary": ""} onClick={() => selectedTab === tab?.alias? setSelectedTab(""): setSelectedTab(tab?.alias)} key={index} text={tabsSpecs[tab?.alias]?.filterTitle || tab?.header || ""}><IconComponent/></IconButton>)
                    }

                    )}
                </div>
            </div>
            { filteredTabs.map((tab, index) => {

                return(<div key={index} className={styles.menuContent}>
                    <div className={styles.menuFilters}>
                        {filters.map((filter) => {
                            return(
                                filter.type === "combobox" ? <FilterComboBox title={filter.title} options={filter.options}/> : <Radio options={filter.options}/>
                            )
                        })}
                        <SimpleButton text="Применить фильтры"></SimpleButton>
                    </div>
                    <div className={styles.menuItemsSections}>
                        <CatalogSection specs={tab} CardComponent={tabsSpecs[tab.alias]?.CardComponent || ProductCard} IconComponent={tabsSpecs[tab.alias]?.icon || AlcoBottleIcon } wideColumns={tabsSpecs[tab.alias]?.wideColumns}/>
                    </div>
                </div>)}
                /*<div key={index} className={styles.menuContent}>
                    <div className={styles.menuFilters}>
                        {filters.map((filter) => {
                            return(
                                filter.type === "combobox" ? <FilterComboBox title={filter.title} options={filter.options}/> : <Radio options={filter.options}/>
                            )
                        })}
                        <SimpleButton text="Применить фильтры"></SimpleButton>
                    </div>
                    <div className={styles.menuItemsSections}>
                        <CatalogSection specs={section.specs} CardComponent={section.CardComponent} IconComponent={section.IconComponent} wideColumns={section.wideColumns}/>
                    </div>
                </div>*/
            )}


        </div>
    )
}

BarMenu.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string).isRequired,
            type: PropTypes.string.isRequired
        })
    ),
    filterButtons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.func.isRequired,
        })
    ),
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            specs: PropTypes.array,
            CardComponent: PropTypes.func,
            IconComponent: PropTypes.func,
            wideColumns: PropTypes.bool,
        })
    ),
}