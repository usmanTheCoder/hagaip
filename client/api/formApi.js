import axios from "axios";
import { decryptedToken } from "../src/helpers/decryption";
const API = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_URL });
const token = localStorage.getItem("refreshtoken")

export const createForm = (formData) =>
  API.post("/form", formData, {
    headers: { Authorization: decryptedToken(token) },
  });
export const getForm = () => API.get("/form", {
    headers: { Authorization:  decryptedToken(token) },
  });
export const deleteForm = (id) => API.delete(`/form/delete_form/${id}`, {
    headers: { Authorization:  decryptedToken(token) },
  });
export const getFormsById = (id) => API.get(`/form/get_byId/${id}`, {
    headers: { Authorization:  decryptedToken(token) },
  });
export const getSingleForm = (id) => API.get(`/form/get_form/${id}`, {
    headers: { Authorization:  decryptedToken(token) },
  });
export const editForm = ({id, formData}) =>
  API.patch(`/edit_form/${id}`, formData, {
    headers: { Authorization:  decryptedToken(token) },
  });