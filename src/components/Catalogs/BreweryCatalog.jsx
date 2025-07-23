import {useEffect, useMemo, useState} from "react";
import styles from "./BarsCatalog.module.scss";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import Toggle from "../Toggle/Toggle.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import PropTypes from "prop-types";
import BreweryCard from "../Cards/BreweryCard/BreweryCard.jsx";
import {
    useGetBeerCountriesQuery,
    useGetBreweriesFiltersQuery,
    useGetBreweriesQuery, useGetBreweryTypesQuery,
    useGetCitiesQuery, useGetCountriesQuery
} from "../../store/services/centerBeer.js";
import {isMobile} from "react-device-detect";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import FiltersModal from "../Modals/FiltersModal/FiltersModal.jsx";
import HookedFilterComboBox from "../ApiInputs/FilterComboBox/HookedFilterComboBox.jsx";
import SingleCheckBox from "../ApiInputs/CheckBox/SingleCheckBox.jsx";
import ComboBox from "../ApiInputs/ComboBox/ComboBox.jsx";
import {FaSortAmountDown, FaSortAmountUp} from "react-icons/fa";
import SortDirection from "../ApiInputs/SortDirectionButton/SortDirection.jsx";
import BreweryCardSkeleton from "../Skeletons/BreweryCardSkeleton/BreweryCardSkeleton.jsx";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";

