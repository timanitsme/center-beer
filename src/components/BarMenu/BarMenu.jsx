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
    // Состояние для хранения имен применяемых фильтров
    const [filterNameMap, setFilterNameMap] = useState({});

    // Получение всех вкладок
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery(barId)


    const [selectedTab, setSelectedTab] = useState("")

    // Получение всех фильтров с api
    const beerFilters = useGetBarMenuBeerFiltersQuery(barId, {skip: selectedTab !== "beer"})
    const bottleFilters = useGetBarMenuBottleFiltersQuery(barId, {skip: selectedTab !== "beer_bottle"})
    const alcFilters = useGetBarMenuAlcFiltersQuery(barId, {skip: selectedTab !== "alc"})
    const cocktailsFilters = useGetBarMenuCocktailsFiltersQuery(barId, {skip: selectedTab !== "cocktails"})
    const foodFilters = useGetBarMenuFoodFiltersQuery(barId, {skip: selectedTab !== "food"})


    const [filteredTabs, setFilteredTabs] = useState([])

    const [tabIsInitialized, setTabIsInitialized] = useState(false)

    // Изначальные состояния для осуществления запросов с фильтрами
    const initialStates = {
        beer: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', brew_ids: [], price_ids: ''},
        beer_bottle: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', pack_ids: [], brew_ids: [], price_ids: ''},
        alc: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        cocktails: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        food: {bar_id: barId, lim: 24, offset: 0, kitchen_ids: [], price_ids: ''}
    }

    // Функция для определения, является ли параметр множественного выбора
    function isMultiSelectParam(paramName) {
        return /^og|^abv|^ibu/.test(paramName);
    }

    // Создание массива параметров множественного выбора для каждого tabAlias
    const multiSelectParams = Object.keys(initialStates).reduce((acc, tabAlias) => {
        acc[tabAlias] = Object.keys(initialStates[tabAlias])
            .filter(isMultiSelectParam); // Оставляем только параметры, соответствующие условию
        return acc;
    }, {});

    // Примененные фильтры
    const [tabFilterValues, setTabFilterValues] = useState(() => {
        const initialFilterValues = {};
        Object.keys(initialStates).forEach((key) => {
            initialFilterValues[key] = { ...initialStates[key] };
        });
        return initialFilterValues;
    });

    // Выбранные (но не примененные фильтры)
    const [tabSelectedFilters, setTabSelectedFilters] = useState(() => {
        const initialSelectedFilters = {};
        Object.keys(initialStates).forEach((key) => {
            initialSelectedFilters[key] = { ...initialStates[key] };
        });
        return initialSelectedFilters;
    });


    // Спецификация фильтров (отображаемые названия, компонент и id, в котором фильтр отображается в запросе)
    const filterSpecs = {
        beer: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "rangeRadio", id: "abv"},
            abv_from: {title: "Алкоголь от", id: "abv_from"},
            abv_to: {title: "Алкоголь до", id: "abv_to"},
            og: {title: "Плотность", component: "rangeRadio", id: "og"},
            og_from: {title: "Плотность от", id: "og_from"},
            og_to: {title: "Плотность до", id: "og_to"},
            ibu: {title: "Горечь", component: "rangeRadio", id: "ibu"},
            ibu_from: {title: "Горечь от", id: "ibu_from"},
            ibu_to: {title: "Горечь до", id: "ibu_to"},

        },
        beer_bottle: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "rangeRadio", id: "abv"},
            og: {title: "Плотность", component: "rangeRadio", id: "og"},
            ibu: {title: "Горечь", component: "rangeRadio", id: "ibu"},
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

    // Получение данных товаров по заданным фильтрам
    const {data: beerData, isLoading: beerIsLoading, error: beerError} = useGetBarMenuBeerQuery(tabFilterValues.beer, {skip: selectedTab !== "beer"})
    const {data: bottleData, isLoading: bottleIsLoading, error: bottleError} = useGetBarMenuBottleQuery(tabFilterValues.beer_bottle, {skip: selectedTab !== "beer_bottle"})
    const {data: alcData, isLoading: alcIsLoading, error: alcError} = useGetBarMenuAlcQuery(tabFilterValues.alc, {skip: selectedTab !== "alc"})
    const {data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError} = useGetBarMenuCocktailsQuery(tabFilterValues.cocktails, {skip: selectedTab !== "cocktails"})
    const {data: foodData, isLoading: foodIsLoading, error: foodError} = useGetBarMenuFoodQuery(tabFilterValues.food, {skip: selectedTab !== "food"})

    // Спецификация вкладок
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

    // Состояние для сброса фильтров конкретной вкладки (а именно для сброса галочек, т.е. визуально выбранных фильтров)
    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.keys(tabsSpecs).forEach((key) => {
            resetFiltersStates[key] = false;
        });
        return resetFiltersStates;
    });


    // Применение фильтров для конкретной вкладки
    const applyFilters = (alias) => {
        setTabFilterValues((prevState) => ({
            ...prevState,
            [alias]: tabSelectedFilters[alias],
        }));
    };

    // Сброс фильтров для конкретной вкладки
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
            [alias]: true,
        }));
    }

    // Обработка изменения фильтра (добавление измененных данных в выбранные фильтры)
    const handleFilterChange = (tabAlias, filterKey, value) => {
        if (multiSelectParams[tabAlias].includes(`${filterKey}_id`)){
            setTabSelectedFilters((prevState) => ({
                ...prevState,
                [tabAlias]: {
                    ...prevState[tabAlias],
                    [`${filterKey}_id`]: [value.options.id],
                    [`${filterKey}_to`]: [value.options.to],
                    [`${filterKey}_from`]: [value.options.from],
                },
            }));
        }
        else{
            setTabSelectedFilters((prevState) => ({
                ...prevState,
                [tabAlias]: {
                    ...prevState[tabAlias],
                    [filterKey]: Array.isArray(value.options) ? value.options : [value.options],
                },
            }));
        }
    };

    // Конфигурация фильтров
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

    // Генерация наименований, которые будут отображаться в выбранных фильтрах
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
                        if (tabFilterSpec[key]?.title && option?.name){
                            acc[option.id] = `${tabFilterSpec[key].title}: ${option.name}`; // Предполагается, что у опций есть `id` и `name`
                            return acc;
                        }
                        else if (option?.name){
                            acc[option.id] = option.name;
                            return acc;
                        }

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

    // Подсчет количества примененных фильтров
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

    // Обработка удаления конкретного фильтра по клику в applied filters
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

    // Обработка удаления конкретного фильтра по клику в applied filters
    const removeRangeRadioFilter = (tabAlias, filterKey) => {
        setTabFilterValues((prev) => {
            const currentTabFilters = prev[tabAlias];
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentTabFilters,
                        [filterKey]: "",
                    },
            }
        });
    };

    // Установка первой вкладки в качестве выбранной при загрузке страницы
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

    useEffect(() => {
        if (tabResetFilters[selectedTab]) {
            const timeout = setTimeout(() => {
                setTabResetFilters((prevState) => ({
                    ...prevState,
                    [selectedTab]: false,
                }));
            }, 1);

            return () => clearTimeout(timeout);
        }
    }, [tabResetFilters]);

    if (!tabs || tabsIsLoading || tabsError || tabs?.length === 0) return null

    return(
        <div className={styles.menuContainer} ref={ref}>
            <div className={styles.menuHeader}>
                <h2>Наше меню</h2>
                <div className={styles.filterButtons}>
                    {tabs?.map((tab, index) => {
                        const IconComponent = tabsSpecs[tab?.alias]?.icon || AlcoBottleIcon
                        return (<IconButton style={selectedTab === tab?.alias? "primary": ""} onClick={() => selectedTab !== tab?.alias && setSelectedTab(tab?.alias)} key={index} text={tabsSpecs[tab?.alias]?.filterTitle || tab?.header || ""}><IconComponent/></IconButton>)
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
                                reset={tabResetFilters[tab.alias]}
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
                                            if (multiSelectParams[tab.alias].includes(filterKey)){
                                                const filterName = filterKey.split("_")[0]
                                                const filterDirection = filterKey.split("_")[1]
                                                if (!filterName) return null;
                                                if (filterDirection === "id"){
                                                    const filterValue = filterNameMap[tab.alias][filterName]?.[id]
                                                    return <>
                                                        {filterValue && <AppliedFilter key={`${filterKey}`} onClick={() => removeFilter(tab.alias, filterKey, id)}>
                                                            <p>{filterValue}</p>
                                                        </AppliedFilter>}
                                                    </>
                                                }
                                                else if (filterDirection === "from"){
                                                    const filterValueFrom = tabFilterValues[tab.alias][`${filterName}_from`]
                                                    return <>
                                                        {filterValueFrom && <AppliedFilter key={`${filterKey}_from`} onClick={() => removeRangeRadioFilter(tab.alias,filterKey)}>
                                                            <p>{`${filterSpecs[tab.alias][filterName]?.title} от: ${filterValueFrom}`}</p>
                                                        </AppliedFilter>}
                                                    </>
                                                }
                                                else if (filterDirection === "to"){
                                                    const filterValueTo = tabFilterValues[tab.alias][`${filterName}_to`]
                                                    return <>
                                                        {filterValueTo && <AppliedFilter key={`${filterKey}-to`} onClick={() => removeRangeRadioFilter(tab.alias,filterKey)}>
                                                            <p>{`${filterSpecs[tab.alias][filterName]?.title} до: ${filterValueTo}`}</p>
                                                        </AppliedFilter>}
                                                    </>
                                                }
                                            }
                                            else{
                                                const filterName = filterNameMap[tab.alias][filterKey]?.[id];
                                                if (!filterName) return null;
                                                return (
                                                    <AppliedFilter key={`${filterKey}-${id}`} onClick={() => removeFilter(tab.alias,filterKey, id)}>
                                                        <p>{filterName}</p>
                                                    </AppliedFilter>
                                                );
                                            }


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