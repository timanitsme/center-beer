import styles from "./ButtonSwitch.module.css"
import IconButton from "../Buttons/IconButton/IconButton.jsx";

export default function ButtonSwitch({options, selectedOption, onClick}){
    return(
        <div className={styles.buttonSwitch}>
            {options.map((option, index) => (
                <IconButton
                    key={index}
                    text={option.title}
                    style={selectedOption.title === option.title ? "primary" : "secondary"}
                    onClick={() => onClick(option)}
                />
            ))}
        </div>
    )
}