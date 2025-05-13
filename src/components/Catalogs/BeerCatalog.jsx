import {useEffect, useMemo, useState} from "react";
import styles from "./BarsCatalog.module.css";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import Search from "../ApiInputs/Search/Search.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import ComboBox from "../ApiInputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import PropTypes from "prop-types";
import {
    useGetBeerCountriesQuery,
    useGetBeersFiltersQuery,
    useGetBeersQuery, useGetBeerStylesQuery,
    useGetCitiesQuery, useGetStylesQuery
} from "../../store/services/centerBeer.js";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import {isMobile} from "react-device-detect";
import FiltersModal from "../Modals/FiltersModal/FiltersModal.jsx";
import HookedFilterComboBox from "../ApiInputs/FilterComboBox/HookedFilterComboBox.jsx";


export default function BeerCatalog({filters = [], filterButtons = [], sections = [], withHeader = true, breweryId=null}){
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [isLoadingMore, setIsLoadingMore] = useState(false);



    const handleShowMore = async () => {
        if (!isLoadingMore && beerData?.data && !beerIsFetching) {
            setIsLoadingMore(true);
            setAllCards((prevCards) => [...prevCards, ...beerData?.data]);
            setFilterValues((prevFilters) => ({
                ...prevFilters,
                offset: prevFilters.offset + prevFilters.lim
            }));
            setIsLoadingMore(false);
        }
    };

    // Спецификация фильтров
    const beerFilterSpecs = {
        sort_by: {title: "Сортировка", id: "sort_by"},
        with_reviews: {title: "Только с отзывами", id: "with_reviews"},
        cities: {title: "Города", id: "city_id"},
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
        pack_vol: {title: "Объём", component: "checkboxSection", id: "vol_ids"},
        pack_type: {title: "Тара", component: "checkboxSection", id: "pack_ids"},
        country_ids: {title: "Страна производства", id: "country_ids"},
        style_ids: {title: "Стиль", id: "style_ids"}
    }

    const initialFilters = {
        lim: 24,
        offset: 0,
        sort_by: 'popular',
        with_reviews: false,
        city_id: '',
        country_ids: [],
        color_ids: [],
        price_ids: [],
        abv_id: '',
        abv_from: '',
        abv_to: '',
        og_id: '',
        og_from: '',
        og_to: '',
        ibu_id: '',
        ibu_from: '',
        ibu_to: '',
        vol_ids: [],
        pack_ids: [],
        style_ids: []
    }

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState(initialFilters);

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);

    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.values(beerFilterSpecs).forEach((value) => {
            resetFiltersStates[value.id] = {reset: false, id: 0};
        });
        return resetFiltersStates;
    });

    // Функция для определения, является ли параметр множественного выбора
    function isMultiSelectParam(paramName) {
        return /^og|^abv|^ibu/.test(paramName);
    }

    // Создание массива параметров множественного выбора для каждого tabAlias
    const multiSelectParams = Object.keys(initialFilters).filter(isMultiSelectParam);

    // Получение данных с API
    const {data: beerData, isLoading: beerIsLoading, isFetching: beerIsFetching, error: beerError } = useGetBeersQuery(breweryId === null? filterValues: {...filterValues, brew_ids: breweryId});
    const {data: beerFilters, isLoading: beerFiltersIsLoading, error: beerFiltersError} = useGetBeersFiltersQuery(filterValues["city_id"] || 1)
    const {data: cities, isLoading: citiesIsLoading, error: citiesError} = useGetCitiesQuery()
    const [debouncedCountryInput, setDebouncedCountryInput] = useState("")
    const [debouncedStyleInput, setDebouncedStyleInput] = useState("")
    const { data: countries, countriesIsLoading, countriesError } = useGetBeerCountriesQuery({name: debouncedCountryInput !== ""? debouncedCountryInput: undefined});
    const { data: stylesFilter, stylesIsLoading, stylesError } = useGetBeerStylesQuery({name: debouncedStyleInput !== ""? debouncedStyleInput: undefined});
    const sortFilters =[
        {id: "popular", name: "Популярное"},
        {id: "price", name: "По цене"},
        {id: "rating", name: "По отзывам"},
    ]

    const resetPages = () => {
        setFilterValues((prevFilters) => ({
            ...prevFilters,
            offset: 0
        }));
        setAllCards([]);
        handleShowMore();
    }

    /*FIXME: useEffect(() => {
        if (!beerIsLoading) {
            handleShowMore();
        }
    }, [beerIsLoading]);*/

    useEffect(() => {
        if (beerFilters && !beerFiltersIsLoading && !beerFiltersError) {
            const nameMap = {};
            // Обработка beerFilters
            Object.entries(beerFilters[0]).forEach(([key, options]) => {
                nameMap[beerFilterSpecs[key]?.id || key] = options.reduce((acc, option) => {
                    acc[option.id] = `${beerFilterSpecs[key]?.title}: ${option.name}`; // Предполагается, что у опций есть `id` и `name`
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

            if (countries && !countriesIsLoading && !countriesError){
                nameMap["country_ids"] = countries.reduce((acc, country) => {
                    acc[country.id.toString()] = `Страна: ${country.name}`;
                    return acc;
                }, {});
            }

            if (stylesFilter && !stylesIsLoading && !stylesError){
                nameMap["style_ids"] = stylesFilter.reduce((acc, style) => {
                    acc[style.id.toString()] = `Стиль: ${style.name}`;
                    return acc;
                }, {});
            }

            // Обработка only_opened
            nameMap["with_reviews"] = {}// value: "Только открытые"
            setFilterNameMap(nameMap);
        }
    }, [beerFilters, beerFiltersIsLoading, beerFiltersError,
        cities, citiesIsLoading, citiesError,
        countries, countriesIsLoading, countriesError,
        stylesFilter, stylesIsLoading, stylesError]);

    // Подготовка фильтров
    const filtersConfig = useMemo(() => {
        if (!beerFilters || beerFiltersIsLoading || beerFiltersError) return [];
        return Object?.entries(beerFilters[0])?.map(([key, options]) => {
            const spec = beerFilterSpecs[key]
            return  {
                title: spec?.title || key, // Используем маппинг заголовков
                key: spec?.id || key,
                options: options || [],
                componentType: spec?.component || "",
            }
        });
    }, [beerFilters, beerFiltersIsLoading, beerFiltersError]);

    const handleFilterChange = (filterKey, value) => {
        if (multiSelectParams.includes(`${filterKey}_id`)){
            setSelectedFilters((prevState) => ({
                ...prevState,
                [`${filterKey}_id`]: [value.options.id === 0? '': value.options.id],
                [`${filterKey}_to`]: [value.options.to],
                [`${filterKey}_from`]: [value.options.from],
            }));
        }
        else{
            setSelectedFilters((prevState) => ({
                ...prevState,
                [filterKey]: Array.isArray(value.options) ? value.options : [value.options === 0? '': value.options],
            }));
        }
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
        //resetPages()
    }

    // Применение фильтров
    const applyFilters = () => {
        setFilterValues(selectedFilters);
        //resetPages()
    }

    // Сброс фильтров
    const resetFilters = () => {
        setFilterValues(initialFilters)
        setSelectedFilters(initialFilters)
        setTabResetFilters(() => {
            const newState = {};
            Object.values(beerFilterSpecs).forEach((value) => {
                newState[value.id] = {reset: true, id: 0}; // Устанавливаем значение `true` для всех фильтров
            });
            return newState;
        });
        //resetPages()
    }


    // Возвращение reset к изначальному состоянию
    useEffect(() => {
        if (tabResetFilters && Object?.values(tabResetFilters)?.some(value => value.reset === true)) {
            const timeout = setTimeout(() => {
                setTabResetFilters((prevState) => {
                    const newTabResetFilters = { ...prevState };
                    Object.values(beerFilterSpecs).forEach((value) => {
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

    const removeRangeRadioFilter = (filterName) => {
        setSelectedFilters((prev) => {
            return {
                ...prev,
                [`${filterName}_from`]: "",
                [`${filterName}_to`]: "",
            };
        });
        setFilterValues((prev) => {
            return {
                ...prev,
                [`${filterName}_from`]: "",
                [`${filterName}_to`]: "",
            }
        });
        setTabResetFilters((prev) => {
            return {
                ...prev, // Копируем текущие значения для tabAlias
                [`${filterName}_from`]: { reset: true, id: 0 }, // Обновляем abv_from
                [`${filterName}_to`]: { reset: true, id: 0 },   // Обновляем abv_to
            };
        });
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
                if (filterKey !== "with_reviews")
                    count += 1;
            }
        });
        return count;
    };

    return(
        <div className={styles.menuContainer}>
            {withHeader &&
                <div className={styles.menuHeader}>
                    <div>
                        <h2>Каталог пива</h2>
                        <p>В этом списке представлены лучшие сорта пива, выбранные на основе нашей формулы средневзвешенного рейтинга, которая позволяет объективно сравнить все напитки между собой. Чтобы попасть в этот перечень, пиво должно иметь не менее 150 отзывов. Подробнее о составлении рейтинга.</p>
                        <a>Подробнее о составлении рейтинга.</a>
                    </div>
                </div>
            }
            <div className={styles.menuContent}>
                {!isMobile && <div className={styles.menuFilters}>
                    <Search title="Поиск" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></Search>
                    <HookedFilterComboBox options={countries} isLoading={countriesIsLoading} error={countriesError} debouncedInput={debouncedCountryInput} setDebouncedInput={setDebouncedCountryInput} title={"Страна производства"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("country_ids", value)} reset={tabResetFilters["country_ids"]}/>
                    <HookedFilterComboBox options={stylesFilter} isLoading={stylesIsLoading} error={stylesError} debouncedInput={debouncedStyleInput} setDebouncedInput={setDebouncedStyleInput} title={"Стиль"}  fetchHook={useGetStylesQuery} onChange={(value) => handleFilterChange("style_ids", value)} reset={tabResetFilters["style_ids"]}/>
                    {
                        filtersConfig.map((filter) => (
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
                    <div className={styles.appliedFiltersRow}>
                        {Object.entries(filterValues).map(([filterKey, value]) => {
                            // Пропускаем пустые значения
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;
                            if (filterKey === "sort_by") return null
                            // Если значение — массив, обрабатываем каждый элемент
                            if (Array.isArray(value)) {
                                return value.map((id) => {
                                    if (multiSelectParams.includes(filterKey)){
                                        const filterName = filterKey.split("_")[0]
                                        const filterDirection = filterKey.split("_")[1]
                                        if (!filterName) return null;
                                        if (filterDirection === "id"){
                                            const filterValue = filterNameMap[filterName]?.[id]
                                            return <>
                                                {filterValue && <AppliedFilter key={`${filterKey}`} onClick={() => removeFilter(filterKey, id)}>
                                                    <p>{filterValue}</p>
                                                </AppliedFilter>}
                                            </>
                                        }
                                        else if ((filterDirection === "from")){
                                            const filterValueFrom = filterValues[`${filterName}_from`]
                                            const filterValueTo = filterValues[`${filterName}_to`]
                                            if (JSON.stringify(filterValueFrom) === '[""]' && JSON.stringify(filterValueTo) === '[""]' || JSON.stringify(filterValueFrom) === '[null]' && JSON.stringify(filterValueTo) === '[null]') return null
                                            return <>
                                                <AppliedFilter key={`${filterKey}_from`} onClick={() => removeRangeRadioFilter(filterName)}>
                                                    <p>{`${beerFilterSpecs[filterName]?.title}: ${JSON.stringify(filterValueFrom) === '[""]'? "0": filterValueFrom} - ${JSON.stringify(filterValueTo) === '[""]' ? "∞" : filterValueTo}`}</p>
                                                </AppliedFilter>
                                            </>
                                        }
                                    }
                                    else{
                                        const filterName = filterNameMap[filterKey]?.[id];
                                        if (!filterName) return null;
                                        return (
                                            <AppliedFilter key={`${filterKey}-${id}`} onClick={() => removeFilter(filterKey, id)}>
                                                <p>{filterName}</p>
                                            </AppliedFilter>
                                        );
                                    }


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
                    <div className={styles.toggleAndOptions}>
                        {isMobile && <SimpleButton textStyle={"black"} text="ФИЛЬТРЫ" onClick={() => setShowFiltersModal(true)} style="primary"></SimpleButton>}
                        {sortFilters &&  <ComboBox options={sortFilters} onChange={(value) => handleSingleFilterApply("sort_by", value.id)}></ComboBox>}
                        <Toggle reset={tabResetFilters["with_reviews"]} label={"Только с отзывами"} toggled={filterValues.with_reviews} onClick={() => handleSingleFilterApply("with_reviews", !filterValues.with_reviews)}/>
                    </div>
                    { !beerIsLoading && !beerError && beerData?.data &&
                        <SimpleCatalogSection cards={beerData?.data} CardComponent={BottledBeerCard} wideColumns={false}/>
                    }
                    {/*<SimpleCatalogSection cards={allCards} CardComponent={BottledBeerCard} wideColumns={false} totalItems={beerData?.["total_items"]} onShowMore={handleShowMore}/>*/}
                </div>
            </div>
            {isMobile &&
                <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
                    <Search title="Поиск" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></Search>
                    <HookedFilterComboBox options={countries} isLoading={countriesIsLoading} error={countriesError} debouncedInput={debouncedCountryInput} setDebouncedInput={setDebouncedCountryInput} title={"Страна производства"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("country_ids", value)} reset={tabResetFilters["country_ids"]}/>
                    <HookedFilterComboBox options={stylesFilter} isLoading={stylesIsLoading} error={stylesError} debouncedInput={debouncedStyleInput} setDebouncedInput={setDebouncedStyleInput} title={"Стиль"}  fetchHook={useGetStylesQuery} onChange={(value) => handleFilterChange("style_ids", value)} reset={tabResetFilters["style_ids"]}/>
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

BeerCatalog.propTypes = {
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