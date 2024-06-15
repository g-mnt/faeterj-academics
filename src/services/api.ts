import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
    baseURL
});

export const setApiToken = (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.defaults.headers.common.Accept = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";
