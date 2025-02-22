import styles from "./BarMenu.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import FilterComboBox from "../Inputs/FilterComboBox/FilterComboBox.jsx";
import CatalogSection from "../CatalogSections/CatalogSection/CatalogSection.jsx";
import Radio from "../Inputs/Radio/Radio.jsx";
import PropTypes from "prop-types";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function BarMenu({filters, filterButtons, sections}){
    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuHeader}>
                <h2>Наше меню</h2>
                <div className={styles.filterButtons}>
                    {filterButtons.map((button) => (
                        <IconButton key={button.text} text={button.text}>{button.icon}</IconButton>
                    ))}
                </div>
            </div>
            <div className={styles.menuContent}>
                <div className={styles.menuFilters}>
                    {filters.map((filter) => {
                        return(
                            filter.type === "combobox" ? <FilterComboBox title={filter.title} options={filter.options}/> : <Radio options={filter.options}/>
                        )
                    })}
                    <SimpleButton text="Применить фильтры"></SimpleButton>
                </div>
                <div className={styles.menuItemsSections}>
                    {sections.map((section, index) => (
                        <CatalogSection key={index} specs={section.specs} CardComponent={section.CardComponent} IconComponent={section.IconComponent} wideColumns={section.wideColumns}/>
                    ))}

                </div>
            </div>
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