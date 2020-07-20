import axios from "axios";

const url = "http://localhost:5000";

const api = axios.create({
  baseURL: url,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
