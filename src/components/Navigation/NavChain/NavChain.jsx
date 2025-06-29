import styles from "./NavChain.module.scss"
import NavChainArrowIcon from "../../../assets/navchain-arrow-icon.svg?react"
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Fragment} from "react";

export default function NavChain({paths}){
    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                <Fragment key={index}>
                    <Link to={path.path} className={`${isLast ? styles.disabled: ''} ma-p`}>{path.title}</Link>
                    {!isLast && <NavChainArrowIcon/>}
                </Fragment>)
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