import styles from "./PasswordInput.module.scss"
import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";

export default function PasswordInput({inputValue, setInputValue, placeholder="", maxLength = 30}){
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInput = (e) => {
        if (e.target.value.length < maxLength){
            setInputValue(e.target.value)
        }
    };

    return(
        <div className={styles.passwordContainer}>
            <input
                type={showPassword ? 'text' : 'password'} // Переключение типа
                value={inputValue}
                onChange={handleInput}
                placeholder={placeholder}
                className={`${styles.textInput} ma-p`}
            />


            <span
                className={styles.eyeIcon}
                onClick={togglePasswordVisibility}
                role="button"
                tabIndex="0"
            >
                {showPassword ? <FiEyeOff/> : <FiEye/>}
            </span>
        </div>
    )

}