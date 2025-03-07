import FilterComboBox from "../FilterComboBox/FilterComboBox.jsx";
import CheckBoxSection from "../CheckBoxSection/CheckBoxSection.jsx";
import Radio from "../Radio/Radio.jsx";
import Search from "../Search/Search.jsx";


export default function FilterItem({ filter, onChange, reset }) {
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
                        defaultOption={{name: "все", id: 0}}
                    />
                )
            case "search":
                return (
                    <Search title={filter.title} onChange={onChange}/>
                )
            default:
                return null;
        }
    };

    return renderComponent();
}