import styles from "./NewsMobileSection.module.scss"
import {useGetNewsCategoriesQuery} from "../../store/services/centerBeer.js";
import {Link} from "react-router-dom";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";

export default function NewsMobileSection({onChange, withInput=false}){
    const {data: categories, isFetching: categoriesIsFetching} =  useGetNewsCategoriesQuery()

    if (!categoriesIsFetching){
        return (
            <div className={styles.mobileSection}>
                <div className={styles.searchContainer}>
                    {withInput && <SearchInput title="Поиск по статьям" onChange={(newSearch) => onChange(newSearch)}/>}
                </div>
                <div className={styles.tagsContainer}>
                    {<div className={`${styles.tag} ${styles.primary}`}><p>Все новости</p></div>}
                    {categories?.map((item, index) =>
                        <div key={index} className={styles.tag}><p className="noSelect">{item.name}</p></div>

                    )}
                </div>
            </div>
        )
    }
}