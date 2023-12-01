import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../../Login.css';

const FormularioSolicitudPrestamo = () => {
  const [solicitud, setSolicitud] = useState({
    rut_solicitante: '',
    numero_cuotas: '',
    nombre_cliente: '',
    direccion_cliente: '',
    valor_uf_actual: '',
    monto_solicitado: '', // Nuevo campo para el monto solicitado
  });

  const [ufValue, setUfValue] = useState(''); // Estado para almacenar el valor de la UF
  const [cuotaUF, setCuotaUF] = useState(''); // Estado para almacenar la cuota en UF
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const obtenerValorUF = async () => {
    const apiKey = '443c10886dde25d66d747b6be1f5aa83ff0bbb19';
    const url = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=${apiKey}&formato=json`;

    try {
      const response = await axios.get(url);
      const valorUF = response.data.UFs[0].Valor;
      setSolicitud({ ...solicitud, valor_uf_actual: valorUF });
      setUfValue(valorUF); // Actualiza el valor de la UF en el estado
    } catch (error) {
      console.error('Error al obtener el valor de la UF:', error);
    }
  };

  const handleChange = (e) => {
    // Obtén el valor ingresado
    const inputValue = e.target.value;

    // Limpia la cadena de texto eliminando comas y espacios en blanco
    const cleanedValue = inputValue.replace(/,/g, '').trim();

    setSolicitud({
      ...solicitud,
      [e.target.name]: cleanedValue,
    });
  };

  useEffect(() => {
    // Llama a la función para calcular la cuota en UF después de obtener el valor de la UF
    calcularCuotaUF();
  }, [solicitud.valor_uf_actual, solicitud.numero_cuotas, solicitud.monto_solicitado]);

  const calcularCuotaUF = () => {
    // Realiza el cálculo de la cuota en UF
    const { monto_solicitado, numero_cuotas, valor_uf_actual } = solicitud;
    const tasamensual = 0.0115; // Cambia la tasa según corresponda
    const plazo = parseFloat(numero_cuotas);
    const ValorUF=solicitud.valor_uf_actual
    const montoEnUF = parseFloat(monto_solicitado) / parseFloat(valor_uf_actual.replace('.', '').replace(',', '.'));
    
    console.log('Valor UF', solicitud.valor_uf_actual);
    console.log('Monto Solicitado (UF):', montoEnUF);
    console.log('Número de Cuotas:', numero_cuotas);
    console.log('Tasa Mensual:', tasamensual);
    console.log('Plazo:', plazo);
  
    const cuotaUF = (montoEnUF * tasamensual) / (1 - Math.pow(1 + tasamensual, -plazo));
    console.log('Cuota en UF:', cuotaUF);
  
    setCuotaUF(cuotaUF.toFixed(4)); // Redondea a 2 decimales y actualiza el estado
    setSolicitud({ ...solicitud, cuota_en_uf: cuotaUF });
  };

  const enviarSolicitudPrestamo = async (datosSolicitud) => {
    const url = 'http://localhost:8080/solicitudes-prestamo';
    try {
      // Asegúrate de enviar todos los campos necesarios
      const formattedCuotaUF = parseFloat(cuotaUF).toFixed(4).replace('.', ','); // Formatea cuotaUF a 4 decimales
      const response = await axios.post(url, {
        rut_solicitante: datosSolicitud.rut_solicitante,
        numero_cuotas: datosSolicitud.numero_cuotas,
        nombre_cliente: datosSolicitud.nombre_cliente,
        direccion_cliente: datosSolicitud.direccion_cliente,
        valor_uf_actual: datosSolicitud.valor_uf_actual,
        monto_credito: datosSolicitud.monto_solicitado,
        cuota_en_uf: formattedCuotaUF, // Utiliza la variable cuotaUF directamente
      });
      setModalMessage('Solicitud enviada con éxito.');
      setShowModal(true);
      return response.data;
    } catch (error) {
      console.error('Error al enviar la solicitud de préstamo:', error);
      setModalMessage('Error al enviar la solicitud.');
      setShowModal(true);
      throw error;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a calcularCuotaUF para asegurarte de que cuotaUF esté actualizado
      calcularCuotaUF();
  
      // Luego, envía la solicitud con cuotaUF actualizado
      const responseData = await enviarSolicitudPrestamo(solicitud);
      console.log('Solicitud creada:', responseData);
      // Aquí puedes manejar la respuesta del servidor, como redireccionar o mostrar un mensaje
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error
    }
  };

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };
  

  return (
    <>
      <form className="crear-solicitud" onSubmit={handleSubmit}>
        <h2>Solicitud de Prestamo</h2>
        <label>
          RUT del solicitante:
          <input type="text" name="rut_solicitante" placeholder="Ingrese rut" onChange={handleChange} value={solicitud.rut_solicitante} />
        </label>
        <br />
        <label>
          Nombre del cliente:
          <input type="text" name="nombre_cliente" placeholder="Ingrese nombre" onChange={handleChange} value={solicitud.nombre_cliente} />
        </label>
        <br />
        <label>
          Dirección del cliente:
          <input type="text" name="direccion_cliente" placeholder="Ingrese direccion" onChange={handleChange} value={solicitud.direccion_cliente} />
        </label>
        <br />
        <label>
          Número de cuotas:
          <input type="number" placeholder="Numero de cuotas" name="numero_cuotas" onChange={handleChange} value={solicitud.numero_cuotas} />
        </label>
        <br />
        <label>
          Monto Solicitado:
          <input type="number" placeholder="Monto Solicitado" name="monto_solicitado" onChange={handleChange} value={solicitud.monto_solicitado} />
        </label>
        <br />
        <button type="button" onClick={obtenerValorUF}>Obtener valor UF</button>
        <br />
        {ufValue && (
          <div>
            <b>Valor de la UF:</b> {ufValue}
            <br />
            <b>Cuota en UF:</b> {cuotaUF}
          </div>
        )}
        <br />
        <button className="enviarSolicitud" type="submit">Enviar solicitud</button>
      </form>
  
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Estado de la Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

export default FormularioSolicitudPrestamo;

