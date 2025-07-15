import {useEffect, useRef, useState} from "react";
import styles from "./CodeInput.module.scss";
import {FaCheck} from "react-icons/fa6";
import CloseIcon from "../../../assets/close-icon.svg?react";

export default function CodeInput({inputValue, setInputValue, onConfirm = () => {}, maxLength = 30, type="text", fieldsCount=4}){

    const inputRefs = useRef([]);

    const handleFocus = (index) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].focus();
        }
    };

    const handleInput = (e, index) => {
        const newValue = e.target.value;
        if (newValue.length <= maxLength) {
            setInputValue((prev) => {
                const updatedValues = [...prev];
                updatedValues[index] = newValue;
                return updatedValues;
            });
            if (index !== fieldsCount-1){
                handleFocus(index+1)
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (inputValue[index] !== "") {
                setInputValue((prev) => {
                    const updatedValues = [...prev];
                    updatedValues[index] = "";
                    return updatedValues;
                });
            } else if (index > 0) {
                setInputValue((prev) => {
                    const updatedValues = [...prev];
                    updatedValues[index - 1] = "";
                    return updatedValues;
                });
                handleFocus(index - 1);
            }
        }
        else if (e.key === "ArrowLeft") {
            if (index > 0) {
                handleFocus(index - 1);
            }
        } else if (e.key === "ArrowRight") {
            if (index < fieldsCount - 1) {
                handleFocus(index + 1);
            }
        }
    };

    return(
        <div className={styles.codeContainer}>
            {Array.from({ length: fieldsCount }).map((_, index) => (
                <input
                    type={type}
                    key={index}
                    value={inputValue[index]}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleInput(e, index)}
                    placeholder="0"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`${styles.textInput} ma-p`}
                    maxLength={1}
                />
            ))}

        </div>
    )
}