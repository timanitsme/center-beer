import {Link, useLocation} from "react-router-dom";
import styles from "../EventsMobileSection/EventsMobileSection.module.scss";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";

export default function AboutMobileSection({paths}){
    const currentPath = useLocation()


    return (
        <div className={styles.mobileSection}>
            <div className={styles.tagsContainer}>
                {paths?.map((item, index) =>
                    <div key={index} className={`${styles.tag} ${currentPath.pathname === item.path? styles.primary: ""}`}><a href={item.path}>{item.title}</a></div>

                )}
            </div>
        </div>
    )
}