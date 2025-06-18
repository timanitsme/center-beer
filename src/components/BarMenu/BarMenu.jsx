import styles from "./BarMenu.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
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
import {Fragment, useEffect, useMemo, useState} from "react";
import DraftBeerCard from "../Cards/DraftBeerCard/DraftBeerCard.jsx";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import StrongAlcoholCard from "../Cards/StrongAlcoCard/StrongAlcoholCard.jsx";
import ProductCard from "../Cards/ProductCard/ProductCard.jsx";
import FilterItem from "../ApiInputs/FilterItem/FilterItem.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import {isMobile} from "react-device-detect";
import FiltersModal from "../Modals/FiltersModal/FiltersModal.jsx";
import Search from "../ApiInputs/Search/Search.jsx";
import BurgerIcon from "../../assets/foodIcons/burger-icon.svg?react";
import CheburekIcon from "../../assets/foodIcons/cheburek-icon.svg?react";
import FriesIcon from "../../assets/foodIcons/fries-icon.svg?react";
import HotDogIcon from "../../assets/foodIcons/hot-dog-icon.svg?react";
import PastaIcon from "../../assets/foodIcons/pasta-icon.svg?react";
import SaladIcon from "../../assets/foodIcons/salad-icon.svg?react"
import ShawarmaIcon from "../../assets/foodIcons/shawarma-icon.svg?react"
import SteakIcon from "../../assets/foodIcons/steak-icon.svg?react";
import {useNavigate} from "react-router-dom";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import DraftBeerCardSkeleton from "../Skeletons/DraftBeerCardSkeleton/DraftBeerCardSkeleton.jsx";
import BottledBeerCardSkeleton from "../Skeletons/BottledBeerCardSkeleton/BottledBeerCardSkeleton.jsx";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton.jsx";
import SingleImageModal from "../Modals/SingleImageModal/SingleImageModal.jsx";



