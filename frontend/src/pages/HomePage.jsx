import api from "../api.js"
import { useMode } from "../utils/Contexts.jsx"
import ModeButtons from "../components/ModeButtons.jsx"
import isStopwatch from "../utils/isStopwatch.js"
import Stopwatch from "../components/Stopwatch.jsx"
import Timer from "../components/Timer.jsx"
import { useState, useEffect, useRef, React } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import CheckAuth from "../utils/CheckIfLoggedIn.js"
import checkCookies from "../utils/checkCookies.js"
import randomWords from "../utils/random-words.js"
import Word from "../components/Word.jsx"
const HomePage = () => {
    
    const { mode, setMode } = useMode();
    const stopwatchRef = useRef(null)
    const timerRef = useRef(null)
    const [isTimer, setIsTimer] = useState(false)
    const nav = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [text, setText] = useState([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    // Acts as a 2d array, columns are words, rows are letters
    const [status, setStatus] = useState([])

    // Finds the current letter and changes the state
    const createShallowCopy = (state) => {


        console.log(`time = ${stopwatchRef.current.getTime()}`)

         let time 
        if (mode.wordCount) {
           time = stopwatchRef.current.getTime();
        }
        // save time before stopping stopwatch
        const prevWordIndex = wordIndex - 1;
        let newWordIndex = wordIndex
        let newLetterIndex = letterIndex
        console.log(`Letter Index ${letterIndex}`)
        console.log(`Word Index ${wordIndex}`)
        if (state === "upcoming") {
            if (letterIndex === 0 && wordIndex > 0) {
                newLetterIndex = text[prevWordIndex].length - 1
                newWordIndex = prevWordIndex
            }
            else newLetterIndex -= 1
        }
        setStatus(status.map((words, wordsIndex) => {
            if (wordsIndex === newWordIndex) {
                return words.map((thisLetter, thisLetterIndex) => {
                    if (thisLetterIndex === newLetterIndex) {
                        // return shallow copy
                        return state;
                    }
                    return thisLetter
                })
            }
            return words
        }))
        if (state === "correct" && letterIndex === text[wordIndex].length - 1 && wordIndex === text.length - 1) {
            console.log("navigating to results page")
            console.log(mode.wordCount)
            if (mode.wordCount) {
                console.log(`Final time ${time}`)
                nav("/results", { state: { wordTable: status, text: text, time: time } })

            }
            else {
                nav("/results", { state: { wordTable: status, text: text, time: mode.duration } })

            }
        }
    }


    const handleKeyPress = (event) => {
        console.log(isVisible)
        console.log(text)

        if (!text && text.length === 0) {
            console.log("no text")

            return
        }


        if (!text[wordIndex] || !text[wordIndex][letterIndex]) {
            console.log("Letter or word doesnt exist")
            console.log(letterIndex)
            console.log(wordIndex)
        };
        const keyName = event.key;
        if (keyName === " " && isVisible === true) {
            setIsVisible(false);
            if (stopwatchRef.current) {
                setTimeout(() => {
                    stopwatchRef.current.StartAndStop()
                }, 0)
            }
            else {

                setTimeout(() => {
                    timerRef.current.StartAndStop()
                }, 0)

            }
            return
        } else if (keyName === "Backspace") {
            if (letterIndex != 0) {
                setLetterIndex(letterIndex => letterIndex - 1)
                createShallowCopy("upcoming")
                console.log(letterIndex)
            }
            else if (letterIndex === 0 && wordIndex > 0) {

                const prevWordIndex = wordIndex - 1;
                setWordIndex(prevWordIndex);
                setLetterIndex(text[prevWordIndex].length - 1);
                createShallowCopy("upcoming");

            }
            return

        }
        else if (keyName !== "Shift" && keyName !== "Control" && keyName !== "Alt" && !keyName.includes("Arrow")) {
            setUserInput(prevInput => prevInput + keyName);
        }
        else {

            return

        }
        // Create shallow copy
        if (keyName != " ") {
            if (keyName === text[wordIndex][letterIndex]) {
                createShallowCopy("correct")

            }
            else if (keyName != text[wordIndex][letterIndex]) {

                createShallowCopy("wrong")
            }
        }
        console.log(`Word length ${text[wordIndex].length - 1}`)
        if (letterIndex >= text[wordIndex].length - 1 && keyName === " ") {

            console.log("Next word")

            setWordIndex(wordIndex => wordIndex + 1)
            setLetterIndex(0)
        }
        else {


            setLetterIndex(letterIndex => letterIndex + 1)
        }

        console.log(`Text word index ${wordIndex}`)
        console.log(`Letter word index ${letterIndex}`)


    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)

        }

    }, [text, wordIndex, letterIndex, status, isVisible]);

    useEffect(() => {


        const grid = []
        const textLength = text.length;
        for (let i = 0; i < textLength; i++) {
            grid[i] = []
            for (let j = 0; j < text[i].length; j++) {
                grid[i].push("upcoming")
            }
        }
        setStatus(grid)

    }, [text, mode])
    useEffect(() => {
        setText(randomWords(10))
        const CheckUser = async () => {
            checkCookies()
            const loggedIn = await CheckAuth();
            setIsUser(loggedIn);
            console.log(loggedIn);
        };

        CheckUser();

    }, [])
    useEffect(() => {
        setLetterIndex(0)
        setWordIndex(0)
        setUserInput("")
        if (stopwatchRef.current) {
            stopwatchRef.current.reset()
        }
        console.log(mode)
        console.log(mode.wordCount)
        if (mode.wordCount) {
            // Correctly set text using randomWords
            setText(randomWords(mode.wordCount));
        }
        else if (mode.duration) {
            setText(randomWords(10))
        }
    }, [mode]);
    return (
        <div className="h-full w-full flex flex-col justify-center">
            <NavBar route={isUser ? "/user" : "/login"} />

            {isVisible ? null : <ModeButtons />}
            <section className="flex-1 flex flex-col items-center justify-center">
                <main className=" w-full px-20 md:px-100 text-xl">
                    {isStopwatch() ? (
                        <Stopwatch
                            ref={stopwatchRef}

                            canSee={!isVisible}
                        />

                    ) : (
                        <Timer
                            ref={timerRef}
                            time={mode.duration}

                            canSee={!isVisible}
                        />
                    )}
                    {isVisible ?
                        <div className="max-h-50 overflow-y-auto blur-md flex flex-wrap flex-row justify-center text-3xl ">
                            {/*Passing Both word and wordIndex into Word component*/}
                            {text.map((word, WordIndex) => <div className="my-2 mx-2"><Word className="" status={status[WordIndex]} word={word}></Word></div>)}

                        </div>

                        :

                        <div className="max-h-50 overflow-y-auto flex flex-wrap flex-row justify-center text-3xl">

                            {text.slice(Math.max(0, wordIndex - 9), wordIndex + 9).map((word, displayIndex) => <div className="key={displayIndex +wordIndex} mx-2 my-2 relative"><Word className="" status={status[Math.max(0, wordIndex - 9) + displayIndex]} word={word}></Word></div>)}

                        </div>
                    }
                    <div> {userInput.slice(-1)} </div>
                </main>
                {isVisible ? <p className="z-50 opacity-70 absolute">Press Space to Begin Typing</p> : null}
            </section>
        </div>
    )
}
export default HomePage;
