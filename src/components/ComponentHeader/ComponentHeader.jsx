import styles from "./ComponentHeader.module.scss"

export default function ComponentHeader({title, description, HeaderIcon}){

    return(
        <div className={styles.headerContainer}>
            <div className={styles.headerIcon}><HeaderIcon/></div>
            <div>
                <h3 className="ma-h3">{title}</h3>
                <p className="ma-p">{description}</p>
            </div>
        </div>
    )
}