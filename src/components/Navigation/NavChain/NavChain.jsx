import styles from "./NavChain.module.css"
import NavChainArrowIcon from "../../../assets/navchain-arrow-icon.svg?react"
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function NavChain({paths}){
    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                <>
                    <Link to={path.path} className={isLast? `${styles.disabled}`: ''}>{path.title}</Link>
                    {!isLast && <NavChainArrowIcon/>}
                </>)
            })}
        </div>
    )
}

NavChain.propTypes = {
    paths: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        })
    ).isRequired
}