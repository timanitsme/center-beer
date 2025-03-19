import styles from "./LightNavChain.module.css";
import {Link} from "react-router-dom";

export default function LightNavChain({paths}){
    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                    <>
                        <Link to={path?.path || ""}>{path.title}</Link>
                        {!isLast && <div className="circle"/>}
                    </>)
            })}
        </div>
    )
}