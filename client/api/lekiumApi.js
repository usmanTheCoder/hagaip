import axios from "axios";
import { decryptedToken } from "../src/helpers/decryption";
const API = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_URL });
const token = localStorage.getItem("refreshtoken");

export const lekium = (formData) =>
  API.post("/lekium", formData, {
    headers: { Authorization: decryptedToken(token) },
  });
export const getLekium = () =>
  API.get("/lekium", {
    headers: { Authorization: decryptedToken(token) },
  });
export const getChaps = () =>
  API.get("/lekium/get_chaps", {
    headers: { Authorization: decryptedToken(token) },
  });
export const getSubChaps = (chapterName) => 
  API.get(`/lekium/get_subChaps/${chapterName}`, {
    headers: { Authorization: decryptedToken(token) },
  });

export const getLekiumById = (id) =>
  API.get("/lekium/getId_lekium", id, {
    headers: { Authorization: decryptedToken(token) },
  });
