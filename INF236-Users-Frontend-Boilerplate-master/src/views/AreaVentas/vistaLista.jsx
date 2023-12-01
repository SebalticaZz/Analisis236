import React from 'react';
import CommercialAreaNavbar from './Header'; // Ajusta la ruta de importación según la ubicación de tu componente
import ListaSolicitudes from './listaSolicitudes'; // Ajusta la ruta de importación según la ubicación de tu componente
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import '../../Login.css';
const VistaCompleta = () => {
  return (
    <body className="vistaSolicitud" style={{ margin: 0, padding: 0 }}>
      {/* Cabecera */}
      <header>
        <CommercialAreaNavbar />
      </header>

      {/* Contenido principal */}
      <main className="contenedorMain d-flex justify-content-center align-items-center">
 
            <ListaSolicitudes />
      </main>

    </body>
  );
};

export default VistaCompleta;