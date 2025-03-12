import { useState, useEffect, React } from "react"
import NavBar from "../components/NavBar.jsx"
import CheckAuth from "../utils/CheckIfLoggedIn.js"
import checkCookies from "../utils/checkCookies.js"
import randomWords from "../utils/random-words.js"
const HomePage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [curMode, setCurMode] = useState(10)
    const [text, setText] = useState([]);


    const handleKeyPress = (event) => {
        const keyName = event.key;
        if (keyName === " " && isVisible === true) {
            setIsVisible(false);
        }
        else {
            setUserInput(keyName);
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)

        const CheckUser = async () => {
            checkCookies()
            const loggedIn = await CheckAuth();
            setIsUser(loggedIn);
            console.log(loggedIn);
        };

        CheckUser();

        setText(randomWords(10))
        return () => {
            window.removeEventListener('keydown', handleKeyPress)

        }
    }, []); // 

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
                    {isVisible ? <div className="blur-md flex flex-wrap flex-row justify-center">
                        {text.map(word => <div className="mx-1">{word}</div>)}
                    </div> :
                        <div className="flex flex-wrap flex-row justify-center">
                            {text.map(word => <div className="mx-1">{word}</div>)}
                        </div>
                    }
                </main>
                {isVisible ? <p className="z-50 opacity-70 absolute">Press Space to Begin Typing</p> : null}
            </section>
        </div>
    )
}
export default HomePage;
