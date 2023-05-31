import axios from "axios";
import { decryptedToken } from "../src/helpers/decryption";
const API = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_URL });
const token = localStorage.getItem("refreshtoken");

export const createPersonal = (formData) =>
  API.post("/personal", formData, {
    headers: { Authorization: decryptedToken(token) },
  });

export const getPersonal = () =>
  API.get("/personal", {
    headers: { Authorization: decryptedToken(token) },
  });
export const getPersonalById = (id) =>
  API.get(`/personal/${id}`, {
    headers: { Authorization: decryptedToken(token) },
  });
