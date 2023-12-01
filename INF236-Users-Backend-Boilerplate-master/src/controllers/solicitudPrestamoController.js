import SolicitudPrestamo from '../models/SolicitudPrestamo.js';

const crearSolicitud = async (req, res) => {
    try {
        const {
            valor_uf_actual,
            monto_credito,
            derivada,
            cuota_en_uf,
            ...otrosDatos
        } = req.body;

        // Reemplazar comas por puntos y eliminar puntos de mil
        const valorUF = parseFloat(valor_uf_actual.replace(/\./g, '').replace(/,/g, '.'));

        // Convierte los campos monto_credito y cuota_en_uf a números en caso de ser necesario
        const montoCredito = parseFloat(monto_credito);
        const cuotaUF = cuota_en_uf ? parseFloat(cuota_en_uf.replace(/\./g, '').replace(/,/g, '.')) : null;

        const nuevaSolicitud = await SolicitudPrestamo.create({
            ...otrosDatos,
            valor_uf_actual: valorUF,
            monto_credito: montoCredito,
            derivada: derivada === 'true', // Convierte a booleano
            cuota_en_uf: cuotaUF,
            fecha_actual: new Date()
        });

        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error(error); // Imprimir el error en la consola para depuración
        res.status(400).json({ error: error.message });
    }
};

const obtenerTodasLasSolicitudes = async (req, res) => {
    try {
      // Ahora puedes usar el modelo para obtener todas las solicitudes
      const solicitudes = await SolicitudPrestamo.findAll();
      
      res.json(solicitudes);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
};


const getAll = async (req, res) => {
    const solicitudes = await SolicitudPrestamo.findAll({
        where: {
            estado: "pendiente",
            derivada: "False" 
        }
    });

    res.send(solicitudes);
}

const get = async (req, res) => {
    const solicitud = await SolicitudPrestamo.findByPk(req.params.numero_solicitud);
    res.send(solicitud);
}


const aprobar = async (req, res) => {
    const solicitud = await SolicitudPrestamo.findByPk(req.params.numero_solicitud);
    solicitud.update({estado: "aceptada"});
    res.send(solicitud);
}

const rechazar = async (req, res) => {
    const solicitud = await SolicitudPrestamo.findByPk(req.params.numero_solicitud);
    solicitud.update({estado: "rechazada"});
    res.send(solicitud);
}

const derivar = async (req, res) => {
    const solicitud = await SolicitudPrestamo.findByPk(req.params.numero_solicitud);
    solicitud.update({derivada: "True"});
    res.send(solicitud);
}
export { crearSolicitud, getAll, get, aprobar,rechazar, derivar, obtenerTodasLasSolicitudes};


