import { useImperativeHandle, useState, useEffect } from "react"
const Stopwatch = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [ isActive]);

    const seconds = (time) / 100;

    const StartAndStop = () => {
        setIsActive(!isActive)

    }

    const reset = () => {
        setTime(0)
    }

    const getTime = () => {
        return seconds.toFixed(2)
    }
    useImperativeHandle(props.ref, () => {
        return {
            StartAndStop,
            reset,
            getTime,
            isActive
        }

    }, [time, isActive])
    return <div className={props.canSee ? "" : "hidden"}>{seconds}</div>
}


export default Stopwatch
