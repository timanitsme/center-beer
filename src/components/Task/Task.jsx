import styles from "./Task.module.css"
import {RiCopperCoinFill} from "react-icons/ri";

export default function Task({taskInfo}){
    return(
        <div className={styles.task}>
            <p className={styles.title}>Профиль</p>
            <div className={styles.bottom}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <p>Заполни все графы своего профиля</p>
                    </div>
                    <div className={styles.col}>
                        <p>Задание выполняется в любое время</p>
                    </div>
                </div>
                <div className={`${styles.row} ${styles.fit}`}>
                    <div className={styles.col} style={{minWidth: "fit-content"}}>
                        <p style={{minWidth: "fit-content"}}>Заработай <span style={{color: "var(--txt-active)"}}>100</span></p>
                        <RiCopperCoinFill color="var(--primary)"/>
                    </div>
                    <div className={styles.col}>
                        <a>Перейти к выполнению</a>
                    </div>
                    <div className={styles.col}>
                        <div className={`${styles.status} ${styles.completed}`}>
                            <p>Выполнено</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}