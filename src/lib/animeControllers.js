import axios from "axios";
import { toast } from "react-hot-toast";
import config from "./config";

export const fetchAnimes = async (title) => {
    try {

        const url = new URL(`${import.meta.env.VITE_SERVER_URL}/api/anime`);
        if (title) {
            url.searchParams.set('title', title)
        }

        const res = await axios.get(url.toString(), config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const uploadFile = async (file) => {
    try {

        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/upload`, { image: file }, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchAnime = async (id) => {
    try {

        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/anime/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const editAnime = async (anime) => {
    try {

        const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/anime/${anime._id}`, anime, config);

        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully updated", { position: "top-right" })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnime = async (animeId) => {
    try {

        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/anime/${animeId}`, config);
        if (res.status !== 200) {
            return toast.error("Something went wrong", { position: "top-right" })
        }

        toast.success("Anime successfully deleted", { position: "top-right" })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const addAnime = async (anime) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/anime`, anime, config);
        if (res.status !== 201) {
            return toast.error("Something went wrong", { position: "top-right" })
        }
        toast.success("Anime successfully added", { position: "top-right" })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}