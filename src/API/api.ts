import axios from "axios";

const url = "https://notesapi.satvikreddy.com";

const api = axios.create({
  baseURL: url,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
