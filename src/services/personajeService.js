import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const obtenerPersonajes = () =>
  axios.get(`${API_URL}/personajes`, getAuthHeaders());

export const obtenerPersonajePorId = (id) =>
  axios.get(`${API_URL}/personajes/${id}`, getAuthHeaders());

export const crearPersonaje = (personaje) =>
  axios.post(`${API_URL}/personajes`, personaje, getAuthHeaders());

export const actualizarPersonaje = (id, personaje) =>
  axios.put(`${API_URL}/personajes/${id}`, personaje, getAuthHeaders());

export const eliminarPersonaje = (id) =>
  axios.delete(`${API_URL}/personajes/${id}`, getAuthHeaders());

export const obtenerRazas = () =>
  axios.get(`${API_URL}/catalogo/razas`, getAuthHeaders());

export const obtenerClases = () =>
  axios.get(`${API_URL}/catalogo/clases`, getAuthHeaders());

export const descargarPdf = (id) =>
  axios.get(`${API_URL}/personajes/${id}/pdf`, {
    ...getAuthHeaders(),
    responseType: "blob",
  });