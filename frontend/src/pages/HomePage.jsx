import { useState, useEffect, React } from "react"
import NavBar from "../components/NavBar.jsx"
import CheckAuth from "../utils/CheckIfLoggedIn.js"
import checkCookies from "../utils/checkCookies.js"
const HomePage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        const CheckUser = async () => {
             checkCookies()
            const loggedIn = await CheckAuth();
            setIsUser(loggedIn);
            console.log(loggedIn);
        };

        CheckUser();
    }, []); // 
    return (
        <div className="h-full w-full flex flex-col justify-center">
            <NavBar route={isUser ? "/user" : "/login"} />
            <section className="flex-1 flex flex-col items-center justify-center">
                {isVisible ? <p className="opacity-70">Press Space to Begin Typing</p> : null}
            </section>
        </div>
    )
}
export default HomePage;
