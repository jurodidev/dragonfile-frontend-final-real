import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ListaPersonajesPage from "./pages/ListaPersonajesPage";
import CrearPersonajePage from "./pages/CrearPersonajePage";
import EditarPersonajePage from "./pages/EditarPersonajePage";
import RutaProtegida from "./components/RutaProtegida";
import { cerrarSesion, usuarioAutenticado } from "./services/authService";

function AppLayout() {
  const [autenticado, setAutenticado] = useState(usuarioAutenticado());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAutenticado(usuarioAutenticado());
  }, [location.pathname]);

  const handleLogout = () => {
    cerrarSesion();
    setAutenticado(false);
    navigate("/login");
  };

  const esRutaActiva = (ruta) => {
    if (ruta === "/") return location.pathname === "/";
    return location.pathname.startsWith(ruta);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-content">
          <div className="brand-block">
            <span className="brand-badge">Desarrollo de Aplicaciones Web - Proyecto final</span>
            <h1 className="app-title">Dragonfile</h1>
            <p className="app-subtitle">
              Entorno web para diseñar, almacenar y compartir a tus personajes de rol.
            </p>
          </div>
        </div>
      </header>

      <nav className="navbar">
        <div className="nav-group">
          <Link className={`nav-link ${esRutaActiva("/") ? "active" : ""}`} to="/">
            Inicio
          </Link>

          <Link
            className={`nav-link ${esRutaActiva("/personajes") ? "active" : ""}`}
            to="/personajes"
          >
            Personajes
          </Link>

          {autenticado && (
            <Link
              className={`nav-link ${esRutaActiva("/personajes/crear") ? "active" : ""}`}
              to="/personajes/crear"
            >
              Crear personaje
            </Link>
          )}
        </div>

        <div className="nav-group nav-group-auth">
          {!autenticado ? (
            <>
              <Link
                className={`nav-link ${esRutaActiva("/login") ? "active" : ""}`}
                to="/login"
              >
                Login
              </Link>
              <Link
                className={`nav-link nav-link-primary ${esRutaActiva("/registro") ? "active" : ""}`}
                to="/registro"
              >
                Registro
              </Link>
            </>
          ) : (
            <button className="nav-button logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login setAutenticado={setAutenticado} />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/personajes"
            element={
              <RutaProtegida autenticado={autenticado}>
                <ListaPersonajesPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/personajes/crear"
            element={
              <RutaProtegida autenticado={autenticado}>
                <CrearPersonajePage />
              </RutaProtegida>
            }
          />

          <Route
            path="/personajes/editar/:id"
            element={
              <RutaProtegida autenticado={autenticado}>
                <EditarPersonajePage />
              </RutaProtegida>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;