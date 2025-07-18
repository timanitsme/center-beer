import styles from "./BalanceOperation.module.scss"
import {RiCopperCoinFill} from "react-icons/ri";
import ArrowDownIcon from "../../assets/arrow-down-icon.svg?react";
import {useState} from "react";
import formatDateTimeWithTextMonth from "../../utils/DateFunctions/formatDateTimeWithTextMonth.js";

export default function BalanceOperation({operation}){
    const [expanded, setExpanded] = useState(false)

    const costNum = Number(operation.cost)
    const isProfit = (costNum >= 0)

    return(
        <>
            <div className={`${styles.operation} ${expanded? styles.expanded: ""}`} onClick={() =>setExpanded(!expanded)}>
                <p className={`${styles.active} ma-p`}>{formatDateTimeWithTextMonth(operation.create_date)}</p>
                <div className={styles.row}>
                    <p className={`${styles.active} ma-p`} style={{color: `${isProfit? "#70CF98": "var(--txt-active)"}`}}>{isProfit? "+": "-"} {Math.abs(costNum)}</p>
                    <RiCopperCoinFill color="var(--primary)"/>
                </div>
                <p className={`${styles.activeOnHover} ma-p`}>{operation.action}</p>
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