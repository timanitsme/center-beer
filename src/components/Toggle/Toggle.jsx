import {useEffect, useState} from 'react'
import styles from "./Toggle.module.css"

export default function Toggle( {label, toggled, onClick, reset}) {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }
    /*useEffect(() => {
        if (reset){
            toggle(false)
        }
    }, [reset]);*/

    return (
        <label className={styles.toggle}>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
            <p className="noSelect">{label}</p>
        </label>
    )
}