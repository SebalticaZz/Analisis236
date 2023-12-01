import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [rutSolicitanteFilter, setRutSolicitanteFilter] = useState('');

  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte
    // Aquí puedes realizar una solicitud para obtener las solicitudes
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = async () => {
    try {
      // Realiza una solicitud para obtener todas las solicitudes
      const response = await axios.get('http://localhost:8080/solicitudes-ventas');
      const data = response.data; // Supongo que las solicitudes están en response.data
      setSolicitudes(data); // Almacena las solicitudes en el estado
      console.log(data);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  return (
    <div className='listaSolicitudesIn'>
      <h2>Lista de Solicitudes</h2>
      <input
        type="text"
        placeholder="Buscar por RUT Solicitante"
        value={rutSolicitanteFilter}
        onChange={(e) => setRutSolicitanteFilter(e.target.value)}
      />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>RUT Solicitante</th>
            <th>Nombre Cliente</th>
            <th>Dirección Cliente</th>
            <th>Monto Solicitado</th>
            <th>Número de Cuotas</th>
            <th>Cuota en UF</th>
            <th>Valor UF al Día</th>
            <th> Estado </th>
            {/* Agrega aquí más encabezados para otros campos */}
          </tr>
        </thead>
        <tbody>
          {solicitudes
            .filter((solicitud) =>
              solicitud.rut_solicitante.includes(rutSolicitanteFilter)
            )
            .map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.rut_solicitante}</td>
                <td>{solicitud.nombre_cliente}</td>
                <td>{solicitud.direccion_cliente}</td>
                <td>{solicitud.monto_credito}</td>
                <td>{solicitud.numero_cuotas}</td>
                <td>{solicitud.cuota_en_uf}</td>
                <td>{solicitud.valor_uf_actual}</td>
                <td className='estado'>{solicitud.estado}</td>
                {/* Agrega aquí más celdas para otros campos */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaSolicitudes;