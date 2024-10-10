import { useEffect, useState } from "react";
import "../index.css";
const Header = () => {
    const [activeLink, setActiveLilnk] = useState(window.location.port);

    useEffect(() => {
        setActiveLilnk(window.location.port);
    }, [window.location.port])

    return (
        <header className="">
            <nav className="py-2 px-4 lg:py-2 lg:px-8 flex justify-between items-center shadow">
                <h2 className="text-2xl text-red-700 "><span className="text-xs">Mini_</span><hr />Frontend</h2>
                <ul className="flex text-slate-500 tracking-wider">
                    <li><a href="http://localhost:3001" className={`${activeLink === "3001" ? "text-red-500" : "hover:text-slate-700"} ml-4 uppercase text-sm font-bold inline-block transition-transform duration-300 hover:scale-110 `}>Sale</a></li>
                    <li><a href="http://localhost:3002" className={`${activeLink === "3002" ? "text-red-500" : "hover:text-slate-700"} ml-4 uppercase text-sm font-bold inline-block transition-transform duration-300 hover:scale-110 `}>Contact</a></li>
                    <li><a href="http://localhost:3003" className={`${activeLink === "3003" ? "text-red-500" : "hover:text-slate-700"} ml-4 uppercase text-sm font-bold inline-block transition-transform duration-300 hover:scale-110 `}>Product</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;