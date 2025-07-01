import {useEffect, useState} from 'react'
import styles from "./Toggle.module.scss"

export default function Toggle( {label, toggled, onClick, reset}) {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className={styles.toggle}>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
            <p className="noSelect ma-p">{label}</p>
        </label>
    )
}