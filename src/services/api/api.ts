import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_LOCAL_IP:3000/",
});
