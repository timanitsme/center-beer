import {useState} from "react";
import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import Search from "../Inputs/Search/Search.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import Toggle from "../Toggle/Toggle.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import PropTypes from "prop-types";
import Bottle1 from "../../assets/bottlesMock/bottle-1.svg";
import Bottle2 from "../../assets/bottlesMock/bottle-2.svg";
import Bottle3 from "../../assets/bottlesMock/bottle-3.svg";
import Bottle4 from "../../assets/bottlesMock/bottle-4.svg";
import Bottle5 from "../../assets/bottlesMock/bottle-5.svg";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import CheckBoxSection from "../Inputs/CheckBoxSection/CheckBoxSection.jsx";
import RangeRadio from "../Inputs/Radio/RangeRadio.jsx";

export default function BeerCatalog({filters = [], filterButtons = [], sections = [], withHeader = true}){
    const cardsBeer = [
        {title:"Terra Firma", manufacturer: "Чаща, Москва, Россия", img: Bottle1,strength: 6.5, density: 12, bitterness: 32, price: 380, rating: 5, style: "Светлый лагер"},
        {title:"Der Stern", manufacturer: "Чаща, Москва, Россия", img: Bottle2,strength: 6.5, density: 12, bitterness: 32, price: 280, rating: 4.5, style: "Светлый лагер"},
        {title:"Headline", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle3,strength: 6.5, density: 12, bitterness: 32, price: 380, style: "Светлый лагер"},
        {title:"Небо над Тагилом", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle4,strength: 6.5, density: 12, bitterness: 32, price: 480, style: "Светлый лагер"},
        {title:"Terra Firma", manufacturer: "Чаща, Москва, Россия", img: Bottle5,strength: 6.5, density: 12, bitterness: 32, price: 180, rating: 4.7, style: "Светлый лагер"},
    ]

    const [onlyOpened, setOnlyOpened] = useState(false);


    return(
        <div className={styles.menuContainer}>
            {withHeader && <div className={styles.menuHeader}>
                <div className={styles.catalogHeader}>
                    <div>
                        <h2>Каталог пива</h2>
                        <p>В этом списке представлены лучшие сорта пива, выбранные на основе нашей формулы средневзвешенного рейтинга, которая позволяет объективно сравнить все напитки между собой. Чтобы попасть в этот перечень, пиво должно иметь не менее 150 отзывов. Подробнее о составлении рейтинга.</p>
                        <a>Подробнее о составлении рейтинга.</a>
                    </div>

                </div>
                {filterButtons && <div className={styles.filterButtons}>
                    {filterButtons.map((button) => (
                        <IconButton key={button.text} text={button.text}>{button.icon}</IconButton>
                    ))}
                </div>}
            </div>}
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    {filters.map((filter) => {
                        switch (filter.type) {
                            case "combobox":
                                return <FilterComboBox key={filter.title} title={filter.title} options={filter.options} />;
                            case "radio":
                                return <Radio key={filter.title} title={filter.title} options={filter.options} />;
                            case "rangeRadio":
                                return <RangeRadio key={filter.title} title={filter.title} options={filter.options}/>
                            case "checkbox":
                                return <CheckBox text={filter.title}/>
                            case "checkboxSection":
                                return <CheckBoxSection title={filter.title} options={filter.options}/>
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
                        <ComboBox options={["Сначала популярные", "По умолчанию"]}></ComboBox>
                        <Toggle label={"Только с отзывами"} toggled={onlyOpened} onClick={() => setOnlyOpened(!onlyOpened)}/>
                    </div>
                    <SimpleCatalogSection cards={cardsBeer} CardComponent={BottledBeerCard} wideColumns={false}/>

                </div>
            </div>
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