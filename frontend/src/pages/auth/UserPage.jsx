import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar.jsx";
import FetchUser from "../../utils/FetchUser.js"
const UserPage = () => {
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
            .then(() => alert("Successful Logout"))
            .catch((error) => console.log(error));
    };
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
    <div className="flex flex-col w-full h-full">
      <NavBar route="/user" />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center ">
        <div className="max-w-4xl mx-auto bg-light2 rounded-lg shadow-md w-full">
          <div className="bg-dark2 p-6 text-center">
            <h1 className="text-star text-5xl font-bold mb-2">
              {user.username}
            </h1>
          </div>
          
          {/* Stats section */}
          <div className="p-6">
            <h3 className="text-star text-3xl font-semibold border-b-2 border-dark2 pb-2 mb-4">
              Stats
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-500">Average WPM</p>
                <p className="text-4xl font-bold text-dark2">{user.avgWPM.toFixed(2)}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-500">Top WPM</p>
                <p className="text-4xl font-bold text-dark2">{user.topWPM.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="px-6 pb-6 flex justify-end">
            <button 
              onClick={LogOut}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
