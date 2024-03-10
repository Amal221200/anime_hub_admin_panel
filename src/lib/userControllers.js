import config from "./config";
import axios from "axios";

export const fetchAllUser = async (username) => {
    const url = new URL(`${import.meta.env.VITE_SERVER_URL}/api/user`);

    if (username) {
        url.searchParams.append('username', username);
    }
    // console.log(url.toString());
    const res = await axios.get(url.toString(), {
        ...config
    });
    return res.data;
}

export const updateUser = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/user/${id}`, data, {
        ...config
    });

    return res.data
}

export const deleteUser = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/user/${id}`, {
        ...config
    });

    return res.data
}