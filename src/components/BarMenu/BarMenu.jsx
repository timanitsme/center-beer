import styles from "./BarMenu.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import CatalogSection from "../CatalogSections/CatalogSection/CatalogSection.jsx";
import PropTypes from "prop-types";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {
    useGetBarMenuAlcFiltersQuery,
    useGetBarMenuAlcQuery,
    useGetBarMenuBeerFiltersQuery,
    useGetBarMenuBeerQuery,
    useGetBarMenuBottleFiltersQuery,
    useGetBarMenuBottleQuery,
    useGetBarMenuCocktailsFiltersQuery,
    useGetBarMenuCocktailsQuery,
    useGetBarMenuFoodFiltersQuery,
    useGetBarMenuFoodQuery,
    useGetBarMenuTabsQuery
} from "../../store/services/centerBeer.js";
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react";
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react";
import MeatIcon from "../../assets/meat-icon.svg?react";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg?react";
import CoctailIcon from "../../assets/coctail-icon.svg?react"
import {useEffect, useMemo, useState} from "react";
import DraftBeerCard from "../Cards/DraftBeerCard/DraftBeerCard.jsx";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import StrongAlcoholCard from "../Cards/StrongAlcoCard/StrongAlcoholCard.jsx";
import ProductCard from "../Cards/ProductCard/ProductCard.jsx";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";

export default function BarMenu({filters, filterButtons, sections, barId = 1}){
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery({bar_id: barId})
    const beerFilters = useGetBarMenuBeerFiltersQuery({bar_id: barId})
    const bottleFilters = useGetBarMenuBottleFiltersQuery({bar_id: barId})
    const alcFilters = useGetBarMenuAlcFiltersQuery({bar_id: barId})
    const cocktailsFilters = useGetBarMenuCocktailsFiltersQuery({bar_id: barId})
    const foodFilters = useGetBarMenuFoodFiltersQuery({bar_id: barId})

    const [filteredTabs, setFilteredTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState("")
    const [tabDataMap, setTabDataMap] = useState({});


    const initialStates = {
        beer: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', brew_ids: [], price_ids: ''},
        beer_bottle: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', pack_ids: [], brew_ids: [], price_ids: ''},
        alc: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        cocktails: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        food: {bar_id: barId, lim: 24, offset: 0, kitchen_ids: [], price_ids: ''}
    }

    const filterSpecs = {
        beer: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "radio", id: "abv_id"},
            og: {title: "Плотность", component: "radio", id: "og_id"},
            ibu: {title: "Горечь", component: "radio", id: "ibu_id"}
        },
        beer_bottle: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "radio", id: "abv_id"},
            og: {title: "Плотность", component: "radio", id: "og_id"},
            ibu: {title: "Горечь", component: "radio", id: "ibu_id"},
            /*pack_vol: {title: "Объём", component: "", id: "ibu_id"},*/
            pack_type: {title: "Тара", component: "checkboxSection", id: "pack_ids"},
        },
        alc: {
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        },
        cocktails: {
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        },
        food: {
            kitchen: {title: "Кухня", component: "combobox", id: "kitchen_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        }
    }

    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetBarMenuBeerQuery({bar_id: barId, lim: 24})
    const {data: bottleData, isLoading: bottleIsLoading, error: bottleError} = useGetBarMenuBottleQuery({bar_id: barId, lim: 24})
    const {data: alcData, isLoading: alcIsLoading, error: alcError} = useGetBarMenuAlcQuery({bar_id: barId, lim: 24})
    const {data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError} = useGetBarMenuCocktailsQuery({bar_id: barId, lim: 24})
    const {data: foodData, isLoading: foodIsLoading, error: foodError} = useGetBarMenuFoodQuery({bar_id: barId, lim: 24})



    const tabsSpecs = useMemo(() => {
        const specs = {
            beer: {icon: BeerTapIcon, wideColumns: false, filterTitle: "На кранах", CardComponent: DraftBeerCard, data: beerData, isLoading: beerIsLoading, error: beerError, filters: beerFilters},
            beer_bottle: {icon: BottlesPairIcon, wideColumns: false, filterTitle: "Фасованное пиво", CardComponent: BottledBeerCard, data: bottleData, isLoading: bottleIsLoading, error: bottleError, filters: bottleFilters},
            alc: {icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Крепкий алкоголь", CardComponent: StrongAlcoholCard, data: alcData, isLoading: alcIsLoading, error: alcError, filters: alcFilters},
            cocktails: {icon: CoctailIcon, wideColumns: true, filterTitle: "Безалкогольные напитки", CardComponent: ProductCard, data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError, filters: cocktailsFilters},
            food: {icon: MeatIcon, wideColumns: true, filterTitle: "Еда", CardComponent: ProductCard, data: foodData, isLoading: foodIsLoading, error: foodError, filters: foodFilters},
            //tincture: {icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Настойки", CardComponent: ProductCard}
        }
        Object.keys(specs).forEach((key)=>{
            specs[key].filterSpec = filterSpecs[key] && filterSpecs[key]
            specs[key].initialState = initialStates[key] && initialStates[key]
        })
        return specs
    }, [beerData, beerIsLoading, beerError, beerFilters, bottleData, bottleIsLoading, bottleError,
        bottleFilters, alcData, alcIsLoading, alcError, alcFilters, cocktailsData, cocktailsIsLoading,
        cocktailsError, cocktailsFilters, foodData, foodIsLoading, foodError, foodFilters, filterSpecs,
        initialStates
    ])

    const filtersConfig = useMemo(() => {
        return (alias) => {
            const tabSpec = tabsSpecs[alias];
            if (!tabSpec?.filters?.data || tabSpec?.filters?.isLoading || tabSpec?.filters?.isError) return [];

            return Object.entries(tabSpec?.filters?.data[0]).map(([key, options]) => {
                const spec = tabSpec.filterSpec[key];
                return {
                    title: spec?.title || key,
                    key: spec?.id || key,
                    options: options || [],
                    componentType: spec?.component || "",
                };
            });
        };
    }, [tabsSpecs]);


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

                const tabSpec = tabsSpecs[tab.alias]

                return(<div key={index} className={styles.menuContent}>
                    <div className={styles.menuFilters}>
                        {filtersConfig(tab.alias).map((filter) => (
                            <FilterItem
                                key={filter.key}
                                filter={filter}
                                filterKey={tab.alias}
                                //onChange={(value) => handleFilterChange(filter.key, value)}
                                //reset={resetFilterComboBox}
                            />
                        ))}
                        <SimpleButton text="Применить фильтры"></SimpleButton>
                    </div>
                    <div className={styles.menuItemsSections}>

                        <CatalogSection cards={{data: tabSpec?.data || {}, isLoading: tabSpec?.isLoading || false, error: tabSpec?.error || false}} specs={tab} CardComponent={tabsSpecs[tab.alias]?.CardComponent || ProductCard} IconComponent={tabsSpecs[tab.alias]?.icon || AlcoBottleIcon } wideColumns={tabsSpecs[tab.alias]?.wideColumns}/>
                    </div>
                </div>)}
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