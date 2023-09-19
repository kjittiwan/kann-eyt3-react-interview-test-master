import axios from "axios";
import applyMockAdapter from "./mock";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173",
});
applyMockAdapter(axiosInstance);

export default axiosInstance;
