import { useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../lib/authControllers";
import { toast } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { fetchSession } = useContext(AuthContext);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username")
        const email = formData.get("email")
        const cpassword = formData.get("cpassword")
        const password = formData.get("password")

        if (password !== cpassword) {
            return alert("Password does not match");
        }

        const res = await signUp({ username, email, password });
        if (!res) {
            toast.error("Something went wrong!");
            return;
        }
        await fetchSession();
        toast.success("Created your account");
        navigate("/");
    }, [fetchSession, navigate])
    return (

        <section className="grid w-full h-full place-content-center">
            <main className="p-4 border border-gray-500 rounded-md w-auth-width">
                <form className="flex flex-col gap-3 text-center" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Sign Up</h1>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="username" className="text-lg">Username</label>
                        <input type="text" name="username" id="username" className="w-full px-2 py-1 rounded outline-none" placeholder="Username" required />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="username" className="text-lg">Email</label>
                        <input type="email" name="email" id="email" className="w-full px-2 py-1 rounded outline-none" placeholder="Email" required />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="password" className="text-lg">Password</label>
                        <input type="password" name="password" id="password" className="w-full px-2 py-1 rounded outline-none" placeholder="Password" required />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="password" className="text-lg">Confirm Password</label>
                        <input type="password" name="cpassword" id="cpassword" className="w-full px-2 py-1 rounded outline-none" placeholder="Confirm Password" required />
                    </div>
                    <button type="submit" className="py-1 text-white transition rounded bg-slate-800 hover:bg-zinc-950">Submit</button>
                    <p className="text-center">Already have an account? <Link to="/sign-in" className="underline text-blue-950">Login</Link>
                    </p>
                </form>
            </main>
        </section>
    );
}

export default SignUpPage;