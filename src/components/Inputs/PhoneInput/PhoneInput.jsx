import styles from "./PhoneInput.module.scss"

export default function PhoneInput({inputValue, setInputValue, placeholder = "", maxLength = 30, adaptive = true,}) {
    const handleInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            formattedValue += '+7 ';
        }
        if (value.length > 1) {
            formattedValue += `(${value.slice(1, 4)}`;
        }
        if (value.length > 4) {
            formattedValue += `) ${value.slice(4, 7)}`;
        }
        if (value.length > 7) {
            formattedValue += `-${value.slice(7, 9)}`;
        }
        if (value.length > 9) {
            formattedValue += `-${value.slice(9, 11)}`;
        }

        // Ограничиваем длину строки
        if (formattedValue.length <= maxLength) {
            setInputValue(formattedValue);
        }
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder={placeholder || '+7 (___) ___-__-__'}
            className={`${styles.textInput} ${adaptive ? "ma-p" : ""}`}
        />
    );
}