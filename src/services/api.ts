import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;
console.log(baseURL)
export const api = axios.create({
    baseURL
});

api.defaults.headers.common.Accept = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";
