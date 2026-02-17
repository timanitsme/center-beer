import styles from "./BarsCatalog.module.scss";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PropTypes from "prop-types";
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import BarCard from "../Cards/BarCard/BarCard.jsx";
import ComboBox from "../ApiInputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import {useEffect, useMemo, useState} from "react";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import {
    useGetBarsFiltersQuery,
    useGetBarsQuery,
    useGetCitiesQuery
} from "../../store/services/centerBeer";
import {useNavigate} from "react-router-dom";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import SearchCities from "../ApiInputs/Search/SearchCities.jsx";
import FiltersModal from "../Modals/FiltersModal/FiltersModal.jsx";
import {isMobile} from "react-device-detect";
import SingleCheckBox from "../ApiInputs/CheckBox/SingleCheckBox.jsx";
import BarCardSkeleton from "../Skeletons/BarCardSkeleton/BarCardSkeleton.jsx";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";
import contactsBg from "../../assets/bgPictures/contacts-bg.webp"
import SearchInputAlt from "../ApiInputs/Search/SearchInputAlt.jsx";
import Ad from "../../../src/assets/adsMocks/ad-1.svg"
import Ad1 from "../../../src/assets/adsMocks/ad-banner-1.webp"
import Ad2 from "../../../src/assets/adsMocks/ad-banner-2.webp"

