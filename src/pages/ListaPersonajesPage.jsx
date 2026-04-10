import { useEffect, useState } from "react";
import ListaPersonajes from "../components/ListaPersonajes";
import {
  obtenerPersonajes,
  obtenerRazas,
  obtenerClases,
} from "../services/personajeService";

function ListaPersonajesPage() {
  const [personajes, setPersonajes] = useState([]);
  const [razas, setRazas] = useState([]);
  const [clases, setClases] = useState([]);

  const [filtroRaza, setFiltroRaza] = useState("");
  const [filtroClase, setFiltroClase] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const responsePersonajes = await obtenerPersonajes();
      const responseRazas = await obtenerRazas();
      const responseClases = await obtenerClases();

      setPersonajes(responsePersonajes.data);
      setRazas(responseRazas.data);
      setClases(responseClases.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const personajesFiltrados = personajes.filter((personaje) => {
    const coincideRaza = filtroRaza === "" || personaje.raza === filtroRaza;
    const coincideClase =
      filtroClase === "" || personaje.clasePersonaje === filtroClase;

    return coincideRaza && coincideClase;
  });

  return (
    <div className="page-card page-section">
      <div className="page-section-header">
        <div>
          <span className="badge">Panel de personajes</span>
          <h2 className="page-title">Listado de personajes</h2>
          <p className="section-subtitle page-section-subtitle">
            Consulta todos los personajes disponibles y utiliza los filtros para
            encontrar fichas por raza o clase.
          </p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <strong className="stat-value">{personajes.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Visibles</span>
            <strong className="stat-value">{personajesFiltrados.length}</strong>
          </div>
        </div>
      </div>

      <div className="filter-panel">
        <div className="filter-panel-header">
          <h3 className="filter-panel-title">Filtros</h3>
          <p className="filter-panel-text">
            Refina el listado por raza y clase.
          </p>
        </div>

        <div className="filters">
          <div className="form-group">
            <label htmlFor="filtroRaza">Filtrar por raza</label>
            <select
              id="filtroRaza"
              value={filtroRaza}
              onChange={(e) => setFiltroRaza(e.target.value)}
            >
              <option value="">Todas</option>
              {razas.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtroClase">Filtrar por clase</label>
            <select
              id="filtroClase"
              value={filtroClase}
              onChange={(e) => setFiltroClase(e.target.value)}
            >
              <option value="">Todas</option>
              {clases.map((clase) => (
                <option key={clase} value={clase}>
                  {clase}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ListaPersonajes
        personajes={personajesFiltrados}
        recargarLista={cargarDatos}
      />
    </div>
  );
}

export default ListaPersonajesPage;