import Brewery1 from "../../assets/breweryMocks/brewery-logo-1.svg";
import Brewery2 from "../../assets/breweryMocks/brewery-logo-2.svg";
import Brewery3 from "../../assets/breweryMocks/brewery-logo-3.svg";
import Brewery4 from "../../assets/breweryMocks/brewery-logo-4.svg";
import Brewery5 from "../../assets/breweryMocks/brewery-logo-5.svg";
import Brewery6 from "../../assets/breweryMocks/brewery-logo-6.svg";
import {useState} from "react";
import styles from "./BarsCatalog.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import CheckBox from "../Inputs/CheckBox/CheckBox.jsx";
import Search from "../Inputs/Search/Search.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import AppliedFilter from "../AppliedFilter/AppliedFilter.jsx";
import LocationIcon from "../../assets/location-filled-icon.svg?react";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import PropTypes from "prop-types";
import DistributorCard from "../Cards/DistributorCard/DistributorCard.jsx";

export default function DistributorsCatalog({filters = [], filterButtons = [], sections = []}){
    const cardsBars = [
        {title: "Jaws Brewery", img: Brewery1, address: "г. Москва, Сущевский вал, 41", metro: "Лубянка, Сретенский бульвар", rating: 5, options: ["Пиво", "Крепкий алкоголь", "Вино"]},
        {title: "Jaws Brewery", img: Brewery2, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, options: ["Пиво", "б/а напитки"]},
        {title: "Jaws Brewery", img: Brewery3, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, options: ["Пиво", "крепкий алкоголь", "вино", "б/а напитки"]},
        {title: "Jaws Brewery", img: Brewery4, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, options: ["Пиво", "крепкий алкоголь", "вино", "б/а напитки"]},
        {title: "Jaws Brewery", img: Brewery5, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, options: ["Пиво", "крепкий алкоголь"]},
        {title: "Jaws Brewery", img: Brewery6, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, options: ["Пиво", "вино", "б/а напитки"]},

    ]

    const [onlyOpened, setOnlyOpened] = useState(false);


    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <div className={styles.catalogHeader}>
                    <div>
                        <h2>Каталог Дистрибьюторов</h2>
                        <p>Собрали для вас список лучших дистрибьюторов, у которых можно заказывать ассортимент пива, пивных закусок, еды, алкоголя и всего, что продается в заведениях и без чего их жизнедеятельность не возможна или крайне затруднительна. С помощью фильтров вы легко найдете нужную компанию и необходимый ассортимент в своем городе.</p>
                    </div>
                    {/*Филлер для переноса текста, мб прописать отдельные стили*/}
                    <div style={{width: "20%"}}></div>
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
                                return <FilterComboBox key={filter.title} title={filter.title} options={filter.options} />;
                            case "radio":
                                return <Radio key={filter.title} title={filter.title} options={filter.options} />;
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
                            <p>Москва</p>
                        </AppliedFilter>
                        <AppliedFilter style="secondary">
                            <p>Сбросить фильтры</p>
                        </AppliedFilter>
                    </div>
                    <div className={styles.toggleAndOptions}>
                        <ComboBox options={["Сначала популярные", "По умолчанию"]}></ComboBox>
                    </div>
                    <SimpleCatalogSection cards={cardsBars} CardComponent={DistributorCard} wideColumns={true}/>

                </div>
            </div>
        </div>
    )
}

DistributorsCatalog.propTypes = {
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