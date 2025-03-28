import { useImperativeHandle, useEffect, useState } from "react";
const Timer = (props) => {
    const [isActive, setIsActive] = useState(false)

    const ref = props.ref
    // Time will be in seconds
    const [curTime, setCurTime] = useState(props.time)

    // change time whenever timer mode changes
    useEffect(() => {
        setCurTime(props.time);
    }, [props.time]);

    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => { setCurTime(prevTime => prevTime - 1) }, 1000)
        // on dismount remove intervalId
        return () => clearInterval(intervalId)


    }, [isActive])

    const StartStopTimer = () => {
        setIsActive(!isActive)

    }

    const getTime = () => {
        return curTime
    }

    useImperativeHandle(ref, () => {
        return {
            StartStopTimer,
            getTime,
        }

    })
    return <div className={props.canSee ? "" : "hidden"}> {curTime} </div>


}

export default Timer
