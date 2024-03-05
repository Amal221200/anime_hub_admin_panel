/* eslint-disable react/prop-types */
import { createContext, useCallback } from "react"
import ApiFetcher from "../lib/ApiFetcher";
import { toast } from 'react-hot-toast';

export const AnimeContext = createContext();

export default function AnimeProvider({ children }) {

    const fetchAnimes = useCallback(async (title) => {
        const url = new URL(`/api/anime`, import.meta.env.VITE_SERVER_URL);
        if (title) {
            url.searchParams.set('title', title)
        }

        const res = await ApiFetcher.get(url.pathname);
        return res.data;
    }, [])

    const fetchAnime = useCallback(async (id) => {
        const res = await ApiFetcher.get(`/api/anime/${id}`);
        return res.data;
    }, [])

    const editAnime = useCallback(async (anime) => {
        const res = await ApiFetcher.put(`/api/anime/${anime._id}`, anime);

        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully updated", { position: "top-right" })
    }, [])

    const deleteAnime = useCallback(async (animeId) => {
        const res = await ApiFetcher.delete(`/api/anime/${animeId}`);
        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully deleted", { position: "top-right" })
    }, [])

    const addAnime = useCallback(async (anime) => {
        const res = await ApiFetcher.post(`/api/anime`, anime);
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