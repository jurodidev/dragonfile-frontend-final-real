import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardarToken, loginUsuario } from "../services/authService";

function Login({ setAutenticado }) {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

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

    try {
      const response = await loginUsuario(formulario);
      guardarToken(response.data.token);
      setAutenticado(true);
      navigate("/personajes");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-page">
      <div className="page-card login-wrap auth-card">
        <div className="auth-header">
          <span className="badge">Acceso seguro</span>
          <h2 className="page-title">Iniciar sesión</h2>
          <p className="section-subtitle auth-subtitle">
            Accede a tu cuenta para gestionar personajes, editar fichas y descargar PDFs.
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
                placeholder="Introduce tu nombre de usuario"
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
                placeholder="Introduce tu contraseña"
              />
            </div>
          </div>

          {error && <p className="error-text auth-error">{error}</p>}

          <div className="form-actions auth-actions">
            <button className="btn-primary" type="submit">
              Entrar en la aplicación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;