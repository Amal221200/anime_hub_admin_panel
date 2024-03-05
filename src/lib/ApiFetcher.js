import axios from "axios";

const ApiFetcher = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

export default ApiFetcher