import { useNavigate } from "react-router-dom";
import FormularioPersonaje from "../components/FormularioPersonaje";

function CrearPersonajePage() {
  const navigate = useNavigate();

  const onPersonajeGuardado = () => {
    navigate("/personajes");
  };

  const limpiarEdicion = () => {};

  return (
    <div className="page-section">
      <div className="page-section-header">
        <div>
          <span className="badge">Nuevo registro</span>
          <h2 className="page-title">Crear personaje</h2>
          <p className="section-subtitle">
            Completa el formulario para añadir un nuevo personaje a tu colección.
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => navigate("/personajes")}
        >
          Volver al listado
        </button>
      </div>

      <FormularioPersonaje
        onPersonajeGuardado={onPersonajeGuardado}
        personajeEnEdicion={null}
        limpiarEdicion={limpiarEdicion}
      />
    </div>
  );
}

export default CrearPersonajePage;