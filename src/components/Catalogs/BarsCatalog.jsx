import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PropTypes from "prop-types";
import LocationIcon from "../../assets/location-filled-icon.svg?react"
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import ProductCard from "../Cards/ProductCard/ProductCard.jsx";
import Bar1 from "../../assets/barsMocks/bar-1.svg";
import Bar2 from "../../assets/barsMocks/bar-2.svg";
import Bar3 from "../../assets/barsMocks/bar-3.svg";
import Bar4 from "../../assets/barsMocks/bar-4.svg";
import Bar5 from "../../assets/barsMocks/bar-5.svg";
import Bar6 from "../../assets/barsMocks/bar-6.svg";
import BarCard from "../Cards/BarCard/BarCard.jsx";
import Search from "../Inputs/Search/Search.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import {useState} from "react";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import {useGetBarsQuery} from "../../store/services/centerBeer";
import {useNavigate} from "react-router-dom";


export default function BarsCatalog({filters = [], filterButtons = [], sections = []}){
    const navigate = useNavigate()
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

    const { data, isLoading, error } = useGetBarsQuery(filterValues);

    const handleFilterChange = (filterKey, value) =>{
        setFilterValues(prevState => ({
            ...prevState,
            [filterKey]: value
        }));
    };

    const [onlyOpened, setOnlyOpened] = useState(false);


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
                <div className={styles.filterButtons}>
                    {filterButtons.map((button) => (
                        <IconButton key={button.text} text={button.text}>{button.icon}</IconButton>
                    ))}
                </div>
            </div>
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    {filters.map((filter) => {
                        switch (filter.type) {
                            case "combobox":
                                return <FilterComboBox key={filter.title} title={filter.title}
                                                       options={filter.options} onChange={(value) => handleFilterChange(filter.title.toLowerCase().replace(/\s+/g, '_'), value)} />;
                            case "radio":
                                return <Radio key={filter.title} title={filter.title}
                                              options={filter.options} />;
                            case "checkbox":
                                return <CheckBox text={filter.title}/>
                            case "search":
                                return <Search text={filter.title} options={filter.options}/>
                            default:
                                return null;
                        }
                    })}
                    <SimpleButton text="Применить фильтры"></SimpleButton>
                </div>
                <div className={styles.menuItemsSections}>
                    <div className={styles.appliedFiltersRow}>
                        <AppliedFilter>
                            <LocationIcon/>
                            <p>Нижний Новгород</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Абхазия</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Албания</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Пилэнер</p>
                        </AppliedFilter>
                        <AppliedFilter>
                            <p>Пшеничный эль</p>
                        </AppliedFilter>
                        <AppliedFilter style="secondary">
                            <p>Сбросить фильтры</p>
                        </AppliedFilter>
                    </div>
                    <div className={styles.toggleAndOptions}>
                        <ComboBox options={["По убыванию", "По возрастанию"]}></ComboBox>
                        <Toggle label={"Только открытые"} toggled={onlyOpened} onClick={() => setOnlyOpened(!onlyOpened)}/>
                    </div>
                    { !isLoading && !error &&
                        <SimpleCatalogSection cards={data} CardComponent={BarCard} wideColumns={false}/>
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