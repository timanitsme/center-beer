import styles from "./QuestionFAQ.module.scss"
import {useState} from "react";
import CaretDownBold from "../../assets/caret-down-bold-icon.svg?react"
import {motion} from "motion/react"

export default function QuestionFAQ({qa= {question: "", answer: ""}}){
    const [expanded, setExpanded] = useState(false)

    return(
        <div onClick={() => setExpanded(!expanded)}>
            <div className={`${styles.question} ${expanded? styles.expanded: ""}`} >
                <p className="ma-p">{qa.question}</p>
                <CaretDownBold/>
            </div>
            <motion.div className={`${styles.answer}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                            expanded
                                ? { height: "auto", opacity: 1 }
                                : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.3, ease: "easeInOut" }}>
                <p className="ma-p">{qa?.answer}</p>
            </motion.div>
            <div className={styles.hrtLine}/>

        </div>

    )
}