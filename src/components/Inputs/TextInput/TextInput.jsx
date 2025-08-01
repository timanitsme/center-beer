import styles from "./TextInput.module.scss"

export default function TextInput({inputValue, setInputValue, placeholder="", maxLength=30, adaptive=true}){
    const handleInput = (e) => {
        if (e.target.value.length < maxLength){
            setInputValue(e.target.value)
        }
    };

    return(
        <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder={placeholder}
            className={`${styles.textInput} ${adaptive? "ma-p": ""}`}
        />
    )
}