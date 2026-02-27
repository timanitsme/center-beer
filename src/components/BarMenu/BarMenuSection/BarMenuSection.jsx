import {Fragment, useEffect, useMemo, useState} from "react";
import styles from "./BarMenuSection.module.scss";
import {isMobile} from "react-device-detect";
import FilterItem from "../../ApiInputs/FilterItem/FilterItem.jsx";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../../assets/location-filled-icon.svg";
import SimpleCatalogSection from "../../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import FiltersModal from "../../Modals/FiltersModal/FiltersModal.jsx";
import {
    getBarMenuFilterSpec,
    getBarMenuInitialState,
    getBarMenuTabSpec,
    useGetBarMenuFilters
} from "../BarMenuData.js";
import SingleImageModal from "../../Modals/SingleImageModal/SingleImageModal.jsx";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import FriesIcon from "../../../assets/foodIcons/fries-icon.svg?react";
import BurgerIcon from "../../../assets/foodIcons/burger-icon.svg?react";
import SaladIcon from "../../../assets/foodIcons/salad-icon.svg?react";
import HotDogIcon from "../../../assets/foodIcons/hot-dog-icon.svg?react";
import SteakIcon from "../../../assets/foodIcons/steak-icon.svg?react";
import PastaIcon from "../../../assets/foodIcons/pasta-icon.svg?react";
import ShawarmaIcon from "../../../assets/foodIcons/shawarma-icon.svg?react";
import CheburekIcon from "../../../assets/foodIcons/cheburek-icon.svg?react";
import {useNavigate} from "react-router-dom";
import {
    useGetBarMenuAlcQuery,
    useGetBarMenuBeerQuery,
    useGetBarMenuBottleQuery, useGetBarMenuCocktailsQuery, useGetBarMenuFoodQuery
} from "../../../store/services/centerBeer.js";
import SearchInput from "../../ApiInputs/Search/SearchInput.jsx";
import beerBg from "../../../assets/bgPictures/new-products-bg.webp"
import beerBottleBg from "../../../assets/bgPictures/beer-catalog-bg.webp"
import alcoBg from "../../../assets/bgPictures/alcohol-bg.webp"
import nonAlcoBg from "../../../assets/bgPictures/non-alcohol-bg.webp"
import foodBg from "../../../assets/bgPictures/food-bg.webp"
import SearchInputAlt from "../../ApiInputs/Search/SearchInputAlt.jsx";

