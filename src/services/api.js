// api.js
import axios from "axios"; // ✅ ES6 import

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default API;
