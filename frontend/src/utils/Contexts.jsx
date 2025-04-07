// Context 
// custom hook to use ModeContext specifically
import {useState, createContext,React,useContext} from "react"

export const ModeContext = createContext();

export const ModeProvider = ({children}) => {   
    const [mode, setMode] = useState( { id: 'words-10', label: '10 Words', wordCount: 10 });

    return (
        <ModeContext.Provider value={{setMode, mode}}>
            {children}

        </ModeContext.Provider>
    )
}

export const useMode = () => {

    return useContext(ModeContext)

}
