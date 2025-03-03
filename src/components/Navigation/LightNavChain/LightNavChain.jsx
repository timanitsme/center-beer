import styles from "./LightNavChain.module.css";

export default function LightNavChain({paths}){
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