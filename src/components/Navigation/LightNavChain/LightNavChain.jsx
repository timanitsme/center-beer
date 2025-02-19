import styles from "./LightNavChain.module.css";

export default function LightNavChain(){
    const paths = [
        {title:"Новости"},
        {title:"Пиво"},
    ]

    return(
        <div className={styles.navChainContainer}>
            {paths.map((path, index) => {
                const isLast = paths.length - 1 === index;
                return(
                    <>
                        <a>{path.title}</a>
                        {!isLast && <div className="circle"/>}
                    </>)
            })}
        </div>
    )
}