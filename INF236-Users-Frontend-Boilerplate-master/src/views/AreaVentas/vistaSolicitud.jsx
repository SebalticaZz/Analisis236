import React from 'react';
import CommercialAreaNavbar from './Header'; // Ajusta la ruta de importación según la ubicación de tu componente
import FormularioSolicitudPrestamo from './crearSolicitud'; // Ajusta la ruta de importación según la ubicación de tu componente
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import '../../Login.css';
const VistaCompleta = () => {
  return (
    <body className="vistaSolicitud" >

      {/* Cabecera */}
      <header>
        <CommercialAreaNavbar />
      </header>

      {/* Contenido principal */}
      <main className="contenedorMain">
            <div className='formulario'>
            <FormularioSolicitudPrestamo />
            </div>
      </main>

    </body>
  );
};

export default VistaCompleta;