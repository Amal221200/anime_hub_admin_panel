import { useContext } from "react";
import {  useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider";

const SignInPage = () => {
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");

        signIn({ username, password }).then(() => {
            navigate(-1);
        });
    }

    return (

        <section className="grid w-full h-full place-content-center">
            <main className="p-4 border border-gray-500 rounded-md w-auth-width">
                <form className="flex flex-col gap-3 text-center " onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Login</h1>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="username" className="text-lg">Username</label>
                        <input type="text" name="username" id="username" className="w-full px-2 py-1 rounded outline-none" placeholder="Username" required />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="password" className="text-lg">Password</label>
                        <input type="password" name="password" id="password" className="w-full px-2 py-1 rounded outline-none" placeholder="Password" required />
                    </div>
                    <button type="submit" className="py-1 text-white transition rounded bg-slate-800 hover:bg-zinc-950">Submit</button>
                    
                </form>
            </main>
        </section>
    );
}

export default SignInPage;