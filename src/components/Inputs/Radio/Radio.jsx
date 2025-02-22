import styles from "./Radio.module.css"
import {useState} from "react";

export default function Radio({title, options}){
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return(
        <div className={styles.radio}>
            <p className={styles.radioHeader}>{title}</p>
            {options.map((option => {
                return(
                    <div key={option} className={styles.option}
                         onClick={() => setSelectedOption(option)}>
                        <input type="radio" value={option} checked={selectedOption === option} />
                        <span className={styles.radioButton}></span>
                        <p>{option}</p>
                    </div>
                )
            }))}
        </div>
    )
}