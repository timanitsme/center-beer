import styles from "./EventsMobileSection.module.scss";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";
import {Link, useLocation} from "react-router-dom";

export default function EventsMobileSection({onChange, withInput=false}){
    const currentPath = useLocation()
    const menuItems = [
        {title: "Все мероприятия", path: "/events"},
        {title: "Мероприятия заведений", path: "/events/restaurants"},
        {title: "Мероприятия пивоварен", path: "/events/breweries"},
        {title: "Фестивали", path: "/events/festivals"}
    ]


    return (
        <div className={styles.mobileSection}>
            <div className={styles.searchContainer}>
                {withInput && <SearchInput title="Поиск по мероприятиям" onChange={(newSearch) => onChange(newSearch)}/>}
            </div>
            <div className={styles.tagsContainer}>
                {menuItems?.map((item, index) =>
                    <div key={index} className={`${styles.tag} ${currentPath.pathname === item.path? styles.primary: ""}`}><Link className="noSelect" to={item.path}>{item.title}</Link></div>

                )}
            </div>
        </div>
    )
}