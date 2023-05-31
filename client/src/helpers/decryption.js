import CryptoJS from "crypto-js";

export const decryptedToken = (token) => {
  const bytes = CryptoJS.AES.decrypt(
    token,
    import.meta.env.VITE_REACT_APP_SECRET
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
