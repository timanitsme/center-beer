import styles from "./ToggleInput.module.scss"
import {useState} from "react"

export default function ToggleInput({title="Цена", onChange, reset}){
    const [toggleState, setToggleState] = useState(false)

    const onToggleClick = (button) => {
        if (button !== toggleState){
            setToggleState(button)
            onChange(button)
        }
    }

    return(
        <div className={styles.filterContainer}>
            <p className={`${styles.filterContainerHeader} noSelect`}>{title}</p>
            <div className={styles.toggle}>
                <p className={toggleState? "": styles.active} onClick={() => onToggleClick(false)}>В заведении</p>
                <p className={toggleState? styles.active: ""} onClick={() => onToggleClick(true)}>На вынос</p>
            </div>
        </div>
    )
}