import axios from "axios";

const baseUrl = "http://100.42.69.119:3000/api/v1";
const baseUrlDev = "http://localhost:3000/api/v1";

export const http = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        // "Cache-Control": "no-cache, no-store, must-revalidate",
        // "Pragma": "no-cache",
        // "Expires": "0"
    },
});

// http.interceptors.request.use(
//     (config) => {
//         config.headers.Authorization = `Bearer sometoken`;
//         return config;
//     },
//     (err) => {
//         throw new Error(err);
//         // some action
//     }
// );
