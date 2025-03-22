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
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";

export default function BarMenu({filters, filterButtons, sections, ref, barId = 1}){
    const [filterNameMap, setFilterNameMap] = useState({});
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery(barId)
    const beerFilters = useGetBarMenuBeerFiltersQuery(barId)
    const bottleFilters = useGetBarMenuBottleFiltersQuery(barId)
    const alcFilters = useGetBarMenuAlcFiltersQuery(barId)
    const cocktailsFilters = useGetBarMenuCocktailsFiltersQuery(barId)
    const foodFilters = useGetBarMenuFoodFiltersQuery(barId)

    const [filteredTabs, setFilteredTabs] = useState([])
    const [selectedTab, setSelectedTab] = useState("")
    const [tabDataMap, setTabDataMap] = useState({});
    const [tabIsInitialized, setTabIsInitialized] = useState(false)


    const initialStates = {
        beer: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', brew_ids: [], price_ids: ''},
        beer_bottle: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', pack_ids: [], brew_ids: [], price_ids: ''},
        alc: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        cocktails: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        food: {bar_id: barId, lim: 24, offset: 0, kitchen_ids: [], price_ids: ''}
    }

    const [tabFilterValues, setTabFilterValues] = useState(() => {
        const initialFilterValues = {};
        Object.keys(initialStates).forEach((key) => {
            initialFilterValues[key] = { ...initialStates[key] };
        });
        return initialFilterValues;
    });

    const [tabSelectedFilters, setTabSelectedFilters] = useState(() => {
        const initialSelectedFilters = {};
        Object.keys(initialStates).forEach((key) => {
            initialSelectedFilters[key] = { ...initialStates[key] };
        });
        return initialSelectedFilters;
    });


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

    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetBarMenuBeerQuery(tabFilterValues.beer)
    const {data: bottleData, isLoading: bottleIsLoading, error: bottleError} = useGetBarMenuBottleQuery(tabFilterValues.beer_bottle)
    const {data: alcData, isLoading: alcIsLoading, error: alcError} = useGetBarMenuAlcQuery(tabFilterValues.alc)
    const {data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError} = useGetBarMenuCocktailsQuery(tabFilterValues.cocktails)
    const {data: foodData, isLoading: foodIsLoading, error: foodError} = useGetBarMenuFoodQuery(tabFilterValues.food)



    const tabsSpecs = useMemo(() => {
        const specs = {
            beer: {icon: BeerTapIcon, hook: useGetBarMenuBeerQuery, wideColumns: false, filterTitle: "На кранах", CardComponent: DraftBeerCard, data: beerData, isLoading: beerIsLoading, error: beerError, filters: beerFilters, filterValues: tabFilterValues.beer, selectedFilters: tabSelectedFilters.beer },
            beer_bottle: {icon: BottlesPairIcon, hook: useGetBarMenuBottleQuery, wideColumns: false, filterTitle: "Фасованное пиво", CardComponent: BottledBeerCard, data: bottleData, isLoading: bottleIsLoading, error: bottleError, filters: bottleFilters, filterValues: tabFilterValues.beer_bottle, selectedFilters: tabSelectedFilters.beer_bottle},
            alc: {icon: AlcoBottleIcon, hook: useGetBarMenuAlcQuery, wideColumns: false, filterTitle: "Крепкий алкоголь", CardComponent: StrongAlcoholCard, data: alcData, isLoading: alcIsLoading, error: alcError, filters: alcFilters, filterValues: tabFilterValues.alc, selectedFilters: tabSelectedFilters.alc},
            cocktails: {icon: CoctailIcon, hook: useGetBarMenuCocktailsQuery, wideColumns: true, filterTitle: "Безалкогольные напитки", CardComponent: ProductCard, data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError, filters: cocktailsFilters, filterValues: tabFilterValues.cocktails, selectedFilters: tabSelectedFilters.cocktails},
            food: {icon: MeatIcon, hook: useGetBarMenuFoodQuery, wideColumns: true, filterTitle: "Еда", CardComponent: ProductCard, data: foodData, isLoading: foodIsLoading, error: foodError, filters: foodFilters,  },
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

    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.keys(tabsSpecs).forEach((key) => {
            resetFiltersStates[key] = false;
        });
        return resetFiltersStates;
    });

    const applyFilters = (alias) => {
        setTabFilterValues((prevState) => ({
            ...prevState,
            [alias]: tabSelectedFilters[alias],
        }));

    };

    const resetFilters = (alias) => {
        setTabFilterValues((prevState) => ({
            ...prevState,
            [alias]: initialStates[alias],
        }));
        setTabSelectedFilters((prevState) => ({
            ...prevState,
            [alias]: initialStates[alias],
        }));
        setTabResetFilters((prevState) => ({
            ...prevState,
            [alias]: false,
        }));
    }

    const handleFilterChange = (tabAlias, filterKey, value) => {
        setTabSelectedFilters((prevState) => ({
            ...prevState,
            [tabAlias]: {
                ...prevState[tabAlias],
                [filterKey]: Array.isArray(value.options) ? value.options : [value.options],
            },
        }));
    };

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
        const updatedFilterNameMap = {};

        Object.keys(tabsSpecs).forEach((alias) => {
            const tabFilters = tabsSpecs[alias]?.filters?.data;
            const tabFilterSpec = filterSpecs[alias];

            if (tabFilters && !tabsSpecs[alias]?.filters?.isLoading && !tabsSpecs[alias]?.filters?.isError) {
                const nameMap = {};

                // Обработка filters для конкретной вкладки
                Object.entries(tabFilters[0]).forEach(([key, options]) => {
                    nameMap[tabFilterSpec[key]?.id || key] = options.reduce((acc, option) => {
                        acc[option.id] = option.name; // Предполагается, что у опций есть `id` и `name`
                        return acc;
                    }, {});
                });

                // Сохраняем nameMap для текущей вкладки
                updatedFilterNameMap[alias] = nameMap;
            }
        });

        // Обновляем filterNameMap только если данные изменились
        setFilterNameMap((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(updatedFilterNameMap)) {
                return updatedFilterNameMap;
            }
            return prev;
        });
    }, [tabsSpecs, filterSpecs]);

    const countAppliedFilters = (alias) => {
        // Проверяем, что tabFilterValues[alias] существует
        if (!tabFilterValues[alias]) return 0;

        let count = 0;

        Object.entries(tabFilterValues[alias]).forEach(([filterKey, value]) => {
            // Если значение — массив, считаем его длину
            if (Array.isArray(value) && value.length > 0) {
                count += value.length;
            }
            // Если значение — строка или булево значение, учитываем его как один фильтр
            else if (typeof value === "string" && value.trim() !== "") {
                count += 1;
            } else if (typeof value === "boolean" && value) {
                count += 1;
            }
        });

        return count;
    };


    const removeFilter = (tabAlias, filterKey, idToRemove) => {
        setTabFilterValues((prev) => {
            const currentTabFilters = prev[tabAlias]; // Фильтры текущей вкладки
            const currentValue = currentTabFilters[filterKey];

            if (Array.isArray(currentValue)) {
                // Удаляем элемент из массива
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentTabFilters,
                        [filterKey]: currentValue.filter((id) => id !== idToRemove),
                    },
                };
            } else {
                // Сбрасываем не массивное значение
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentTabFilters,
                        [filterKey]: "",
                    },
                };
            }
        });
    };


    useEffect(() => {
        if (tabs && !tabsIsLoading && !tabsError && tabs?.length > 0 ){
            if (selectedTab === "" && !tabIsInitialized){
                setSelectedTab(tabs[0]?.alias)
                setTabIsInitialized(true)
            }

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
        <div className={styles.menuContainer} ref={ref}>
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
                const IconComponent = tabsSpecs[tab.alias]?.icon || AlcoBottleIcon
                const CardComponent = tabsSpecs[tab.alias]?.CardComponent || ProductCard

                return(<div key={index} className={styles.menuContent}>
                    <div className={styles.menuFilters}>
                        {filtersConfig(tab.alias).map((filter) => (
                            <FilterItem
                                key={filter.key}
                                filter={filter}
                                filterKey={tab.alias}
                                onChange={(value) => handleFilterChange(tab.alias, filter.key, value)}
                                reset={tabResetFilters.alias}
                            />
                        ))}
                        <SimpleButton onClick={() => applyFilters(tab.alias)} text="Применить фильтры"></SimpleButton>
                    </div>
                    <div className={styles.menuItemsSections}>
                        <div className={styles.menuSection}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.sectionDescriptionIcon}><IconComponent/></div>
                                <div className={styles.sectionDescription}>
                                    <h2>{tab?.header}</h2>
                                    <p>{tab?.description}</p>
                                </div>
                                <div className={styles.sectionButton}><IconButton text="Забронировать стол"><IconComponent/></IconButton></div>
                            </div>
                            <div className={styles.appliedFiltersRow}>
                                {Object.entries(tabFilterValues[tab.alias] || {}).map(([filterKey, value]) => {
                                    // Пропускаем пустые значения
                                    if (!value || (Array.isArray(value) && value.length === 0)) return null;

                                    // Если значение — массив, обрабатываем каждый элемент
                                    if (Array.isArray(value)) {
                                        return value.map((id) => {
                                            const filterName = filterNameMap[tab.alias][filterKey]?.[id];
                                            if (!filterName) return null;
                                            return (
                                                <AppliedFilter key={`${filterKey}-${id}`} onClick={() => removeFilter(tab.alias,filterKey, id)}>
                                                    <p>{filterName}</p>
                                                </AppliedFilter>
                                            );
                                        });
                                    }

                                    // Если значение не массив (например, строка или булево значение)
                                    if (typeof value === "string") {
                                        return (
                                            <AppliedFilter key={filterKey} onClick={() => removeFilter(tab.alias, filterKey, value)}>
                                                <p>{filterNameMap[tab.alias][filterKey]?.[value] || value.toString()}</p>
                                            </AppliedFilter>
                                        );
                                    }

                                    if (typeof value === "boolean"){
                                        return (
                                            <AppliedFilter key={filterKey} onClick={() => removeFilter(tab.alias, filterKey, value)}>
                                                <p>{filterNameMap[tab.alias][filterKey].value}</p>
                                            </AppliedFilter>
                                        )
                                    }

                                    return null;
                                })}

                                {countAppliedFilters(tab.alias) > 0 && <AppliedFilter style="secondary" onClick={() => resetFilters(tab.alias)}>
                                    <p>Сбросить фильтры</p>
                                </AppliedFilter>}
                            </div>
                            <div className={tabsSpecs[tab.alias]?.wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                                {tabSpec?.data && tabSpec?.data?.length > 0 && tabSpec?.data?.map((cardInfo, index) => <CardComponent key={index} cardInfo={cardInfo}/>)}
                            </div>

                        </div>
                        {/*<CatalogSection cards={{data: tabSpec?.data || {}, isLoading: tabSpec?.isLoading || false, error: tabSpec?.error || false}} specs={tab}
                                        CardComponent={tabsSpecs[tab.alias]?.CardComponent || ProductCard} IconComponent={tabsSpecs[tab.alias]?.icon || AlcoBottleIcon }
                                        wideColumns={tabsSpecs[tab.alias]?.wideColumns} resetFilters={resetFilters} countAppliedFilters={countAppliedFilters} alias={tab.alias}
                                        removeFilter={removeFilter} filterNameMap={filterNameMap}/>*/}
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