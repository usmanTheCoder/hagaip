import axios from "axios";
import { decryptedToken } from "../src/helpers/decryption";
const API = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_URL });
const token = localStorage.getItem("refreshtoken");

export const design = (formData) =>
  API.post("/design", formData, {
    headers: { Authorization: decryptedToken(token) },
  });
export const getDesign = () =>
  API.get("/design", {
    headers: { Authorization: decryptedToken(token) },
  });
export const getDesignById = (id) =>
  API.get(`/design/${id}`, {
    headers: { Authorization: decryptedToken(token) },
  });
