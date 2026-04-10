import { eliminarPersonaje, descargarPdf } from "../services/personajeService";
import { useNavigate } from "react-router-dom";

function ListaPersonajes({ personajes, recargarLista }) {
  const navigate = useNavigate();

  const borrarPersonaje = async (id) => {
    try {
      await eliminarPersonaje(id);
      recargarLista();
    } catch (error) {
      console.error("Error al borrar personaje:", error);
    }
  };

  const handleDescargarPdf = async (id) => {
    try {
      const response = await descargarPdf(id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `personaje_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar PDF:", error);
    }
  };

  if (personajes.length === 0) {
    return (
      <div className="empty-state">
        <h3 className="empty-state-title">No hay personajes disponibles</h3>
        <p className="empty-state-text">
          No hay personajes que coincidan con el filtro actual.
        </p>
      </div>
    );
  }

  return (
    <div className="character-grid">
      {personajes.map((personaje) => (
        <article className="character-card" key={personaje.id}>
          <div className="character-card-top">
            <div>
              <span className="badge">Personaje #{personaje.id}</span>
              <h3 className="character-name">{personaje.nombre}</h3>
            </div>
          </div>

          <div className="character-details">
            <div className="character-detail-item">
              <span className="character-detail-label">Raza</span>
              <span className="character-detail-value">{personaje.raza}</span>
            </div>

            <div className="character-detail-item">
              <span className="character-detail-label">Clase</span>
              <span className="character-detail-value">{personaje.clasePersonaje}</span>
            </div>

            <div className="character-detail-item">
              <span className="character-detail-label">Nivel</span>
              <span className="character-detail-value">{personaje.nivel}</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="character-actions">
            <button
              className="btn-warning"
              onClick={() => navigate(`/personajes/editar/${personaje.id}`)}
            >
              Editar
            </button>

            <button
              className="btn-danger"
              onClick={() => borrarPersonaje(personaje.id)}
            >
              Eliminar
            </button>

            <button
              className="btn-success"
              onClick={() => handleDescargarPdf(personaje.id)}
            >
              Descargar PDF
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ListaPersonajes;