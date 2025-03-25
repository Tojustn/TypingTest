import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';
import UserPage from "./pages/auth/UserPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
function App() {
    return (
        <div className="bg-spacebg h-screen w-screen text-white font-sans">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/results" element={<ResultsPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
