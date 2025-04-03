import NavBar from "../components/NavBar.jsx"
import { React, useEffect, useState } from "react"
import fetchUser from "../utils/FetchUser.js"
import checkIfLoggedIn from "../utils/CheckIfLoggedIn.js"
import api from "../api.js"
const ResultsPage = (props) => {
    const {wordTable, text, time} = props;
    const [user, setUser] = useState();
    useEffect(() => {
        if (checkIfLoggedIn()) {
            setUser(fetchUser)
        }
    }, [])

    return <div><NavBar /></div>

}
export default ResultsPage;
