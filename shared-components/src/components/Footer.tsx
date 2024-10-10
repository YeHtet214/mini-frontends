import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { LiaGithub } from "react-icons/lia";

const Footer = () => {
    return (
        <footer className="text-center bg-slate-500 w-full py-2 text-slate-200">
            <p>© 2024 Mini Frontend Sample. All rights reserved.</p>
            <ul className="flex items-center justify-center gap-2 mt-2">
                <li><CiFacebook className="text-red-400 cursor-pointer" /></li>
                <li><CiTwitter className="text-red-400 cursor-pointer" /> </li>
                <li><CiInstagram className="text-red-400 cursor-pointer" /> </li>
                <li><LiaGithub className="text-red-400 cursor-pointer" /> </li>
            </ul>
        </footer>
    )
}

export default Footer;