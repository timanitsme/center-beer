import styles from "./QuestionFAQ.module.scss"
import {useState} from "react";
import CaretDownBold from "../../assets/caret-down-bold-icon.svg?react"

export default function QuestionFAQ({qa= {question: "", answer: ""}}){
    const [expanded, setExpanded] = useState(false)

    return(
        <>
            <div className={`${styles.question} ${expanded? styles.expanded: ""}`} onClick={() => setExpanded(!expanded)}>
                <p className="ma-p">{qa.question}</p>
                <CaretDownBold/>
            </div>
            <div className={styles.hrtLine}/>
            <div className={`${styles.answer} ${expanded? styles.expanded: ''}`}>
                <p className="ma-p">{qa?.answer}</p>
                <div className={styles.hrtLine}/>
            </div>

        </>

    )
}