// Returns true if a stopwatch is needed vs a timer
import {useMode} from "../utils/Contexts.jsx"


const isStopwatch = () => {
const modeContext = useMode();
    const mode = modeContext.mode
    // isNaN checks if value is Not a Number
    if(mode.duration){
        return false;
    }
    else{
        return true;
    }
}
export default isStopwatch;
