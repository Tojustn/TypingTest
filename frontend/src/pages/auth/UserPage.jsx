import {useEffect, useState} from "react"
import NavBar from "../../components/NavBar.jsx";
import FetchUser from "../../utils/FetchUser.js"
const UserPage = () => {
    const [user, setUser] = useState();
    useEffect( () => {
        const getUser = async()=>{

            const userData  = await FetchUser();
            setUser(userData)
         }

        getUser();
    }
        ,[])
    return (
        <div className = "flex flex-col w-full h-full">
            <NavBar route="/user" />
            <h1> Hello! {user}</h1>
        </div>

    )
}

export default UserPage
