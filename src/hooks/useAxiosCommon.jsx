import axios from "axios";

const axiosCommon=axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL:import.meta.env.VITE_API_URL
})

const useAxiosCommon = () => {
    return axiosCommon
};

export default useAxiosCommon;