
import { React } from "react"
import {useMode} from "../utils/Contexts.jsx"
const ModeButtons = () => {

    // Passing in objects from Mode Context
    const {mode, setMode} = useMode();
    const modes = [
        { id: 'time-15', label: '15s', duration: 15 },
        { id: 'time-30', label: '30s', duration: 30 },
        { id: 'time-60', label: '1m', duration: 60 },
        { id: 'time-120', label: '2m', duration: 120 },
        { id: 'words-25', label: '25 Words', wordCount: 25 },
        { id: 'words-50', label: '50 Words', wordCount: 50 },
        { id: 'words-100', label: '100 Words', wordCount: 100 },
        { id: 'short-quote', label: '""' },
        { id: 'long-quote', label: '"..."' }
    ];

    return (
        <div className="w-full flex justify-center absolute top-40">
            <div className="rounded-2xl bg-dark2 opacity-80 max-w-3xl px-4 py-2">
                <section className="flex flex-row justify-center items-center">
                    {modes.map((modes) => (
                        <div key={modes.id} onClick={()=>setMode(modes)} className="px-4 hover:text-star">{modes.label}</div>))}
                </section>
            </div>
        </div>
    )
}
export default ModeButtons
