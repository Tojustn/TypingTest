import { useImperativeHandle, useState, useEffect } from "react"
const Stopwatch = ( {ref}) => {
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
    useImperativeHandle(ref, () => {
        return {
            StartAndStop,
            reset,
            getTime,
            isActive
        }

    }, [])
    return <div> {seconds} </div>
}


export default Stopwatch
