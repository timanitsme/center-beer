import styles from "./Task.module.scss"
import {RiCopperCoinFill} from "react-icons/ri";

export default function Task({task, tasksHash}){

    function isTaskCompletedFast(taskId) {
        const task = tasksHash[taskId];
        return task ? task.complete : null;
    }

    const handleRequirementClick = (requirementId) => {
        if (requirementId !== null && tasksHash[requirementId]) {
            const element = document.getElementById(`task-${requirementId}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.classList.add(styles.highlighted);
                setTimeout(() => {
                    element.classList.remove(styles.highlighted);
                }, 3000);
            }
        }
    };
    return(
        <div className={styles.task} id={`task-${task.id}`}>
            <p className={`${styles.title} ma-p`}>{task.title}</p>
            <div className={styles.bottom}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <p className={`${styles.wrap} ma-p ${styles.limited}`}>{task.description}</p>
                    </div>
                    <div className={`${styles.col} ${styles.limited}`}>
                        {task.requirement !==null? isTaskCompletedFast(task.requirement)? <p className="ma-p" style={{textDecoration: "line-through"}}>{tasksHash[task.requirement].title}</p>:
                            <p className="ma-p">Условие: <a className="ma-p" onClick={() => handleRequirementClick(task.requirement)}>{tasksHash[task.requirement].title}</a></p>: <p className="ma-p">Задание выполняется в любое время</p> }
                    </div>
                </div>
                <div className={`${styles.row} ${styles.fit}`}>
                    <div className={styles.col} style={{minWidth: "fit-content"}}>
                        <p className="ma-p" style={{minWidth: "fit-content"}}>Заработай <span style={{color: "var(--txt-active)"}} className="ma-p">{task.reward}</span></p>
                        <RiCopperCoinFill color="var(--primary)"/>
                    </div>
                    <div className={`${styles.col} ${styles.flexCol}`}>
                        {task.requirement !==null && !isTaskCompletedFast(task.requirement)? <a style={{color: "var(--txt-secondary)", textAlign: "center"}} className="ma-p">Перейти к выполнению</a>:
                            <a style={{textAlign: "center"}} onClick={() => window.location.href = task.path} className="ma-p">Перейти к выполнению</a>
                        }
                        {task.complete?
                            <div className={`${styles.status} ${styles.completed}`}>
                                <p className="ma-p">Выполнено</p>
                            </div>
                            :
                            <div className={`${styles.status} ${styles.notCompleted}`}>
                                <p className="ma-p">Не выполнено</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}