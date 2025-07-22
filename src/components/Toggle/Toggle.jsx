import {useState} from 'react'
import styles from "./Toggle.module.scss"

export default function Toggle( {label, toggled, onClick, reset}) {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <div className={styles.flexRow} onClick={callback}>
            <label className={styles.toggle}>
                <input type="checkbox" defaultChecked={isToggled} />
                <span />
            </label>
            <p className="noSelect ma-p">{label}</p>
        </div>
    )
}