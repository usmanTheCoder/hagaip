import axios from "axios";
import { decryptedToken } from "../src/helpers/decryption";
const API = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_URL });
axios.defaults.withCredentials = true;
const token = localStorage.getItem("refreshtoken");

export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData);
export const activate = (activation_token) => {
  API.post("/user/activation", {
    activation_token,
  });
};

export const refresh_token = (refreshToken) =>
  API.post("/user/refresh_token", { refreshToken: refreshToken });
export const forgotPassword = (formData) => API.post("/user/forgot", formData);
export const resetPassword = (data) => API.post("/user/reset", data);
export const logout = () => API.get("/user/logout");
export const getUser = () =>
  API.get("/user/user_info", {
    headers: { Authorization: decryptedToken(token) },
  });

export const getAllUsers = () =>
  API.get("/user/user_all_info", {
    headers: { Authorization: decryptedToken(token) },
  });

export const deleteUser = (id) =>
  API.delete(`/user/delete/${id}`, {
    headers: { Authorization: decryptedToken(token) },
  });

export const updateRole = ({ id, role }) =>
  API.patch(
    `/user/update_role/${id}`,
    { role: role },
    {
      headers: { Authorization: decryptedToken(token) },
    }
  );

export const updateUser = (formData) =>
  API.patch("/user/update", formData, {
    headers: { Authorization: decryptedToken(token) },
  });

export const signout = () => API.get("/user/logout");

export const createUser = (formData) => API.post("/user/create_user", formData, {
  headers: { Authorization: decryptedToken(token) },
});
