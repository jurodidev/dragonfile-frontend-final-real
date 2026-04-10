import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioPersonaje from "../components/FormularioPersonaje";
import { obtenerPersonajePorId } from "../services/personajeService";

function EditarPersonajePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    cargarPersonaje();
  }, [id]);

  const cargarPersonaje = async () => {
    try {
      const response = await obtenerPersonajePorId(id);
      setPersonaje(response.data);
    } catch (error) {
      console.error("Error al cargar personaje:", error);
    }
  };

  const volver = () => {
    navigate("/personajes");
  };

  if (!personaje) {
    return (
      <div className="page-card loading-card">
        <div className="loader"></div>
        <p className="loading-text">Cargando personaje...</p>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="page-section-header">
        <div>
          <span className="badge">Modo edición</span>
          <h2 className="page-title">Editar personaje</h2>
          <p className="section-subtitle">
            Modifica los datos del personaje y guarda los cambios.
          </p>
        </div>

        <button className="btn-secondary" onClick={volver}>
          Volver al listado
        </button>
      </div>

      <FormularioPersonaje
        personajeEnEdicion={personaje}
        onPersonajeGuardado={volver}
        limpiarEdicion={volver}
      />
    </div>
  );
}

export default EditarPersonajePage;