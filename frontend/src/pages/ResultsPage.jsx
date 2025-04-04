import NavBar from "../components/NavBar.jsx"
import { React, useEffect, useState } from "react"
import fetchUser from "../utils/FetchUser.js"
import checkIfLoggedIn from "../utils/CheckIfLoggedIn.js"
import api from "../api.js"
const ResultsPage = (props) => {
    const { wordTable, text, time } = props;
    const [user, setUser] = useState();
    useEffect(() => {
        const getUserData = async () => {
            if (checkIfLoggedIn()) {
                const userData = await fetchUser()
                setUser(userData)

            }
        }
        getUserData()
    }, [])

    return (<NavBar route={user ? "/user" : "/login"} />)

}
export default ResultsPage;
