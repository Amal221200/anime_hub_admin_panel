/* eslint-disable react/prop-types */
import { createContext, useCallback } from "react"
import config from "../lib/config";
import axios from "axios";
import { toast } from 'react-hot-toast';

export const AnimeContext = createContext();

export default function AnimeProvider({ children }) {

    const fetchAnimes = useCallback(async (title) => {
        const url = new URL(`${import.meta.env.VITE_SERVER_URL}/api/anime`);
        if (title) {
            url.searchParams.set('title', title)
        }

        const res = await axios.get(url.toString(), config);
        return res.data;
    }, [])

    const fetchAnime = useCallback(async (id) => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/anime/${id}`, config);
        return res.data;
    }, [])

    const editAnime = useCallback(async (anime) => {
        const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/anime/${anime._id}`, anime, config);

        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully updated", { position: "top-right" })
    }, [])

    const deleteAnime = useCallback(async (animeId) => {
        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/anime/${animeId}`, config);
        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully deleted", { position: "top-right" })
    }, [])

    const addAnime = useCallback(async (anime) => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/anime`, anime, config);
       
        if (res.status !== 201) {
            return toast.error("Something went wrong", { position: "top-right" })
        }

        toast.success("Anime successfully added", { position: "top-right" })
    }, [])

    return (
        <AnimeContext.Provider value={{ fetchAnimes, fetchAnime, addAnime, editAnime, deleteAnime }}>
            {children}
        </AnimeContext.Provider>
    )
}