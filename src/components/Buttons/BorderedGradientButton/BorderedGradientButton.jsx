import styles from "./BorderedGradientButton.module.css"

export default function BorderedGradientButton({text, onClick = () => {}}){
    return (
        <button className={styles.gradientButton} onClick={onClick}>
            <p>{text}</p>
        </button>
    );
}
