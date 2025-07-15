import {useEffect, useState} from "react";

export default function CountdownTimer({styleClasses ="", initialTime = 300, onExpire = () => {}, onReset = () => {}, isRunning=false, setReset, reset}) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (reset){
            setReset(false)
            setTimeLeft(initialTime)
            onReset()
        }
    }, [reset]);

    useEffect(() => {
        let timerId;

        if (isRunning && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning && !reset) {
            onExpire();
        }

        return () => clearInterval(timerId);
    }, [isRunning, timeLeft, onExpire]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    if (timeLeft > 0){
        return (
            <p className={styleClasses}>{formatTime(timeLeft)}</p>
        )
    }
    else{
        return (
            <p className={styleClasses} style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => {setReset(true)}}>Отправить повторно</p>
        );
    }
}
