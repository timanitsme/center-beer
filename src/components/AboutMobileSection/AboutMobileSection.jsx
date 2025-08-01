import {useLocation} from "react-router-dom";
import styles from "./AboutMobileSection.module.scss";

export default function AboutMobileSection({paths}){
    const currentPath = useLocation()


    return (
        <div className={styles.mobileSection}>
            <div className={styles.tagsContainer}>
                {paths?.map((item, index) =>
                    <div key={index} className={`${styles.tag} ${currentPath.pathname === item.path? styles.primary: ""}`}><a href={item.path} className="noSelect">{item.title}</a></div>
                )}
            </div>
        </div>
    )
}