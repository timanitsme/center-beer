import styles from "./ChildrenTitle.module.scss"
import NavChain from "../Navigation/NavChain/NavChain.jsx";

export default function ChildrenTitle({paths, children, title, description=null}){
    return(
        <div className="content" style={{minHeight: "200px"}}>
            <NavChain paths={paths}/>
            <div className={styles.devSection}>
                {children}
                <div>
                    <h1 className={`${styles.outlineTitle} text-large`}>{title}</h1>
                    {description !== null && <h3 className="ma-h3" style={{color: "var(--primary)"}}>{description}</h3>}
                </div>
            </div>
        </div>
    )
}