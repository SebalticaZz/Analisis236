import React from "react";
import useSWR from "swr";
import CommercialAreaNavbar from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAllsolicitudes, Aprobar, Derivar, Rechazar } from "../../repositories/solicitud";

const clickaprobar = (a) => {
	Aprobar(a);
	window.location.reload();
};

const clickderivar = (a) => {
	Derivar(a);
	window.location.reload();
};
const clickrechazar = (a) => {
	Rechazar(a);
	window.location.reload();
};





export default function SolicitudesPrestamos() {
	const { data, error } = useSWR("/SolicitudesPrestamos/all", {
		fetcher: getAllsolicitudes,
		initialData: [],
		revalidateOnMount: true,
	});

	const tbody = [];

	data.forEach(({ numero_solicitud, rut_solicitante, numero_cuotas, nombre_cliente,fecha_actual, direccion_cliente, valor_uf_actual, estado}) => {
		tbody.push(
			<tr>
				<td>{numero_solicitud}</td>
				<td>{rut_solicitante}</td>
				<td>{nombre_cliente}</td>
				<td>{numero_cuotas}</td>
				<td className="estado">{estado}</td>
				<td>
					<Link to={`solicitud/${numero_solicitud}`}>
						<a href={`solicitud/${numero_solicitud}`} className="btn btn-primary">
							Ver detalles
						</a>
					</Link>
					
					<Link to={'/solicitudes'}>
					<a href="/solicitudes" onClick={() => clickaprobar(numero_solicitud)} className="ml-2 btn btn-success"> Aprobar
					</a>
					</Link>
					
					<Link to={'/solicitudes'}>
					<a href="/solicitudes" onClick={() => clickderivar(numero_solicitud)} className="ml-2 btn btn-warning"> Derivar
					</a></Link>

					<Link to={'/solicitudes'}>
					<a href="/solicitudes" onClick={() => clickrechazar(numero_solicitud)} className="ml-2 btn btn-danger"> Rechazar
					</a></Link>

					
				</td>
			</tr>
		);
	});

	return (
	
		<body className="vistaSolicitud" style={{ margin: 0, padding: 0 }}>
      {/* Cabecera */}
      <header>
        <CommercialAreaNavbar />
      </header>

      {/* Contenido principal */}
      <main className="contenedorMain d-flex justify-content-center align-items-center">
 
		<Container className="pt-4 " style={{ margin: 40, backgroundColor: 'white' } }>
			
			<div className="d-flex align-items-center">
				<h1>Listado de Solicitudes</h1>
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Numero solicitud</th>
						<th>rut solicitante</th>
						<th>Nombre Cliente</th>
						<th>Cuotas</th>
						<th>Estado</th>
						<th>Acciones</th>


					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</Table>
		</Container>
		</main>

    </body>
	);
}
