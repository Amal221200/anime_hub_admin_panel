import axios from "axios";

const ApiFetcher = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withXSRFToken: true,
    // withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
})

export default ApiFetcher;