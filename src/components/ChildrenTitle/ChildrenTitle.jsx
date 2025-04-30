import styles from "./ChildrenTitle.module.css"
import NavChain from "../Navigation/NavChain/NavChain.jsx";
import {FaTools} from "react-icons/fa";

export default function ChildrenTitle({paths, children, title}){
    return(
        <div className="content" style={{minHeight: "200px"}}>
            <NavChain paths={paths}/>
            <div className={styles.devSection}>
                {children}
                <h1 className={styles.outlineTitle}>{title}</h1>
            </div>
        </div>
    )
}