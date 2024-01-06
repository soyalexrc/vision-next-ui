import axios from 'axios';

const baseUrl = process.env.URL_BACKEND;

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
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
