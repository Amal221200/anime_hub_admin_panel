import { Link, useResolvedPath } from "react-router-dom"
import { capitalize } from "../lib/utils"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const links = [
    {
        href: "/",
        text: "Anime"
    },
    {
        href: "/users",
        text: "Users"
    }
]
const Header = () => {
    const { pathname } = useResolvedPath();
    const { user } = useContext(AuthContext);
    return (
        <header className="flex flex-col gap-2">
            <h1 className="text-2xl text-center">Welcome Back <span className="font-bold">{capitalize(user?.username)}</span>!</h1>
            <nav className="flex gap-2">
                {
                    links.map((link) => (
                        <Link key={link.href} to={link.href} className={`text-lg transition-opacity ${link.href === pathname ? 'underline font-semibold' : 'no-underline font-normal'}`}>
                            {link.text}
                        </Link>
                    ))
                }
            </nav>
        </header>
    )
}

export default Header