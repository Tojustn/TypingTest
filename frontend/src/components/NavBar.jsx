import { Link } from "react-router-dom"
import logo from "../assets/TypingLogo.png"
import {UserIcon} from "../assets/icons/UserIcons.jsx"
const NavBar = (props) => {
    return <div className=" w-full mb-3 z-10 start-0 top-0 absolute">
        <nav className= "flex w-full flex-row items-center justify-between px-6 py-3">
            <Link to="/">
                <img src={logo} className="h-15 w-auto object-contain" alt="Astrotype Logo" />
            </Link>
            <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/justintocs/" className="opacity-70 hover:opacity-100 hover:text-spacelight">About Me</a>
                <Link to={`${props.route}`} className="opacity-70 hover:opacity-100">
                    <UserIcon/>
                </Link>
            </div>
        </nav>
    </div>
}

export default NavBar;
