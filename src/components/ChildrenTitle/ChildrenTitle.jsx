import styles from "./ChildrenTitle.module.scss"
import NavChain from "../Navigation/NavChain/NavChain.jsx";

export default function ChildrenTitle({paths, children, title}){
    return(
        <div className="content" style={{minHeight: "200px"}}>
            <NavChain paths={paths}/>
            <div className={styles.devSection}>
                {children}
                <h1 className={`${styles.outlineTitle} text-large`}>{title}</h1>
            </div>
        </div>
    )
}