import styles from "./ComponentHeader.module.scss"

export default function ComponentHeader({title, description, HeaderIcon, children}){

    return(
        <div className={styles.headerContainer}>
            <div className={styles.headerIcon}><HeaderIcon/></div>
            <div>
                <div style={{display: "flex", justifyContent: "space-between", gap: "5px"}}>
                    <h3 className="ma-h3" style={{alignSelf: "flex-end"}}>{title}</h3>
                    {children}
                </div>
                <p className="ma-p">{description}</p>
            </div>
        </div>
    )
}