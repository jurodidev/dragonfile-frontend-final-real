import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export const loginUsuario = (credenciales) =>
  axios.post(`${API_URL}/login`, credenciales);

export const registrarUsuario = (datos) =>
  axios.post(`${API_URL}/register`, datos);

export const guardarToken = (token) => {
  localStorage.setItem("token", token);
};

export const obtenerToken = () => {
  return localStorage.getItem("token");
};

export const cerrarSesion = () => {
  localStorage.removeItem("token");
};

export const usuarioAutenticado = () => {
  return !!localStorage.getItem("token");
};