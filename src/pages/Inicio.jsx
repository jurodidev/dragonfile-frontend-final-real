function Inicio() {
  return (
    <div className="page-card home-page">
      <div className="home-hero">
        <span className="badge">Aplicación TFG</span>

        <h2 className="home-title">
          Gestiona tus personajes de rol de forma moderna
        </h2>

        <p className="home-subtitle">
          Dragonfile es una aplicación full stack desarrollada con React y
          Spring Boot que permite crear, editar, filtrar y exportar fichas de
          personajes en PDF con autenticación segura mediante JWT.
        </p>
      </div>

      <div className="home-features">
        <div className="home-feature-card">
          <h3>Gestión completa</h3>
          <p>
            Crea y edita personajes con atributos como raza, clase y nivel en un
            entorno intuitivo.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Filtrado avanzado</h3>
          <p>
            Encuentra rápidamente personajes mediante filtros por raza y clase
            en tiempo real.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Exportación a PDF</h3>
          <p>
            Descarga fichas de personaje en formato PDF listas para usar o
            imprimir.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Seguridad por roles</h3>
          <p>
            Acceso protegido con JWT y control de permisos para usuarios y
            administradores.
          </p>
        </div>
      </div>

      <div className="home-footer">
        <p className="home-copy">
          Inicia sesión o crea una cuenta para empezar a gestionar tus personajes.
        </p>
      </div>
    </div>
  );
}

export default Inicio;