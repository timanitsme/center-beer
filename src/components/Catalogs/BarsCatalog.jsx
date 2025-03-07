import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../ApiInputs/FilterComboBox/FilterComboBox.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PropTypes from "prop-types";
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import BarCard from "../Cards/BarCard/BarCard.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import {useEffect, useMemo, useState} from "react";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import {useGetBarsFiltersQuery, useGetBarsQuery, useGetBarTypesQuery} from "../../store/services/centerBeer";
import {useNavigate} from "react-router-dom";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import Search from "../ApiInputs/Search/Search.jsx";


export default function BarsCatalog({filters = [], filterButtons = [], sections = []}){
    const navigate = useNavigate()
    const [resetFilterComboBox, setResetFilterComboBox] = useState(false); // Управление сбросом фильтров
    const [filterNameMap, setFilterNameMap] = useState({});

    // Спецификация фильтров
    const barFilterSpecs = {
        kitchen: {title: "Кухня", component: "combobox", id: "subways_ids"},
        subways: {title: "Метро", component: "combobox", id: "kitchen_ids"},
        visit_types: {title: "Цель посещения", component: "combobox", id: "visit_type_ids"},
        prices: {title: "Цена", component: "radio", id: "price"},
        types: {title: "Тип заведения", component: "combobox", id: "type_ids"},
        features: {title: "Особенности", component: "combobox", id: "feature_ids"}
    }

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState({
        lim: 24,
        offset: 0,
        city_id: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        type_ids: [],
        feature_ids: [],
        onlyOpened: false
    });

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState({
        city_id: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        type_ids: [],
        feature_ids: [],
        onlyOpened: false,
    });

    // Получение данных с API
    const {data: barsData, isLoading: barsIsLoading, error: barsError } = useGetBarsQuery(filterValues);
    const {data: barFilters, isLoading: barFiltersIsLoading, error: barFiltersError} = useGetBarsFiltersQuery()

    useEffect(() => {
        if (barFilters && !barFiltersIsLoading && !barFiltersError) {
            const nameMap = {};
            Object.entries(barFilters[0]).forEach(([key, options]) => {
                nameMap[barFilterSpecs[key]?.id || key] = options.reduce((acc, option) => {
                    acc[option.id] = option.name; // Предполагается, что у опций есть `id` и `name`
                    return acc;
                }, {});
            });
            console.log("Generated filterNameMap:", nameMap);
            setFilterNameMap(nameMap);
        }
    }, [barFilters, barFiltersIsLoading, barFiltersError]);

    // Подготовка фильтров
    const filtersConfig = useMemo(() => {
        if (!barFilters || barFiltersIsLoading || barFiltersError) return [];
        return Object.entries(barFilters[0]).map(([key, options]) => {
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
            [filterKey]: Array.isArray(value.options) ? value.options : [value.options],
        }));
        console.log(`selectedFilters: ${JSON.stringify(selectedFilters)}`);
    };

    // Применение фильтров
    const applyFilters = () => {
        setFilterValues(selectedFilters);
    }

    const resetFilters = () => {

        const initialState = {
            lim: 24,
            offset: 0,
            city_id: '',
            subways_ids: [],
            kitchen_ids: [],
            visit_type_ids: [],
            type_ids: [],
            feature_ids: [],
            onlyOpened: false,
        };
        setFilterValues(initialState)
        setSelectedFilters(initialState)
        setResetFilterComboBox(true);
    }

    // Возвращение reset к изначальному состоянию
    useEffect(() => {
        if (resetFilterComboBox) {
            const timeout = setTimeout(() => setResetFilterComboBox(false), 1);
            return () => clearTimeout(timeout);
        }
    }, [resetFilterComboBox]);

    const [onlyOpened, setOnlyOpened] = useState(false);


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
    };

    const countAppliedFilters = () => {
        let count = 0;

        Object.entries(filterValues).forEach(([filterKey, value]) => {
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

    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <div className={styles.catalogHeader}>
                    <div>
                        <h2>Каталог баров</h2>
                        <p>Собрали для вас список лучших пивных баров, где можно насладиться свежесваренным пивом, закусками и уютной атмосферой. От классических пабов до оригинальных крафтовых баров — каждый найдет место по вкусу.</p>
                    </div>
                    <div>
                        <IconButton text="Все бары на карте" onClick={() => navigate("/map")}><LocationIcon/></IconButton>
                    </div>
                </div>
                {/*<div className={styles.filterButtons}>
                    {filterButtons.map((button) => (
                        <IconButton key={button.text} text={button.text}>{button.icon}</IconButton>
                    ))}
                </div>*/}
            </div>
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    <Search title="Поиск" onChange={(value) => handleFilterChange("city_id", value)}></Search>
                    {filtersConfig.map((filter) => (
                        <FilterItem
                            key={filter.key}
                            filter={filter}
                            onChange={(value) => handleFilterChange(filter.key, value)}
                            reset={resetFilterComboBox}
                        />
                    ))}
                    <SimpleButton text="Применить фильтры" onClick={applyFilters}></SimpleButton>
                </div>
                <div className={styles.menuItemsSections}>
                    <div className={styles.appliedFiltersRow}>
                        {Object.entries(filterValues).map(([filterKey, value]) => {
                            // Пропускаем пустые значения
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;

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
                            if (typeof value === "string" || typeof value === "boolean") {
                                return (
                                    <AppliedFilter key={filterKey} onClick={() => removeFilter(filterKey, value)}>
                                        <p>{filterNameMap[filterKey]?.[value] || value.toString()}</p>
                                    </AppliedFilter>
                                );
                            }

                            return null;
                        })}

                        {countAppliedFilters() > 0 && <AppliedFilter style="secondary" onClick={resetFilters}>
                            <p>Сбросить фильтры</p>
                        </AppliedFilter>}
                    </div>
                    <div className={styles.toggleAndOptions}>
                        <ComboBox options={["По убыванию", "По возрастанию"]}></ComboBox>
                        <Toggle label={"Только открытые"} toggled={onlyOpened} onClick={() => setOnlyOpened(!onlyOpened)}/>
                    </div>
                    { !barsIsLoading && !barsError &&
                        <SimpleCatalogSection cards={barsData} CardComponent={BarCard} wideColumns={false}/>
                    }


                </div>
            </div>
        </div>
    )
}

BarsCatalog.propTypes = {
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