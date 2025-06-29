import {useState} from "react";
import styles from "./Radio.module.scss";

export default function RadioBox({title, selected, children}){
    const [selectedOption, setSelectedOption] = useState(selected);

    return(
        <div className={styles.radio}>
            <div className={styles.option}
                 onClick={() => setSelectedOption(!selectedOption)}>
                <input type="radio" value={title} checked={selectedOption} />
                <span className={styles.radioButton}></span>
                {children}
            </div>
        </div>
    )
}