export default function BarsCatalog(){
    const navigate = useNavigate()
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [timestamp, setTimestamp] = useState(Date.now());

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
        sort_by: {title: "Сортировка", id: "sort_by"},
        online_booking: {title: "Онлайн бронирование", id: "online_booking"}
    }

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState({
        lim: 24,
        offset: 0,
        city_id: '',
        name: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        price_ids: [],
        type_ids: [],
        feature_ids: [],
        only_opened: false,
        online_booking: false,
        sort_by: "popular"
    });

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState({
        city_id: '',
        name: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        price_ids: [],
        type_ids: [],
        feature_ids: [],
        only_opened: false,
        online_booking: false,
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
    const {data: barsData, isLoading: barsIsLoading, error: barsError, isFetching: barsIsFetching } = useGetBarsQuery({ ...filterValues, ts: timestamp });
    const {data: barFilters, isLoading: barFiltersIsLoading, error: barFiltersError} = useGetBarsFiltersQuery(filterValues["city_id"] || 1)
    const {data: cities, isLoading: citiesIsLoading, error: citiesError} = useGetCitiesQuery({})
    const sortFilters =[
        {id: "popular", name: "Популярное"},
        {id: "price", name: "По цене"},
        {id: "rating", name: "По отзывам"},
    ]

    // Эффект, собирающий все карточки, полученные при выполнении соответствующего запроса
    useEffect(() => {
        if (!barsIsFetching && barsData?.data){
            if (filterValues["offset"] !== 0){
                setAllCards(prev => [
                    ...prev,
                    ...barsData.data.filter(newCard =>
                        !prev.some(existingCard => existingCard.id === newCard.id)
                    )
                ]);
            }
            else{
                setAllCards([...barsData.data])
            }
        }

    }, [barsIsFetching]);

    const handleShowMore = () => {
        const newOffset = filterValues["offset"] + filterValues["lim"];
        setSelectedFilters((prevState) => ({
            ...prevState,
            [`offset`]: newOffset,
        }));
        setFilterValues((prevState) => ({
            ...prevState,
            [`offset`]: newOffset,
        }));
    }

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
            nameMap["only_opened"] = "Открыто сейчас"
            nameMap["online_booking"] = `Онлайн-бронь`
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
            ["offset"]: 0
        }));
        setFilterValues((prevState) => ({
            ...prevState,
            [filterKey]: value,
            ["offset"]: 0
        }));
        setTimestamp(Date.now());
    }

    // Применение фильтров
    const applyFilters = () => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            ["offset"]: 0,
        }));
        setFilterValues(() => ({
            ...selectedFilters,
            ["offset"]: 0,
        }));
        setTimestamp(Date.now());
    }

    const applyFiltersWithName = (currentName) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            ["name"]: currentName,
            ["offset"]: 0,
        }));
        setFilterValues(() => ({
            ...selectedFilters,
            ["name"]: currentName,
            ["offset"]: 0,
        }));
        setTimestamp(Date.now());
    }

    // Сброс фильтров
    const resetFilters = () => {

        const initialState = {
            lim: 24,
            name: '',
            offset: 0,
            city_id: '',
            subways_ids: [],
            kitchen_ids: [],
            visit_type_ids: [],
            price_ids: [],
            type_ids: [],
            feature_ids: [],
            only_opened: false,
            online_booking: false,
            sort_by: "popular"
        };
        setFilterValues(initialState)
        setSelectedFilters(initialState)
        setTimestamp(Date.now());
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
                    ["offset"]: 0
                };
            } else {
                // Сбрасываем не массивное значение
                return {
                    ...prev,
                    [filterKey]: "",
                    ["offset"]: 0
                };
            }

        });
        setSelectedFilters((prev) => {
            const currentValue = prev[filterKey];
            if (Array.isArray(currentValue)) {
                return {
                    ...prev,
                    [filterKey]: currentValue.filter((id) => id !== idToRemove),
                    ["offset"]: 0
                };
            } else {
                return {
                    ...prev,
                    [filterKey]: "",
                    ["offset"]: 0
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
        <div className={styles.wrapper} style={{backgroundImage: `url(${contactsBg})`, backgroundRepeat: 'no-repeat'}}>
            <div className={styles.menuContainer}>
                <div className={styles.menuHeader}>
                    <div className={styles.catalogHeader}>
                        <div className={styles.justy}>
                            <h2 className="ma-h2">Каталог баров</h2>
                            <div className={styles.forSvg}>
                                <IconButton text="Все бары на карте" onClick={() => navigate("/map")}><LocationIcon/></IconButton>
                            </div>
                        </div>
                        <p className="ma-p">Собрали для вас список лучших пивных баров, где можно насладиться свежесваренным пивом, закусками и уютной атмосферой. От классических пабов до оригинальных крафтовых баров — каждый найдет место по вкусу.</p>
                    </div>
                </div>
                <div className={styles.menuContent}>
                    {!isMobile && <div className={styles.menuFilters}>
                        <SearchCities title="Город" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></SearchCities>
                        <SingleCheckBox text="Онлайн-бронь" onChange={(value) => {handleSingleFilterChange("online_booking", value)}} reset={tabResetFilters["online_booking"]}></SingleCheckBox>
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
                        <SearchInputAlt title="Поиск по названию" onChange={(value) => {handleSingleFilterChange("name", value)}} reset={tabResetFilters["name"]} onApply={(value) => applyFiltersWithName(value)}></SearchInputAlt>
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

                                if (typeof value === "boolean" && filterKey !== "only_opened"){
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
                            {sortFilters &&  <ComboBox options={sortFilters} onChange={(value) => handleSingleFilterApply("sort_by", value.id)}></ComboBox>}
                            <Toggle reset={tabResetFilters["only_opened"]} label={"Только открытые"} toggled={filterValues.only_opened} onClick={() => handleSingleFilterApply("only_opened", !filterValues.only_opened)}/>

                        </div>
                        <SimpleCatalogSection alias={"bars"} isFetching={barsIsFetching} lim={filterValues["lim"]} totalItems={barsData?.["total_items"]} onShowMore={handleShowMore} cards={allCards} CardComponent={BarCard} SkeletonCardComponent={BarCardSkeleton} wideColumns={false}/>
                    </div>
                </div>
                {isMobile &&
                    <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
                        <SearchCities title="Город" reset={tabResetFilters["city_id"]} onChange={(value) => handleSingleFilterChange("city_id", value)}></SearchCities>
                        <SingleCheckBox text="Онлайн-бронь" onChange={(value) => {handleSingleFilterChange("online_booking", value)}} reset={tabResetFilters["online_booking"]}/>
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
            <div className={styles.banner}>
                <img src={Ad1} alt=""/>
                <img src={Ad2} alt=""/>
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