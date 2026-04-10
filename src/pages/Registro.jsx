import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/authService";

function Registro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      await registrarUsuario(formulario);
      setMensaje("Usuario creado correctamente");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="page-card register-wrap auth-card">
        <div className="auth-header">
          <span className="badge">Nuevo usuario</span>
          <h2 className="page-title">Crear cuenta</h2>
          <p className="section-subtitle auth-subtitle">
            Regístrate para empezar a crear, editar y gestionar tus personajes.
          </p>
        </div>

        <form onSubmit={manejarSubmit} className="auth-form">
          <div className="form-grid">
            <div className="form-group full">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formulario.username}
                onChange={manejarCambio}
                placeholder="Elige un nombre de usuario"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formulario.password}
                onChange={manejarCambio}
                placeholder="Crea una contraseña segura"
              />
            </div>
          </div>

          {mensaje && <p className="success-text auth-success">{mensaje}</p>}
          {error && <p className="error-text auth-error">{error}</p>}

          <div className="form-actions auth-actions">
            <button className="btn-primary" type="submit">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;