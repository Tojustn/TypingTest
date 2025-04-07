import { useEffect, useState } from "react"
import api from "../../api.js"
import NavBar from "../../components/NavBar.jsx";
import FetchUser from "../../utils/FetchUser.js"
import {useNavigate} from "react-router-dom"
import { LogOutIcon } from "../../assets/icons/LogOut.jsx"
const UserPage = () => {
    const nav = useNavigate();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const testUser = {
        username: "Justin",
        avgWPM: "90",
        topWPM: "300"
    }
    useEffect(() => {
        const getUser = async () => {

            const userData = await FetchUser();
            setUser(userData)
            setIsLoading(false)
        }

        getUser();
    }
        , [])
    const LogOut = async () => {
        await api.get("api/auth/logout")
            .catch((error) => console.log(error))

        nav("/")


    }
    if (isLoading) {
        return (
            <div className="justify-center flex flex-col w-full h-full">
                <NavBar route="/user" />
                <section className="text-center flex flex-col">
                    <h1 className='text-star text-5xl font-bold '> Loading </h1>
                </section>
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col bg-gray-900 text-gray-100">
            <NavBar route="/user" />
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full">
                    <section className="text-center flex flex-col">
                        <h1 className="px-7 py-3 bg-gray-800 border border-blue-900 rounded-lg m-1 w-auto text-blue-400 text-5xl font-bold inline-block mx-auto mb-6">
                            {user.username}
                        </h1>

                        <section className="bg-gray-800 rounded-lg shadow-lg border border-blue-900 p-6">
                            <h3 className="text-blue-400 text-3xl font-bold mb-6 underline">Stats</h3>

                            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700 w-full md:w-1/2">
                                    <div className="text-gray-400 mb-1 text-center">Average WPM</div>
                                    <div className="text-3xl font-bold text-center text-blue-500">{user.avgWPM.toFixed(2)}</div>
                                </div>
                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700 w-full md:w-1/2">
                                    <div className="text-gray-400 mb-1 text-center">Top WPM</div>
                                    <div className="text-3xl font-bold text-center text-blue-500">{user.topWPM.toFixed(2)}</div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <div className="flex justify-center">
                        <button className = "opacity-70 hover:opacity-100" onClick = {LogOut}>
                            <LogOutIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserPage
