import UserController from './UserController.js';
import { crearSolicitud } from '../controllers/solicitudPrestamoController.js';
import { obtenerTodasLasSolicitudes } from '../controllers/solicitudPrestamoController.js';
import { getAll, get, aprobar, derivar, rechazar} from './solicitudPrestamoController.js';

export default (app) => {
	const userController = new UserController();

	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);
	app.post('/auth/login', userController.login);
	app.post('/solicitudes-prestamo', crearSolicitud);
	app.get('/solicitudes-ventas', obtenerTodasLasSolicitudes);

	app.get('/solicitudes',getAll);
    app.get('/solicitudes/:numero_solicitud',get);
    app.put('/solicitudes/:numero_solicitud/aprobar',aprobar);
    app.put('/solicitudes/:numero_solicitud/derivar',derivar);
    app.put('/solicitudes/:numero_solicitud/rechazar',rechazar);

};