import axios from "axios";


export const apiDb = axios.create({
    baseURL: "http://localhost:4000/api",
});