import { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom"
const AuthForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const handleSubmit = async (e) => {
        console.log("Submit Request"); // This should now log
        try {
            e.preventDefault(); // Prevent Page From Reloading
            const response = await api.post(props.route, { username, password })
            if (response.status === 200){
                nav("/")
            }
        } catch (err) {
            alert("Error occured, try logging in with the correct username and password")        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-spacedark border-star border rounded-2xl text-white gap-7 p-5 w-100 h-auto flex flex-col justify-center items-center">
            <h1 className="font-bold">{props.type}</h1>
            <div className="w-full">
                <label htmlFor="username" className="block mb-1">Username</label>
                <input
                    id="username"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="w-full">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                    id="password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="w-full my-2 cursor-pointer bg-star rounded py-1">{props.type}</button>
        </form>
    );
};

export default AuthForm;
