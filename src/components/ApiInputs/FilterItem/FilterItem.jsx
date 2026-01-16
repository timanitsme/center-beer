import FilterComboBox from "../FilterComboBox/FilterComboBox.jsx";
import CheckBoxSection from "../CheckBoxSection/CheckBoxSection.jsx";
import Radio from "../Radio/Radio.jsx";
import SearchCities from "../Search/SearchCities.jsx";
import RangeRadio from "../Radio/RangeRadio.jsx";


export default function FilterItem({ filter, onChange, reset, filterKey = "" }) {
    const renderComponent = () => {
        switch (filter.componentType) {
            case "checkbox":
                return (<></>);
            case "combobox":
                return (
                    <FilterComboBox
                        title={filter.title}
                        options={filter.options}
                        onChange={onChange}
                        reset={reset}
                    />
                );
            case "checkboxSection":
                return (
                    <CheckBoxSection
                    title={filter.title}
                    options={filter.options}
                    onChange={onChange}
                    reset={reset}/>
                )
            case "radio":
                return (
                    <Radio
                        title={filter.title}
                        options={filter.options}
                        onChange={onChange}
                        reset={reset}
                        defaultOption={{name: "Все", id: 0}}
                        filterKey={filterKey}
                    />
                )
            case "rangeRadio":
                return (
                    <RangeRadio
                        title={filter.title}
                        options={filter.options}
                        onChange={onChange}
                        reset={reset}
                        defaultOption={{name: "Все", id: 0}}
                        filterKey={filterKey}
                    />
                )
            case "search":
                return (
                    <SearchCities title={filter.title} onChange={onChange}/>
                )
            default:
                return null;
        }
    };

    return renderComponent();
}