import { useState, useEffect, React } from "react"
import NavBar from "../components/NavBar.jsx"
import CheckAuth from "../utils/CheckIfLoggedIn.js"
import checkCookies from "../utils/checkCookies.js"
import randomWords from "../utils/random-words.js"
import Word from "../components/Word.jsx"
const HomePage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [curMode, setCurMode] = useState(10)
    const [text, setText] = useState([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    // Acts as a 2d array, columns are words, rows are letters
    const [status, setStatus] = useState([])
    const createShallowCopy = (state) => {
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
            console.log("isVisible False")
            setIsVisible(false);
            return
        }
        else if (keyName === "Backspace") {
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
        // handleKeyPress needs to be reloaded whenever text is updated because it holds the old text values functions are close-over
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

    }, [text])
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
        if (curMode.isInteger) {
            // Should've used TS 
            setText(randomWords(curMode))

        }
    }, [curMode])

    return (
        <div className="h-full w-full flex flex-col justify-center">
            <NavBar route={isUser ? "/user" : "/login"} />
            <section className="flex-1 flex flex-col items-center justify-center">
                <main className=" w-full px-20 md:px-100">
                    {isVisible ?

                        <div className="blur-md flex flex-wrap flex-row justify-center 2">
                            {/*Passing Both word and wordIndex into Word component*/}
                            {text.map((word, WordIndex) => <div className=" mx-2"><Word className="" status={status[WordIndex]} word={word}></Word></div>)}

                        </div>

                        :
                        <div className="flex flex-wrap flex-row justify-center 2">
                            {/*Passing Both word and wordIndex into Word component*/}
                            {text.map((word, WordIndex) => <div className=" mx-2"><Word className="" status={status[WordIndex]} word={word}></Word></div>)}

                        </div>
                    }
                    <div> {userInput} </div>
                </main>
                {isVisible ? <p className="z-50 opacity-70 absolute">Press Space to Begin Typing</p> : null}
            </section>
        </div>
    )
}
export default HomePage;