export default function BreweryCatalog({filters = [], filterButtons = [], sections = []}){
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [isLoadingMore, setIsLoadingMore] = useState(false);



    // TODO:
    // Спецификация фильтров
    const breweryFilterSpecs = {
        is_open: {title: "Только открытые", id: "is_open"},
        is_new: {title: "Только новые", id: "is_new"},
        colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
        abv: {title: "Алкоголь", component: "rangeRadio", id: "abv"},
        abv_from: {title: "Алкоголь от", id: "abv_from"},
        abv_to: {title: "Алкоголь до", id: "abv_to"},
        og: {title: "Плотность", component: "rangeRadio", id: "og"},
        og_from: {title: "Плотность от", id: "og_from"},
        og_to: {title: "Плотность до", id: "og_to"},
        ibu: {title: "Горечь", component: "rangeRadio", id: "ibu"},
        ibu_from: {title: "Горечь от", id: "ibu_from"},
        ibu_to: {title: "Горечь до", id: "ibu_to"},
        country_id: {title: "Страна", id: "country_id"},
        type_id: {title: "Тип пивоварни", id: "type_id"},
        order_by: {title: "Сортировка", id: "order_by"},
        order_asc_desc: {title: "Направление сортировки", id: "order_asc_desc"}
    }

    const initialFilters = {
        is_open: false,
        is_new: false,
        country_id: [],
        city_id: [],
        type_id: [],
        order_by: 'name',
        order_asc_desc: 'asc',
    }

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState(initialFilters);

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);

    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.values(breweryFilterSpecs).forEach((value) => {
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
    const [debouncedTypeInput, setDebouncedTypeInput] = useState("")
    const { data: types, typesIsLoading, typesError } = useGetBreweryTypesQuery({name: debouncedTypeInput !== ""? debouncedTypeInput: undefined});
    const [debouncedCountryInput, setDebouncedCountryInput] = useState("")
    const { data: countries, countriesIsLoading, countriesError } = useGetCountriesQuery({name: debouncedCountryInput !== ""? debouncedCountryInput: undefined});
    const {data: breweriesData, isLoading: breweriesIsLoading, isFetching: breweriesIsFetching, error: breweriesError } = useGetBreweriesQuery(filterValues);
    const {data: breweriesFilters, isLoading: breweriesFiltersIsLoading, error: breweriesFiltersError} = useGetBreweriesFiltersQuery()
    const {data: cities, isLoading: citiesIsLoading, error: citiesError} = useGetCitiesQuery({})

    //TODO:
    const sortFilters =[
        {id: "name", name: "По названию"},
        {id: "rating", name: "По рейтингу"},
    ]

    const sortDirectionFilters = [
        {id: "asc", Icon: FaSortAmountUp, name: "По возрастанию"},
        {id: "desc", Icon: FaSortAmountDown, name: "По убыванию"}
    ]


    useEffect(() => {
        if (breweriesFilters && !breweriesFiltersIsLoading && !breweriesFiltersError) {
            const nameMap = {};
            // Обработка beerFilters
            Object.entries(breweriesFilters[0]).forEach(([key, options]) => {
                nameMap[breweryFilterSpecs[key]?.id || key] = options.reduce((acc, option) => {
                    acc[option.id] = `${breweryFilterSpecs[key]?.title}: ${option.name}`; // Предполагается, что у опций есть `id` и `name`
                    return acc;
                }, {});
            });

            //TODO: разобраться с теми фильтрами, которые я добавляю сам
            // Обработка cities
            if (cities && !citiesIsLoading && !citiesError) {
                nameMap["city_id"] = cities.reduce((acc, city) => {
                    acc[city.id.toString()] = `Город: ${city.name}`; // Предполагается, что у городов есть `id` и `name`
                    return acc;
                }, {});
            }

            if (types && !typesIsLoading && !typesError){
                nameMap["type_id"] = types.reduce((acc, type) => {
                    acc[type.id.toString()] = `Страна: ${type.name}`;
                    return acc;
                }, {});
            }

            if (countries && !countriesIsLoading && !countriesError){
                nameMap["country_id"] = countries.reduce((acc, country) => {
                    acc[country.id.toString()] = `Страна: ${country.name}`;
                    return acc;
                }, {});
            }

            // Обработка only_opened
            nameMap["is_open"] = {}// value: "Только открытые"
            nameMap["is_new"] = `Новые заведения`// value: "Только открытые"
            setFilterNameMap(nameMap);
        }
    }, [breweriesFilters, breweriesFiltersIsLoading, breweriesFiltersError, cities, citiesIsLoading, citiesError]);

    // Подготовка фильтров
    const filtersConfig = useMemo(() => {
        if (!breweriesFilters || breweriesFiltersIsLoading || breweriesFiltersError) return [];
        return Object?.entries(breweriesFilters[0])?.map(([key, options]) => {
            const spec = breweryFilterSpecs[key]
            return  {
                title: spec?.title || key, // Используем маппинг заголовков
                key: spec?.id || key,
                options: options || [],
                componentType: spec?.component || "",
            }
        });
    }, [breweriesFilters, breweriesFiltersIsLoading, breweriesFiltersError]);

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
    }

    // Применение фильтров
    const applyFilters = () => {
        setFilterValues(selectedFilters);
    }

    // Сброс фильтров
    const resetFilters = () => {
        setFilterValues(initialFilters)
        setSelectedFilters(initialFilters)
        setTabResetFilters(() => {
            const newState = {};
            Object.values(breweryFilterSpecs).forEach((value) => {
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
                    Object.values(breweryFilterSpecs).forEach((value) => {
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
                if (filterKey !== "order_by" && filterKey !== "order_asc_desc")
                    count += 1;
            } else if (typeof value === "boolean" && value) {
                if (filterKey !== "is_open" && filterKey !== "is_new")
                    count += 1;
            }
        });
        return count;
    };

    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <div>
                    <h2 className="ma-h2">Каталог пивоварен</h2>
                    <p className="ma-p">Собрали для вас список лучших пивоварен, где можно не только насладиться свежесваренным пивом, приготовленным на месте, но и узнать процесс его создания. Здесь вы найдете разнообразные закуски и уютную атмосферу. От традиционных пивоварен до современных крафтовых мастерских — каждый сможет найти место, которое придется по душе.</p>
                </div>
            </div>
            <div className={styles.menuContent}>
                {!isMobile && <div className={styles.menuFilters}>
                    <SearchInput title="Поиск по названию" onChange={() => {}}></SearchInput>
                    <HookedFilterComboBox options={types} isLoading={typesIsLoading} error={typesError} debouncedInput={debouncedTypeInput} setDebouncedInput={setDebouncedTypeInput} title={"Тип"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("type_id", value)} reset={tabResetFilters["type_id"]}/>
                    <HookedFilterComboBox options={countries} isLoading={countriesIsLoading} error={countriesError} debouncedInput={debouncedCountryInput} setDebouncedInput={setDebouncedCountryInput} title={"Страна"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("country_id", value)} reset={tabResetFilters["country_id"]}/>
                    <SingleCheckBox text="Только недавно открытые" onChange={(value) => {handleSingleFilterChange("is_new", value)}} reset={tabResetFilters["is_new"]}/>
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
                    <div className={styles.appliedFiltersRow}>
                        {Object.entries(filterValues).map(([filterKey, value]) => {
                            // Пропускаем пустые значения
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;
                            if (filterKey === "order_by" || filterKey === "order_asc_desc") return null
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
                                                    <p>{`${breweryFilterSpecs[filterName]?.title}: ${JSON.stringify(filterValueFrom) === '[""]'? "0": filterValueFrom} - ${JSON.stringify(filterValueTo) === '[""]' ? "∞" : filterValueTo}`}</p>
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

                            if (typeof value === "boolean" && filterKey !== "is_open"){
                                if (filterNameMap[filterKey]){
                                    return (
                                        <AppliedFilter key={filterKey} onClick={() => removeFilter(filterKey, value)}>
                                            <p>{filterNameMap[filterKey]}</p>
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
                        {sortFilters &&  <ComboBox options={sortFilters} onChange={(value) => handleSingleFilterApply("order_by", value.id)}></ComboBox>}
                        {sortDirectionFilters && <SortDirection options={sortDirectionFilters} onChange={(value) => handleSingleFilterApply("order_asc_desc", value.id)}/>}
                        <Toggle reset={tabResetFilters["is_open"]} label={"Только открытые"} toggled={filterValues.is_open} onClick={() => handleSingleFilterApply("is_open", !filterValues.is_open)}/>
                    </div>
                    <SimpleCatalogSection alias="distributors" cards={breweriesData?.data} CardComponent={BreweryCard} wideColumns={true} isFetching={breweriesIsFetching} SkeletonCardComponent={BreweryCardSkeleton} lim={25} totalItems={breweriesData?.["total_items"]}/>
                </div>
            </div>
            {isMobile &&
                <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
                    <SearchInput title="Поиск по названию" onChange={() => {}}></SearchInput>
                    <HookedFilterComboBox options={types} isLoading={typesIsLoading} error={typesError} debouncedInput={debouncedTypeInput} setDebouncedInput={setDebouncedTypeInput} title={"Тип"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("type_id", value)} reset={tabResetFilters["type_id"]}/>
                    <HookedFilterComboBox options={countries} isLoading={countriesIsLoading} error={countriesError} debouncedInput={debouncedCountryInput} setDebouncedInput={setDebouncedCountryInput} title={"Страна"}  fetchHook={useGetBeerCountriesQuery} onChange={(value) => handleFilterChange("country_id", value)} reset={tabResetFilters["country_id"]}/>
                    <SingleCheckBox text="Только недавно открытые" onChange={(value) => {handleSingleFilterChange("is_new", value)}} reset={tabResetFilters["is_new"]}/>
                    {filtersConfig.map((filter) => (
                        <FilterItem
                            key={filter.key}
                            filter={filter}
                            onChange={(value) => handleFilterChange(filter.key, value)}
                            reset={tabResetFilters[filter.key]}
                        />
                    ))}
                    <SimpleButton text="Применить фильтры" onClick={applyFilters}></SimpleButton>
                </FiltersModal>
            }
        </div>
    )
}

BreweryCatalog.propTypes = {
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