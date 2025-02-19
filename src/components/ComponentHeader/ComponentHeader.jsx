import styles from "./ComponentHeader.module.css"

export default function ComponentHeader({title, description, HeaderIcon}){

    return(
        <div className={styles.headerContainer}>
            <div className={styles.headerIcon}><HeaderIcon/></div>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}