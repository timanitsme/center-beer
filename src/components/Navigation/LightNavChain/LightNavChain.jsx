import styles from "./LightNavChain.module.scss";
import {Link} from "react-router-dom";
import {Fragment} from "react";

export default function LightNavChain({paths}){
    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                    <Fragment key={index}>
                        <Link to={path?.path || ""} className="ma-p2">{path.title}</Link>
                        {!isLast && <div className="circle"/>}
                    </Fragment>)
            })}
        </div>
    )
}