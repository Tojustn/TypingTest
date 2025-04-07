import NavBar from "../components/NavBar.jsx"
import { React, useEffect, useState } from "react"
import fetchUser from "../utils/FetchUser.js"
import checkIfLoggedIn from "../utils/CheckIfLoggedIn.js"
import api from "../api.js"
import { useLocation } from "react-router-dom"
const ResultsPage = () => {
    // Grab the  variables given through nav
    const location = useLocation();
    const { wordTable, time, text } = location.state || {};
    const [user, setUser] = useState();
    const [wrongChar, setWrongChar] = useState(0);
    const [resultData, setResultData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const postTest = async () => {
        try {
            const result = await api.post("api/test/submitTest", {
                time: time,
                wrongChar: wrongChar,
                text: text
            });
            setResultData(result.data);
            setIsLoading(false)
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    }

    useEffect(() => {
        console.log(time)
        console.log(wordTable)
        const getUserData = async () => {
            if (checkIfLoggedIn()) {
                const userData = await fetchUser()
                setUser(userData)

            }
        }
        getUserData()
        for (let row = 0; row < wordTable.length; row++) {

            for (let col = 0; col < wordTable[row].length; col++) {

                const cell = wordTable[row][col]
                if (cell === "upcoming" || cell === "wrong") {
                    setWrongChar(prevChar => prevChar + 1)
                }
            }
        }

        postTest();

    }, [wordTable, text, time])
return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-gray-100">
        <NavBar route={user ? "/user" : "/login"} />
        {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-3xl text-blue-400">Loading...</div>
            </div>
        ) : (
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full">
                    {user && <div className="text-xl font-medium mb-4 text-center text-blue-300">User: {user.username}</div>}
                    <div className="bg-gray-800 rounded-lg shadow-lg border border-blue-900 p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Your Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                <div className="text-gray-400 mb-1 text-center">Adjusted WPM</div>
                                <div className="text-3xl font-bold text-center text-blue-500">{resultData.adjWPM}</div>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                <div className="text-gray-400 mb-1 text-center">Raw WPM</div>
                                <div className="text-3xl font-bold text-center text-blue-500">{resultData.rawWpm}</div>
                            </div>
                            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                <div className="text-gray-400 mb-1 text-center">Accuracy</div>
                                <div className="text-3xl font-bold text-center text-blue-500">{resultData.accuracy}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
);

}
export default ResultsPage;
