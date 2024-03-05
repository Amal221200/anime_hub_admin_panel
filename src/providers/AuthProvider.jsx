import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import config from "../lib/config";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const signIn = useCallback(async (user) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/auth`, user, config);

        if (res.status !== 200) {
            return;
        }

        setUser(res.data.user)
        toast.success("Signed In scuccessfully")
    }, []);

    const signUp = useCallback(async (user) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/sign-up`, user, config);

        if (res.status !== 201) {
            return;
        }

        setUser(res.data.user);
        toast.success("Signed Up scuccessfully")
    }, [setUser]);

    const signOut = useCallback(async () => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/sign-out`, config);

        if (res.status !== 200) {
            return null;
        }

        setUser(null);
        toast.success("Signed Out scuccessfully")
    }, []);

    const fetchSession = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/auth`, config);
            setUser(res.data.user);

            return res.data
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/sign-in")
                toast.error("Unauthenticated")
                setUser(null);
            }
            return null;
        }
    }, [navigate]);

    useEffect(() => {
        fetchSession();
    }, [fetchSession])

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, fetchSession }}>
            {children}
        </AuthContext.Provider>
    )
}