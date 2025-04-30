import {useEffect, useMemo, useState} from "react";
import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import LabelBottleIcon from "../../assets/label-bottle-icon.svg?react"
import BeerMap from "../BeerMap/BeerMap.jsx";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import {useNavigate} from "react-router-dom";
import {useGetBarsFiltersQuery, useGetBarsQuery, useGetCitiesQuery} from "../../store/services/centerBeer.js";
import Search from "../ApiInputs/Search/Search.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import BarCard from "../Cards/BarCard/BarCard.jsx";
import ComboBox from "../ApiInputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import {isMobile} from "react-device-detect";
import FiltersModal from "../Modals/FiltersModal/FiltersModal.jsx";

export default function BeerMapCatalog({filters = [], filterButtons = []}){
    const navigate = useNavigate()
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    // Спецификация фильтров
    const barFilterSpecs = {
        kitchen: {title: "Кухня", component: "combobox", id: "kitchen_ids"},
        subways: {title: "Метро", component: "combobox", id: "subways_ids"},
        visit_types: {title: "Цель посещения", component: "combobox", id: "visit_type_ids"},
        prices: {title: "Цена", component: "radio", id: "price_ids"},
        types: {title: "Тип заведения", component: "combobox", id: "type_ids"},
        feautures: {title: "Особенности", component: "combobox", id: "feature_ids"},
        cities: {title: "Города", id: "city_id"},
        open: {title: "Только открытые", id: "only_opened"},
        sort_by: {title: "Сортировка", id: "sort_by"}
    }

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState({
        lim: 200,
        offset: 0,
        city_id: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        price_ids: [],
        type_ids: [],
        feature_ids: [],
        only_opened: false,
        sort_by: "popular"
    });

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState({
        city_id: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        price_ids: [],
        type_ids: [],
        feature_ids: [],
        only_opened: false,
        sort_by: "popular"
    });

    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.values(barFilterSpecs).forEach((value) => {
            resetFiltersStates[value.id] = {reset: false, id: 0};
        });
        return resetFiltersStates;
    });

    // Получение данных с API
    const {data: barsData, isLoading: barsIsLoading, error: barsError } = useGetBarsQuery(filterValues);
    const {data: barFilters, isLoading: barFiltersIsLoading, error: barFiltersError} = useGetBarsFiltersQuery(filterValues["city_id"] || 1)
    const {data: cities, isLoading: citiesIsLoading, error: citiesError} = useGetCitiesQuery()
    const sortFilters =[
        {id: "popular", name: "Популярное"},
        {id: "price", name: "По цене"},
        {id: "rating", name: "По отзывам"},
    ]

    useEffect(() => {
        if (barFilters && !barFiltersIsLoading && !barFiltersError) {
            const nameMap = {};
            // Обработка barFilters
            Object.entries(barFilters[0]).forEach(([key, options]) => {
                nameMap[barFilterSpecs[key]?.id || key] = options.reduce((acc, option) => {
                    acc[option.id] = `${barFilterSpecs[key].title}: ${option.name}`; // Предполагается, что у опций есть `id` и `name`
                    return acc;
                }, {});
            });

            // Обработка cities
            if (cities && !citiesIsLoading && !citiesError) {
                nameMap["city_id"] = cities.reduce((acc, city) => {
                    acc[city.id.toString()] = `Город: ${city.name}`; // Предполагается, что у городов есть `id` и `name`
                    return acc;
                }, {});
            }
            // Обработка only_opened
            nameMap["only_opened"] = {}// value: "Только открытые"
            setFilterNameMap(nameMap);
        }
    }, [barFilters, barFiltersIsLoading, barFiltersError, cities, citiesIsLoading, citiesError]);

    // Подготовка фильтров
    const filtersConfig = useMemo(() => {
        if (!barFilters || barFiltersIsLoading || barFiltersError) return [];
        return Object?.entries(barFilters[0])?.map(([key, options]) => {
            const spec = barFilterSpecs[key]
            return  {
                title: spec?.title || key, // Используем маппинг заголовков
                key: spec?.id || key,
                options: options || [],
                componentType: spec?.component || "",
            }
        });
    }, [barFilters, barFiltersIsLoading, barFiltersError]);

    const handleFilterChange = (filterKey, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterKey]: Array.isArray(value.options) ? value.options : [value.options === 0? '': value.options],
        }));
    };

    const handleSingleFilterChange = (filterKey, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterKey]: value,
        }));
    }

    const handleSingleFilterApply = (filterKey, value) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filterKey]: value,
        }));
        setFilterValues((prevState) => ({
            ...prevState,
            [filterKey]: value,
        }));
    }

    // Применение фильтров
    const applyFilters = () => {
        setFilterValues(selectedFilters);
    }

    // Сброс фильтров
    const resetFilters = () => {

        const initialState = {
            lim: 200,
            offset: 0,
            city_id: '',
            subways_ids: [],
            kitchen_ids: [],
            visit_type_ids: [],
            price_ids: [],
            type_ids: [],
            feature_ids: [],
            only_opened: false,
            sort_by: "popular"
        };
        setFilterValues(initialState)
        setSelectedFilters(initialState)
        setTabResetFilters(() => {
            const newState = {};
            Object.values(barFilterSpecs).forEach((value) => {
                newState[value.id] = {reset: true, id: 0}; // Устанавливаем значение `true` для всех фильтров
            });
            return newState;
        });
    }

    // Возвращение reset к изначальному состоянию
    useEffect(() => {
        if (tabResetFilters && Object?.values(tabResetFilters)?.some(value => value.reset === true)) {
            const timeout = setTimeout(() => {
                setTabResetFilters((prevState) => {
                    const newTabResetFilters = { ...prevState };
                    Object.values(barFilterSpecs).forEach((value) => {
                        newTabResetFilters[value.id] = {reset: false, id: 0};
                    });
                    return newTabResetFilters;
                });
            }, 1);

            return () => clearTimeout(timeout);
        }

    }, [tabResetFilters]);


    const removeFilter = (filterKey, idToRemove) => {
        setFilterValues((prev) => {
            const currentValue = prev[filterKey];

            if (Array.isArray(currentValue)) {
                // Удаляем элемент из массива
                return {
                    ...prev,
                    [filterKey]: currentValue.filter((id) => id !== idToRemove),
                };
            } else {
                // Сбрасываем не массивное значение
                return {
                    ...prev,
                    [filterKey]: "",
                };
            }

        });
        setSelectedFilters((prev) => {
            const currentValue = prev[filterKey];
            if (Array.isArray(currentValue)) {
                return {
                    ...prev,
                    [filterKey]: currentValue.filter((id) => id !== idToRemove),
                };
            } else {
                return {
                    ...prev,
                    [filterKey]: "",
                };
            }

        });
        setTabResetFilters((prev) => ({
            ...prev,
            [filterKey]: {reset: true, id: idToRemove},
        }));
    };

    const countAppliedFilters = () => {
        let count = 0;

        Object.entries(filterValues).forEach(([filterKey, value]) => {
            // Если значение — массив, считаем его длину
            if (Array.isArray(value) && value.length > 0 && JSON.stringify(value) !== '[""]') {
                count += value.length;
            }
            // Если значение — строка или булево значение, учитываем его как один фильтр
            else if (typeof value === "string" && value.trim() !== "") {
                if (filterKey !== "sort_by")
                    count += 1;
            } else if (typeof value === "boolean" && value) {
                if (filterKey !== "only_opened")
                    count += 1;
            }
        });
        return count;
    };



    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <div className={styles.catalogHeader}>
                    <div>
                        <h2>Карта баров</h2>
                        <div className={styles.filterButtons} style={{alignItems: "center"}}>
                            <p>Выберите тип карты:</p>
                            <IconButton style={"primary"} text={"Бары"}><LabelBottleIcon/></IconButton>
                            {/*tabs?.map((tab, index) => {
                                const IconComponent = tabsSpecs[tab?.alias]?.icon || AlcoBottleIcon
                                return <IconButton key={index} style={selectedTab === tab?.alias ? "primary" : ""}
                                                   onClick={() => selectedTab !== tab?.alias && setSelectedTab(tab?.alias)}
                                                   text={tabsSpecs[tab?.alias]?.filterTitle || tab?.header || ""}><IconComponent/></IconButton>
                            })*/}
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.menuContent}>
                {!isMobile && <div className={styles.menuFilters}>
                    <Search title="Поиск" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></Search>
                    {filtersConfig.map((filter) => (
                        <FilterItem
                            key={filter.key}
                            filter={filter}
                            onChange={(value) => handleFilterChange(filter.key, value)}
                            reset={tabResetFilters[filter.key]}
                        />
                    ))}
                    <SimpleButton text="Применить фильтры" onClick={applyFilters}></SimpleButton>
                </div>}
                <div className={styles.menuItemsSections}>
                    {isMobile && <div className={styles.toggleAndOptions} style={{marginBottom: "10px"}}>
                        <SimpleButton textStyle={"black"} text="ФИЛЬТРЫ" onClick={() => setShowFiltersModal(true)} style="primary"></SimpleButton>
                    </div>}
                    <div className={styles.appliedFiltersRow}>
                        {Object.entries(filterValues).map(([filterKey, value]) => {
                            // Пропускаем пустые значения
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;
                            if (filterKey === "sort_by") return null
                            // Если значение — массив, обрабатываем каждый элемент
                            if (Array.isArray(value)) {
                                return value.map((id) => {
                                    const filterName = filterNameMap[filterKey]?.[id];
                                    if (!filterName) return null;
                                    return (
                                        <AppliedFilter key={`${filterKey}-${id}`} onClick={() => removeFilter(filterKey, id)}>
                                            <p>{filterName}</p>
                                        </AppliedFilter>
                                    );
                                });
                            }

                            // Если значение не массив (например, строка или булево значение)
                            if (typeof value === "string") {
                                if (filterKey === "city_id"){
                                    return (
                                        <AppliedFilter key={filterKey} onClick={() => removeFilter(filterKey, value)}>
                                            <LocationIcon></LocationIcon>
                                            <p>{filterNameMap[filterKey]?.[value] || value.toString()}</p>
                                        </AppliedFilter>
                                    );
                                }
                                else{
                                    return (
                                        <AppliedFilter key={filterKey} onClick={() => removeFilter(filterKey, value)}>
                                            <p>{filterNameMap[filterKey]?.[value] || value.toString()}</p>
                                        </AppliedFilter>
                                    );
                                }

                            }

                            if (typeof value === "boolean"){
                                if (filterNameMap[filterKey].value){
                                    return (
                                        <AppliedFilter key={filterKey} onClick={() => removeFilter(filterKey, value)}>
                                            <p>{filterNameMap[filterKey].value}</p>
                                        </AppliedFilter>
                                    )
                                }

                            }

                            return null;
                        })}
                        {countAppliedFilters() > 0 && <AppliedFilter style="secondary" onClick={resetFilters}>
                            <p>Сбросить фильтры</p>
                        </AppliedFilter>}
                    </div>
                    {!barsIsLoading && !barsError && <BeerMap data={barsData.data}/>}

                </div>
            </div>
            {isMobile &&
                <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
                    <Search title="Поиск" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></Search>
                    {filtersConfig.map((filter) => (
                        <FilterItem
                            key={filter.key}
                            filter={filter}
                            onChange={(value) => handleFilterChange(filter.key, value)}
                            reset={tabResetFilters[filter.key]}
                        />
                    ))}
                    <SimpleButton text="Применить фильтры" onClick={() => {setShowFiltersModal(false); applyFilters()}}></SimpleButton>
                </FiltersModal>
            }
        </div>
    )
}
