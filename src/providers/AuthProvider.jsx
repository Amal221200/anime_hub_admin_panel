/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import config from "../lib/config";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    const fetchSession = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/auth`, config);
            setUser(res.data);

            return res.data
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/auth/sign-in")
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
        <AuthContext.Provider value={{ user, fetchSession }}>
            {children}
        </AuthContext.Provider>
    )
}