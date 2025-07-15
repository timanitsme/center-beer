import styles from "./SwitchRowSection.module.scss"
import {useState} from "react";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import ShortenedRowSection from "../ShortenedRowSection/ShortenedRowSection.jsx";

export default function SwitchRowSection({title, options}){
    const [selectedOption, setSelectedOption] = useState(options[0])

    return(
        <div className={styles.sectionContainer}>
            {title && <h3 className="ma-h3">{title}</h3>}
            <div className={styles.buttonSwitch}>
                {options?.map((option, index) =>{
                    return <IconButton key={index} text={option?.title} style={selectedOption.title !== option.title? "secondary": "primary"} onClick={() => {setSelectedOption(option);}}></IconButton>
                })}
            </div>
            <ShortenedRowSection prefix={selectedOption.title} cards={selectedOption.cards} totalItems={selectedOption.cards.length} maxCards={selectedOption.maxCards} CardComponent={selectedOption.CardComponent}></ShortenedRowSection>
        </div>
    )
}