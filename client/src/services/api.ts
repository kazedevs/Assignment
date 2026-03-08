import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
})

export const generateCategory = async(data: unknown) => {
    const response = await API.post("/category", data);
    return response.data;
}

export const generateProposal = async(data: unknown) => {
    const response = await API.post("/proposal", data);
    return response.data;
}