export default function BarMenu({filters, filterButtons, sections, ref, barId = 1}){
    // Состояние для хранения имен применяемых фильтров
    const [filterNameMap, setFilterNameMap] = useState({});
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [resetOneFilter, setResetOneFilter] = useState("")
    const navigate = useNavigate()
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
    const [selectedFood, setSelectedFood] = useState(null)
    const [showModal, setShowModal] = useState(false)
    // Получение всех вкладок
    const {data: tabs, isLoading: tabsIsLoading, error: tabsError} = useGetBarMenuTabsQuery(barId)
    const [foodSelectedTab, setFoodSelectedTab] = useState("")

    const [selectedTab, setSelectedTab] = useState("")

    // Получение всех фильтров с api
    const beerFilters = useGetBarMenuBeerFiltersQuery(barId, {skip: selectedTab !== "beer"})
    const bottleFilters = useGetBarMenuBottleFiltersQuery(barId, {skip: selectedTab !== "beer_bottle"})
    const alcFilters = useGetBarMenuAlcFiltersQuery(barId, {skip: selectedTab !== "alc"})
    const cocktailsFilters = useGetBarMenuCocktailsFiltersQuery(barId, {skip: selectedTab !== "cocktails"})
    const foodFilters = useGetBarMenuFoodFiltersQuery(barId, {skip: selectedTab !== "food"})
    const [isSettingNewCards, setIsSettingNewCards] = useState(false)

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

    const [allCards, setAllCards] = useState([])
    // Получение данных товаров по заданным фильтрам
    const {data: beerData, isLoading: beerIsLoading, error: beerError, isFetching:beerIsFetching, reset: beerReset} = useGetBarMenuBeerQuery(tabFilterValues.beer, {skip: selectedTab !== "beer"})
    const {data: bottleData, isLoading: bottleIsLoading, error: bottleError, isFetching: bottleIsFetching, reset: bottleReset} = useGetBarMenuBottleQuery(tabFilterValues.beer_bottle, {skip: selectedTab !== "beer_bottle"})
    const {data: alcData, isLoading: alcIsLoading, error: alcError, isFetching: alcIsFetching, reset: alcReset} = useGetBarMenuAlcQuery(tabFilterValues.alc, {skip: selectedTab !== "alc"})
    const {data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError, isFetching: cocktailsIsFetching, reset: cocktailsReset} = useGetBarMenuCocktailsQuery(tabFilterValues.cocktails, {skip: selectedTab !== "cocktails"})
    const {data: foodData, isLoading: foodIsLoading, error: foodError, isFetching: foodIsFetching, reset: foodReset} = useGetBarMenuFoodQuery(tabFilterValues.food, {skip: selectedTab !== "food"})

    // Спецификация вкладок
    const tabsSpecs = useMemo(() => {
        const specs = {
            beer: {icon: BeerTapIcon, hook: useGetBarMenuBeerQuery, wideColumns: false, filterTitle: "На кранах", CardComponent: DraftBeerCard, SkeletonCard: DraftBeerCardSkeleton, data: beerData, isLoading: beerIsLoading, error: beerError, reset: beerReset, isFetching: beerIsFetching, filters: beerFilters, filterValues: tabFilterValues.beer, selectedFilters: tabSelectedFilters.beer },
            beer_bottle: {icon: BottlesPairIcon, hook: useGetBarMenuBottleQuery, wideColumns: false, filterTitle: "Фасованное пиво", CardComponent: BottledBeerCard, SkeletonCard: BottledBeerCardSkeleton, data: bottleData, isLoading: bottleIsLoading, error: bottleError, reset: bottleReset, isFetching: bottleIsFetching, filters: bottleFilters, filterValues: tabFilterValues.beer_bottle, selectedFilters: tabSelectedFilters.beer_bottle},
            alc: {icon: AlcoBottleIcon, hook: useGetBarMenuAlcQuery, wideColumns: false, filterTitle: "Крепкий алкоголь", CardComponent: StrongAlcoholCard, SkeletonCard: BottledBeerCardSkeleton, data: alcData, isLoading: alcIsLoading, error: alcError, reset: alcReset, isFetching: alcIsFetching, filters: alcFilters, filterValues: tabFilterValues.alc, selectedFilters: tabSelectedFilters.alc},
            cocktails: {icon: CoctailIcon, hook: useGetBarMenuCocktailsQuery, wideColumns: true, filterTitle: "Безалкогольные напитки", CardComponent: ProductCard, SkeletonCard: ProductCardSkeleton, data: cocktailsData, isLoading: cocktailsIsLoading, error: cocktailsError, reset: cocktailsReset, isFetching: cocktailsIsFetching, filters: cocktailsFilters, filterValues: tabFilterValues.cocktails, selectedFilters: tabSelectedFilters.cocktails},
            food: {icon: MeatIcon, hook: useGetBarMenuFoodQuery, wideColumns: true, filterTitle: "Еда", CardComponent: ProductCard, SkeletonCard: ProductCardSkeleton, data: foodData, isLoading: foodIsLoading, error: foodError, reset: foodReset, isFetching: foodIsFetching, filters: foodFilters},
            //tincture: {icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Настойки", CardComponent: ProductCard}
        }
        Object.keys(specs).forEach((key)=>{
            specs[key].filterSpec = filterSpecs[key] && filterSpecs[key]
            specs[key].initialState = initialStates[key] && initialStates[key]
        })
        return specs
    }, [beerData, beerIsLoading, beerError, beerReset, beerIsFetching, beerFilters, bottleData, bottleIsLoading, bottleError, bottleReset,
        bottleIsFetching, bottleFilters, alcData, alcIsLoading, alcError, alcReset, alcIsFetching, alcFilters, cocktailsData, cocktailsIsLoading,
        cocktailsError, cocktailsReset, cocktailsIsFetching, cocktailsFilters, foodData, foodIsLoading, foodError, foodReset, foodIsFetching, foodFilters, filterSpecs,
        initialStates
    ])

    // FIXME: Reset
    // Состояние для сброса фильтров конкретной вкладки (а именно для сброса галочек, т.е. визуально выбранных фильтров)
    const [tabResetFilters, setTabResetFilters] = useState(() => {
        const resetFiltersStates = {};
        Object.keys(filterSpecs).forEach((alias) => {
            resetFiltersStates[alias] = {};
            Object.values(filterSpecs[alias]).forEach((value) => {
                resetFiltersStates[alias][value.id] = {reset: false, id: 0};
            });
        });
        return resetFiltersStates;
    });


    // Эффект, собирающий все карточки, полученные при выполнении соответствующего запроса
    useEffect(() => {
        if (tabsSpecs?.[selectedTab] && selectedTab !== "food") {
            if (tabFilterValues[selectedTab].offset === 0) {
                setAllCards([]);
            }
            if (!tabsSpecs?.[selectedTab]?.isFetching && tabsSpecs?.[selectedTab]?.data){
                if (tabFilterValues[selectedTab]["offset"] !== 0){
                    setAllCards(prev => [
                        ...prev,
                        ...tabsSpecs[selectedTab].data.data.filter(newCard =>
                            !prev.some(existingCard => existingCard.id === newCard.id)
                        )
                    ]);
                }
                else{
                    setAllCards([...tabsSpecs[selectedTab].data.data])
                }
            }
        }

    }, [tabsSpecs?.[selectedTab]?.isFetching, selectedTab, tabFilterValues[selectedTab]]);

    useEffect(() => {
        setAllCards([]);

        setTabSelectedFilters(prev => ({
            ...prev,
            [selectedTab]: {
                ...prev[selectedTab],
                offset: 0
            }
        }));

        setTabFilterValues(prev => ({
            ...prev,
            [selectedTab]: {
                ...prev[selectedTab],
                offset: 0
            }
        }));
    }, [selectedTab]);

    const handleShowMore = () => {
        const newOffset = tabFilterValues[selectedTab]["offset"] + tabFilterValues[selectedTab]["lim"];
        setTabSelectedFilters((prevState) => ({
            ...prevState,
            [selectedTab]: {
                ...prevState[selectedTab],
                [`offset`]: newOffset,
            },
        }));
        setTabFilterValues((prevState) => ({
            ...prevState,
            [selectedTab]: {
                ...prevState[selectedTab],
                [`offset`]: newOffset,
            },
        }));
    }

    // Применение фильтров для конкретной вкладки
    const applyFilters = (alias) => {
        setTabFilterValues((prevState) => ({
            ...prevState,
            [alias]: tabSelectedFilters[alias],
        }));
    };



    // FIXME: Reset
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
        setTabResetFilters((prevState) => {
            const newState = {};
            Object.keys(prevState).forEach((alias) => {
                newState[alias] = {};
                Object.values(filterSpecs[alias]).forEach((value) => {
                    newState[alias][value.id] = {reset: true, id: 0}; // Устанавливаем значение `true` для всех фильтров
                });
            });
            return newState;
        });
    }

    // Обработка изменения фильтра (добавление измененных данных в выбранные фильтры)
    const handleFilterChange = (tabAlias, filterKey, value) => {
        if (multiSelectParams[tabAlias].includes(`${filterKey}_id`)){
            setTabSelectedFilters((prevState) => ({
                ...prevState,
                [tabAlias]: {
                    ...prevState[tabAlias],
                    [`${filterKey}_id`]: [value.options.id === 0? '': value.options.id],
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
                    [filterKey]: Array.isArray(value.options) ? value.options : [value.options === 0? '': value.options],
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
            if (Array.isArray(value) && value.length > 0 && JSON.stringify(value) !== '[""]') {
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

    //FIXME: Reset
    // Обработка удаления конкретного фильтра по клику в applied filters
    const removeFilter = (tabAlias, filterKey, idToRemove, resetKey=null) => {
        setTabSelectedFilters((prev) => {
            const currentSelectedFilters = prev[tabAlias]; // Фильтры текущей вкладки
            const currentValue = currentSelectedFilters[filterKey];

            if (Array.isArray(currentValue)) {
                // Удаляем элемент из массива
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentSelectedFilters,
                        [filterKey]: currentValue.filter((id) => id !== idToRemove),
                    },
                };
            } else {
                // Сбрасываем не массивное значение
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentSelectedFilters,
                        [filterKey]: "",
                    },
                };
            }
        });
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
        if (resetKey){
            setResetOneFilter(`${resetKey}`)
            setTabResetFilters((prev) => ({
                ...prev,
                [tabAlias]: {
                    ...prev[tabAlias],
                    [resetKey]: {reset: true, id: idToRemove},
                },
            }));
        }
        else{
            setResetOneFilter(`${filterKey}`)
            setTabResetFilters((prev) => ({
                ...prev,
                [tabAlias]: {
                    ...prev[tabAlias],
                    [filterKey]: {reset: true, id: idToRemove},
                },
            }));
        }
    };


    //TODO: Некорректно прописан reset
    // Обработка удаления конкретного фильтра по клику в applied filters
    const removeRangeRadioFilter = (tabAlias, filterName) => {
        setTabSelectedFilters((prev) => {
            const currentTabSelectedFilters = prev[tabAlias];
            return {
                ...prev,
                [tabAlias]: {
                    ...currentTabSelectedFilters,
                    [`${filterName}_from`]: "",
                    [`${filterName}_to`]: "",
                },
            }
        });
        setTabFilterValues((prev) => {
            const currentTabFilters = prev[tabAlias];
                return {
                    ...prev,
                    [tabAlias]: {
                        ...currentTabFilters,
                        [`${filterName}_from`]: "",
                        [`${filterName}_to`]: "",
                    },
            }
        });
        setTabResetFilters((prev) => {
            const updatedTab = {
                ...prev[tabAlias], // Копируем текущие значения для tabAlias
                [`${filterName}_from`]: { reset: true, id: 0 }, // Обновляем abv_from
                [`${filterName}_to`]: { reset: true, id: 0 },   // Обновляем abv_to
            };
            return {
                ...prev, // Копируем весь объект prev
                [tabAlias]: updatedTab, // Обновляем только tabAlias
            };
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
        console.log(JSON.stringify(allCards.map((card) => card.id)))
    }, [allCards]);



    // FIXME: Reset
    useEffect(() => {
        if (tabResetFilters[selectedTab] && Object?.values(tabResetFilters[selectedTab])?.some(value => value.reset === true)) {
            const timeout = setTimeout(() => {
                setTabResetFilters((prevState) => {
                    const newTabResetFilters = { ...prevState };
                    // Сбрасываем все фильтры для выбранного алиаса
                    newTabResetFilters[selectedTab] = {};
                    Object.values(filterSpecs[selectedTab]).forEach((value) => {
                        newTabResetFilters[selectedTab][value.id] = {reset: false, id: 0};

                    });
                    return newTabResetFilters;
                });
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
                        if (tab?.alias === "tincture") return null //FIXME: Временнное решение, позже убрать
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
                    {!isMobile &&
                        <div className={styles.menuFilters}>

                            {filtersConfig(tab.alias).map((filter) => {
                                return(
                                    <FilterItem
                                        key={filter.key}
                                        filter={filter}
                                        filterKey={tab.alias}
                                        onChange={(value) => handleFilterChange(tab.alias, filter.key, value)}
                                        reset={tabResetFilters[tab.alias][filter.key]}
                                    />
                                )
                            })}
                            <SimpleButton onClick={() => applyFilters(tab.alias)} text="Применить фильтры"></SimpleButton>
                        </div>
                    }
                    <div className={styles.menuItemsSections}>
                        <div className={styles.menuSection}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.sectionDescriptionIcon}><IconComponent/></div>
                                <div className={styles.sectionDescription}>
                                    <h2>{tab?.header}</h2>
                                    <p>{tab?.description}</p>
                                </div>
                                {!isMobile && <div className={`${styles.sectionButton} ${styles.mobileOff}` }><IconButton onClick={() => navigate("/in-dev")} text="Забронировать стол"><IconComponent/></IconButton></div>}
                                {isMobile && <div className={styles.mobileButtons}>
                                    <SimpleButton textStyle={"black"} text="ФИЛЬТРЫ" onClick={() => setShowFiltersModal(true)} style="primary"></SimpleButton>
                                    <div className={styles.sectionButton}><IconButton onClick={() => navigate("/in-dev")} text="Забронировать стол"><IconComponent/></IconButton></div>
                                </div>}
                            </div>
                            <div className={styles.appliedFiltersRow} style={{marginBottom: "0px"}}>
                                {tabSpec?.data && tab.alias === "food" && Object.keys(tabSpec?.data)?.map((tabNum, index) => {
                                    return(
                                        <IconButton style={tabNum === foodSelectedTab? "primary-third": "third-primary"} key={index} text={tabSpec?.data?.[tabNum]?.name} onClick={() => {if (tabNum !== foodSelectedTab) setFoodSelectedTab(tabNum); else setFoodSelectedTab("")}}>{foodIcons[tabSpec?.data[tabNum]?.name] || <FriesIcon/>}</IconButton>
                                    )
                                })}
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
                                                        {filterValue && <AppliedFilter key={`${filterKey}`} onClick={() => removeFilter(tab.alias, filterKey, id, filterName)}>
                                                            <p>{filterValue}</p>
                                                        </AppliedFilter>}
                                                    </>
                                                }
                                                else if ((filterDirection === "from")){
                                                    const filterValueFrom = tabFilterValues[tab.alias][`${filterName}_from`]
                                                    const filterValueTo = tabFilterValues[tab.alias][`${filterName}_to`]
                                                    if (JSON.stringify(filterValueFrom) === '[""]' && JSON.stringify(filterValueTo) === '[""]' || JSON.stringify(filterValueFrom) === '[null]' && JSON.stringify(filterValueTo) === '[null]') return null
                                                    return <>
                                                        <AppliedFilter key={`${filterKey}_from`} onClick={() => removeRangeRadioFilter(tab.alias, filterName)}>
                                                            <p>{`${filterSpecs[tab.alias][filterName]?.title}: ${JSON.stringify(filterValueFrom) === '[""]'? "0": filterValueFrom} - ${JSON.stringify(filterValueTo) === '[""]' ? "∞" : filterValueTo}`}</p>
                                                        </AppliedFilter>
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
                            {tabSpec?.data && tab.alias === "food" && Object.keys(tabSpec?.data)?.map((tabNum, index) => {
                                if (foodSelectedTab === "" || foodSelectedTab === tabNum){
                                    return(
                                        <Fragment key={index}>
                                            <div key={index} className={`${styles.sectionDescription} ${styles.row}`}>
                                                <h2>{tabSpec?.data[tabNum]?.name}</h2>
                                            </div>
                                            <div className={tabsSpecs[tab.alias]?.wideColumns ? styles.sectionContentWide : styles.sectionContent}>
                                                {tabSpec?.data[tabNum]?.menu && tabSpec?.data[tabNum]?.menu?.length > 0 && tabSpec?.data[tabNum]?.menu?.map((cardInfo, index) => <CardComponent key={index} cardInfo={cardInfo} onShowModal={(image) => {setSelectedFood(image); setShowModal(true)}}/>)}
                                            </div>
                                        </Fragment>
                                    )
                                }
                            })}
                            <SimpleCatalogSection prefix={selectedTab} CardComponent={CardComponent} cards={allCards} wideColumns={tabsSpecs[tab.alias]?.wideColumns} isFetching={tabSpec?.isFetching || false} isLoading={tabSpec?.isLoading || false} SkeletonCardComponent={tabSpec?.SkeletonCardComponent} lim={tabFilterValues?.[tab.alias]?.[`lim`]}></SimpleCatalogSection>
                            {tabSpec?.data?.["total_items"] && allCards?.length < tabSpec?.data?.["total_items"] && <div className={styles.loadMoreSection}><SimpleButton text="Загрузить еще" style="third" onClick={handleShowMore} disabled={tabSpec?.isFetching}></SimpleButton></div>}
                        </div>
                    </div>
                </div>)}
            )}
            {isMobile &&
                <FiltersModal setShow={setShowFiltersModal} show={showFiltersModal}>
                    {filtersConfig(selectedTab).map((filter) => {
                        return(
                            <FilterItem
                                key={filter.key}
                                filter={filter}
                                filterKey={selectedTab}
                                onChange={(value) => handleFilterChange(selectedTab, filter.key, value)}
                                reset={tabResetFilters[selectedTab][filter.key]}
                            />
                        )
                    })}
                    <SimpleButton onClick={() => {setShowFiltersModal(false); applyFilters(selectedTab)}} text="Применить фильтры"></SimpleButton>
                </FiltersModal>
            }
            <SingleImageModal src={selectedFood} setSrc={setSelectedFood} setShow={setShowModal} show={showModal}/>
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