export default function BarMenuSection({alias, barId, tab}){
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [allCards, setAllCards] = useState([])
    const [selectedFood, setSelectedFood] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [timestamp, setTimestamp] = useState(Date.now());
    const foodIcons = {
        "Бургеры": <BurgerIcon/>,
        "Салаты": <SaladIcon/>,
        "Горячие закуски": <FriesIcon/>,
        "Хот доги": <HotDogIcon/>,
        "Гриль": <SteakIcon/>,
        "Паста": <PastaIcon/>,
        "Шаверма": <ShawarmaIcon/>,
        "Чебуреки": <CheburekIcon/>
    }
    const [foodSelectedTab, setFoodSelectedTab] = useState("")
    const tabSpec = getBarMenuTabSpec(alias)
    const navigate = useNavigate()

    // Спецификация фильтров
    const filterSpecs = getBarMenuFilterSpec(alias)



    const initialFilters = getBarMenuInitialState(alias, barId)

    // Фильтры, от изменения которых изменяется запрос
    const [filterValues, setFilterValues] = useState(initialFilters);

    // Временные фильтры (хранят выбранные значения до применения)
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);

    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.values(filterSpecs).forEach((value) => {
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
    const {data: beerData, isLoading: beerIsLoading, error: beerError, isFetching:beerIsFetching, reset: beerReset} = useGetBarMenuBeerQuery({ ...filterValues, ts: timestamp }, { skip: alias !== "beer" })
    const {data: bottleData, isLoading: bottleIsLoading, error: bottleError, isFetching: bottleIsFetching, reset: bottleReset} = useGetBarMenuBottleQuery({ ...filterValues, ts: timestamp }, {skip: alias !== "beer_bottle"})
    const {data: alcData, isLoading: alcIsLoading, error: alcError, isFetching: alcIsFetching, reset: alcReset} = useGetBarMenuAlcQuery({ ...filterValues, ts: timestamp }, {skip: alias !== "alc"})
    const {data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError, isFetching: cocktailsIsFetching, reset: cocktailsReset} = useGetBarMenuCocktailsQuery({ ...filterValues, ts: timestamp }, {skip: alias !== "cocktails"})
    const {data: foodData, isLoading: foodIsLoading, error: foodError, isFetching: foodIsFetching, reset: foodReset} = useGetBarMenuFoodQuery({ ...filterValues, ts: timestamp }, {skip: alias !== "food"})
    const data = {
        "beer": {data: beerData, isFetching: beerIsFetching, bg: beerBg},
        "beer_bottle": {data: bottleData, isFetching: bottleIsFetching, bg: beerBottleBg},
        "alc": {data: alcData, isFetching: alcIsFetching, bg: alcoBg},
        "cocktails": {data: cocktailsData, isFetching: cocktailsIsFetching, bg: nonAlcoBg},
        "food": {data: foodData, isFetching: foodIsFetching, bg: foodBg}
    }
    //const {data: data, isLoading: dataIsLoading, isFetching: dataIsFetching, error: dataError } = useGetBarMenuData(alias, filterValues, {skip: !filterValues});
    const {data: dataFilters, isLoading: dataFiltersIsLoading, error: dataFiltersError} = useGetBarMenuFilters(alias, barId)

    // Эффект, собирающий все карточки, полученные при выполнении соответствующего запроса
    useEffect(() => {
        if (!data[alias].isFetching && data[alias].data?.data){
            if (filterValues["offset"] !== 0){
                setAllCards(prev => [
                    ...prev,
                    ...data[alias].data.data.filter(newCard =>
                        !prev.some(existingCard => existingCard.name === newCard.name)
                    )
                ]);
            }
            else{
                setAllCards([...data[alias].data.data])
            }
        }

    }, [data[alias].isFetching]);

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
        if (dataFilters && !dataFiltersIsLoading && !dataFiltersError) {
            const nameMap = {};
            // Обработка beerFilters
            Object.entries(dataFilters[0]).forEach(([key, options]) => {
                nameMap[filterSpecs[key]?.id || key] = options.reduce((acc, option) => {
                    acc[option.id] = `${filterSpecs[key]?.title}: ${option.name}`; // Предполагается, что у опций есть `id` и `name`
                    return acc;
                }, {});
            });
            // Обработка only_opened
            nameMap["with_reviews"] = {}// value: "Только открытые"
            setFilterNameMap(nameMap);
        }
    }, [dataFilters, dataFiltersIsLoading, dataFiltersError]);

    // Подготовка фильтров
    const filtersConfig = useMemo(() => {
        if (!dataFilters || dataFiltersIsLoading || dataFiltersError) return [];
        return Object?.entries(dataFilters[0])?.map(([key, options]) => {
            const spec = filterSpecs[key]
            return  {
                title: spec?.title || key, // Используем маппинг заголовков
                key: spec?.id || key,
                options: options || [],
                componentType: spec?.component || "",
            }
        });
    }, [dataFilters, dataFiltersIsLoading, dataFiltersError]);

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
            ["offset"]: 0,
        }));
        setFilterValues((prevState) => ({
            ...prevState,
            [filterKey]: value,
            ["offset"]: 0,
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
    };

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
        setAllCards([]);
        setFilterValues(initialFilters);
        setSelectedFilters(initialFilters);
        setTimestamp(Date.now());
        setTabResetFilters(() => {
            const newState = {};
            Object.values(filterSpecs).forEach((value) => {
                newState[value.id] = { reset: true, id: 0 };
            });
            return newState;
        });
    };


    // Возвращение reset к изначальному состоянию
    useEffect(() => {
        if (tabResetFilters && Object?.values(tabResetFilters)?.some(value => value.reset === true)) {
            const timeout = setTimeout(() => {
                setTabResetFilters((prevState) => {
                    const newTabResetFilters = { ...prevState };
                    Object.values(filterSpecs).forEach((value) => {
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
                    ["offset"]: 0,
                };
            } else {
                // Сбрасываем не массивное значение
                return {
                    ...prev,
                    [filterKey]: "",
                    ["offset"]: 0,
                };
            }

        });
        setSelectedFilters((prev) => {
            const currentValue = prev[filterKey];
            if (Array.isArray(currentValue)) {
                return {
                    ...prev,
                    [filterKey]: currentValue.filter((id) => id !== idToRemove),
                    ["offset"]: 0,
                };
            } else {
                return {
                    ...prev,
                    [filterKey]: "",
                    ["offset"]: 0,
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
                ["offset"]: 0,
            };
        });
        setFilterValues((prev) => {
            return {
                ...prev,
                [`${filterName}_from`]: "",
                [`${filterName}_to`]: "",
                ["offset"]: 0,
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
        <>
            <div className={styles.menuContent} style={{backgroundImage: `url(${data[alias].bg})`, backgroundRepeat: 'no-repeat'}}>
                {!isMobile && <div className={styles.menuFilters}>
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
                    <div className={styles.menuSection}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionDescriptionIcon}><tabSpec.Icon/></div>
                            <div className={styles.sectionDescription}>
                                <div className={styles.headerAndButton}>
                                    <h2 className="ma-h2">{tab?.header}</h2>
                                    {!isMobile && <div className={`${styles.sectionButton} ${styles.mobileOff}` }><IconButton onClick={() => navigate("/in-dev")} text="Забронировать стол"><tabSpec.Icon/></IconButton></div>}
                                </div>
                                <p className="ma-p" style={{maxWidth: "80%"}}>{tab?.description}</p>
                            </div>



                        </div>
                        {isMobile && <div className={styles.mobileButtons}>
                            <SimpleButton textStyle={"black"} text="ФИЛЬТРЫ" onClick={() => setShowFiltersModal(true)} style="primary"></SimpleButton>
                            <div className={styles.sectionButton}><IconButton onClick={() => navigate("/in-dev")} text="Забронировать стол"><tabSpec.Icon/></IconButton></div>
                        </div>}
                        <div style={{height: "12px"}}></div>
                        <SearchInputAlt title="Поиск по названию" onChange={(value) => {handleSingleFilterChange("name", value)}} reset={tabResetFilters["name"]} onApply={(value) => applyFiltersWithName(value)}></SearchInputAlt>
                        { alias === "food" && <div className={styles.appliedFiltersRow} style={{marginBottom: "0px"}}>
                            {data?.[alias]?.data && Object.keys(data?.[alias]?.data)?.map((tabNum, index) => {
                                return(
                                    <IconButton style={tabNum === foodSelectedTab? "primary-third": "third-primary"} key={index} text={data[alias].data[tabNum]?.name} onClick={() => {if (tabNum !== foodSelectedTab) setFoodSelectedTab(tabNum); else setFoodSelectedTab("")}}>{foodIcons[data[alias].data[tabNum]?.name] || <FriesIcon/>}</IconButton>
                                )
                            })}
                        </div>}
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
                                                    <p>{`${filterSpecs[filterName]?.title}: ${JSON.stringify(filterValueFrom) === '[""]'? "0": filterValueFrom} - ${JSON.stringify(filterValueTo) === '[""]' ? "∞" : filterValueTo}`}</p>
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
                    {data?.[alias]?.data && alias === "food" && Object.keys(data[alias].data)?.map((tabNum, index) => {
                        if (foodSelectedTab === "" || foodSelectedTab === tabNum){
                            return(
                                <Fragment key={index}>
                                    <div key={index} className={`${styles.sectionDescription} ${styles.row}`}>
                                        <h2 className="ma-h2">{data[alias].data[tabNum]?.name}</h2>
                                    </div>
                                    <div className={tabSpec.wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                                        {data[alias].data[tabNum]?.menu && data[alias].data[tabNum]?.menu?.length > 0 && data[alias].data[tabNum]?.menu?.map((cardInfo, index) => <tabSpec.CardComponent key={index} cardInfo={cardInfo} onShowModal={(image) => {setSelectedFood(image); setShowModal(true)}}/>)}
                                    </div>
                                </Fragment>
                            )
                        }
                    })}
                    {alias !== "food" && <SimpleCatalogSection isFetching={data[alias].isFetching} lim={filterValues["lim"]} SkeletonCardComponent={tabSpec.SkeletonCard} cards={allCards} CardComponent={tabSpec.CardComponent} wideColumns={tabSpec.wideColumns} totalItems={data[alias].data?.["total_items"]} onShowMore={handleShowMore}/>}
                </div>
            </div>
            {isMobile &&
                <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
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
            <SingleImageModal src={selectedFood} setSrc={setSelectedFood} setShow={setShowModal} show={showModal}/>
            </div>
        </>
    )
}