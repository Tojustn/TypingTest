import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import fetchUser from "../utils/FetchUser.js";
import checkIfLoggedIn from "../utils/CheckIfLoggedIn.js";
import api from "../api.js";

const ResultsPage = () => {
    const location = useLocation();
    const { wordTable, time, text } = location.state || {};

    const [wrongChar, setWrongChar] = useState(0);
    const [user, setUser] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getUserData = async () => {
            if (checkIfLoggedIn()) {
                const userData = await fetchUser();
                setUser(userData);
            }
        };
        getUserData();
    }, []); 
    useEffect(() => {
        if (!wordTable) return;
        let count = 0;
        for (let row = 0; row < wordTable.length; row++) {
            for (let col = 0; col < wordTable[row].length; col++) {
                const cell = wordTable[row][col];
                if (cell === "upcoming" || cell === "wrong") count++;
            }
        }
        setWrongChar(count);
    }, [wordTable]);

    useEffect(() => {
        const postTest = async () => {
            try {
                const payload = {
                    time,
                    wrongChar,
                    text,
                };
                if (user?._id) {
                    payload.userId = user._id
                    console.log(user._id)
                };

                console.log("Submitting payload:", payload); 
                const result = await api.post("api/test/submitTest", payload);
                console.log(result.data)
                setResultData(result.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error submitting test:", error.response?.data || error.message);
            }
        };

        postTest();
    }, [user, wrongChar]);

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
                        {user && (
                            <div className="text-xl font-medium mb-4 text-center text-blue-300">
                                User: {user.username}
                            </div>
                        )}
                        <div className="bg-gray-800 rounded-lg shadow-lg border border-blue-900 p-6">
                            <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
                                Your Results
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                    <div className="text-gray-400 mb-1 text-center">Adjusted WPM</div>
                                    <div className="text-3xl font-bold text-center text-blue-500">
                                        {resultData.adjWPM.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                    <div className="text-gray-400 mb-1 text-center">Raw WPM</div>
                                    <div className="text-3xl font-bold text-center text-blue-500">
                                        {resultData.rawWPM.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
                                    <div className="text-gray-400 mb-1 text-center">Accuracy</div>
                                    <div className="text-3xl font-bold text-center text-blue-500">
                                        {resultData.accuracy}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;

