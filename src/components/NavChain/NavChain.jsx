import styles from "./NavChain.module.css"
import NavChainArrowIcon from "../../assets/navchain-arrow-icon.svg?react"

export default function NavChain(){
    const paths = [
        {title:"beer.center"},
        {title:"Бары и магазины"},
        {title:"13 RULES (Народный бар)"}
    ]

    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                <>
                    <a className={isLast? `${styles.disabled}`: ''}>{path.title}</a>
                    {!isLast && <NavChainArrowIcon/>}
                </>)
            })}
        </div>
    )
}