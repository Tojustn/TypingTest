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
    }, [isActive]);

    // Don't need useState because its derived from the time useState
    const seconds = Math.floor((time) / 100);

    const StartAndStop = () => {
        setIsActive(!isActive)

    }

    const reset = () => {
        setTime(0)
    }

    const getTime = () => {
        return time
    }
    useImperativeHandle(props.ref, () => {
        return {
            StartAndStop,
            reset,
            getTime,
            isActive
        }

    }, [])
    return <div className={props.canSee ? "" : "hidden"}>{seconds}</div>
}


export default Stopwatch
