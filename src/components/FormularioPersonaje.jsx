import { useEffect, useState } from "react";
import {
  crearPersonaje,
  actualizarPersonaje,
  obtenerRazas,
  obtenerClases,
} from "../services/personajeService";

function FormularioPersonaje({
  onPersonajeGuardado,
  personajeEnEdicion,
  limpiarEdicion,
}) {
  const [razas, setRazas] = useState([]);
  const [clases, setClases] = useState([]);
  const [errores, setErrores] = useState({});

  const [formulario, setFormulario] = useState({
    nombre: "",
    raza: "HUMANO",
    clasePersonaje: "GUERRERO",
    nivel: 1,
  });

  useEffect(() => {
    cargarCatalogos();
  }, []);

  useEffect(() => {
    if (personajeEnEdicion) {
      setFormulario({
        nombre: personajeEnEdicion.nombre,
        raza: personajeEnEdicion.raza,
        clasePersonaje: personajeEnEdicion.clasePersonaje,
        nivel: personajeEnEdicion.nivel,
      });
      setErrores({});
    }
  }, [personajeEnEdicion]);

  const cargarCatalogos = async () => {
    try {
      const responseRazas = await obtenerRazas();
      const responseClases = await obtenerClases();

      setRazas(responseRazas.data);
      setClases(responseClases.data);
    } catch (error) {
      console.error("Error al cargar razas y clases:", error);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: name === "nivel" ? Number(value) : value,
    });

    setErrores({
      ...errores,
      [name]: "",
    });
  };

  const reiniciarFormulario = () => {
    setFormulario({
      nombre: "",
      raza: razas[0] || "HUMANO",
      clasePersonaje: clases[0] || "GUERRERO",
      nivel: 1,
    });
    setErrores({});
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrores({});

      if (personajeEnEdicion) {
        await actualizarPersonaje(personajeEnEdicion.id, formulario);
      } else {
        await crearPersonaje(formulario);
      }

      reiniciarFormulario();
      limpiarEdicion();
      onPersonajeGuardado();
    } catch (error) {
      console.error("Error al guardar personaje:", error);

      if (error.response && error.response.status === 400) {
        setErrores(error.response.data.errores || {});
      }
    }
  };

  const cancelarEdicion = () => {
    reiniciarFormulario();
    limpiarEdicion();
  };

  return (
    <div className="page-card form-card">
      <div className="form-card-header">
        <div>
          <span className="badge">
            {personajeEnEdicion ? "Modo edición" : "Nuevo personaje"}
          </span>
          <h2 className="page-title">
            {personajeEnEdicion ? "Editar personaje" : "Crear personaje"}
          </h2>
        </div>

        <p className="section-subtitle form-intro">
          Completa la información del personaje y guarda los cambios.
        </p>
      </div>

      <form onSubmit={manejarSubmit} className="character-form">
        <div className="form-grid">
          <div className="form-group full">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Introduce el nombre del personaje"
              required
            />
            {errores.nombre && <p className="error-text">{errores.nombre}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="raza">Raza</label>
            <select
              id="raza"
              name="raza"
              value={formulario.raza}
              onChange={manejarCambio}
            >
              {razas.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
            {errores.raza && <p className="error-text">{errores.raza}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="clasePersonaje">Clase</label>
            <select
              id="clasePersonaje"
              name="clasePersonaje"
              value={formulario.clasePersonaje}
              onChange={manejarCambio}
            >
              {clases.map((clase) => (
                <option key={clase} value={clase}>
                  {clase}
                </option>
              ))}
            </select>
            {errores.clasePersonaje && (
              <p className="error-text">{errores.clasePersonaje}</p>
            )}
          </div>

          <div className="form-group form-group-compact">
            <label htmlFor="nivel">Nivel</label>
            <input
              id="nivel"
              type="number"
              name="nivel"
              value={formulario.nivel}
              onChange={manejarCambio}
              min="1"
              max="20"
              required
            />
            <small className="field-hint">Valor permitido entre 1 y 20.</small>
            {errores.nivel && <p className="error-text">{errores.nivel}</p>}
          </div>
        </div>

        <div className="divider"></div>

        <div className="form-actions">
          <button className="btn-primary" type="submit">
            {personajeEnEdicion ? "Actualizar personaje" : "Crear personaje"}
          </button>

          {personajeEnEdicion && (
            <button
              className="btn-secondary"
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormularioPersonaje;