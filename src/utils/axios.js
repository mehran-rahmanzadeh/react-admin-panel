import axios from "axios";

export const axiosInstance = axios.create(
    {baseURL: "http://localhost:8000"}
)
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access")}`
axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    } else {
        return Promise.reject(error);
    }
});