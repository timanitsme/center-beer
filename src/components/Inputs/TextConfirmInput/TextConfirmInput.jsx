import styles from "./TextConfirmInput.module.scss"
import {useEffect, useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import CloseIcon from "../../../assets/close-icon.svg?react"
import {FaCheck} from "react-icons/fa6";

export default function TextConfirmInput({inputValue, setInputValue, placeholder="", onConfirm = () => {}, maxLength = 30, type="text", initialValue=""}){
    const [showBoxes, setShowBoxes] = useState(false)

    const handleInput = (e) => {
        if (e.target.value.length < maxLength){
            if (!showBoxes && e.target.value !== initialValue){
                setShowBoxes(true)
            }
            if (showBoxes && e.target.value === initialValue){
                setShowBoxes(false)
            }
            setInputValue(e.target.value)
        }
    };

    const handleDecline = () => {
        setInputValue(initialValue)
        setShowBoxes(false)
    }

    return(
        <div className={styles.passwordContainer}>
            <div className={styles.inter}>
                <input
                    type={type}
                    value={inputValue}
                    onChange={handleInput}
                    placeholder={placeholder}
                    className={`${styles.textInput} ma-p`}
                />
                {showBoxes &&
                    <>
                        <div className={`${styles.box} ${styles.confirmBox}`} onClick={onConfirm}>
                            <FaCheck/>
                        </div>
                        <div className={`${styles.box} ${styles.declineBox}`} onClick={handleDecline}>
                            <CloseIcon/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}