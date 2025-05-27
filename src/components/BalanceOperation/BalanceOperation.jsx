import styles from "./BalanceOperation.module.css"
import {RiCopperCoinFill} from "react-icons/ri";
import ArrowDownIcon from "../../assets/arrow-down-icon.svg?react";
import {useState} from "react";

export default function BalanceOperation({operation}){
    const [expanded, setExpanded] = useState(false)

    return(
        <>
            <div className={`${styles.operation} ${expanded? styles.expanded: ""}`} onClick={() =>setExpanded(!expanded)}>
                <p className={styles.active}>{operation.date}</p>
                <div className={styles.row}>
                    <p className={styles.active} style={{color: `${operation.is_profit? "#70CF98": "var(--txt-active)"}`}}>{operation.is_profit? "+": "-"} {operation.amount}</p>
                    <RiCopperCoinFill color="var(--primary)"/>
                </div>
                <p className={styles.activeOnHover}>{operation.event}</p>
                {operation.description &&
                    <div className={styles.arrowContainer}>
                        <ArrowDownIcon/>
                    </div>
                }
            </div>
            {operation?.description &&
                <div className={`${styles.operationDescription} ${expanded? styles.expanded: ''}`}>
                    <p>{operation?.description}</p>
                </div>
            }
        </>
    )
}