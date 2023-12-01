import axios from "axios";


const getAllsolicitudes = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/Solicitudes`)
		.then((res) => res.data);


const getSolicitud = (numero_solicitud) =>
    axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/solicitudes/${numero_solicitud}`)
        .then((res) => res.data);


const Derivar = async (numero_solicitud) =>
    axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/Solicitudes/${numero_solicitud}/derivar`, numero_solicitud);



const Aprobar = async (numero_solicitud) =>
    axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/Solicitudes/${numero_solicitud}/aprobar`,numero_solicitud);



const Rechazar = async (numero_solicitud) =>
    axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/Solicitudes/${numero_solicitud}/rechazar`, numero_solicitud);
        

export { getSolicitud, getAllsolicitudes, Derivar, Aprobar, Rechazar};