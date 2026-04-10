import { Navigate } from "react-router-dom";

function RutaProtegida({ children, autenticado }) {
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;