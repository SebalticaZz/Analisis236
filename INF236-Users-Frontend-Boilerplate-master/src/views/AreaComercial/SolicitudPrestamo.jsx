import React from "react";
import useSWR from "swr";
import CommercialAreaNavbar from './Header';

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { getSolicitud, Aprobar, Derivar, Rechazar } from "../../repositories/solicitud";
import { Container } from "react-bootstrap";

export default function Solicitud() {
	const { numero_solicitud } = useParams();

	console.log('Número de solicitud:', numero_solicitud);

	const { data, error } = useSWR(numero_solicitud, {
		fetcher: getSolicitud,
		initialData: [],
		revalidateOnMount: true,

		
	});
	console.log('Datos de la solicitud:', data);
	return (
		<body className="vistaSolicitud" style={{ margin: 0, padding: 0 }}>
			<header>
			<CommercialAreaNavbar/>
			</header>
			<h1 style={{marginTop:'20px',fontSize:'30px', color:'white'}}> NUMERO SOLICITUD #{data.numero_solicitud}</h1>
		<div className="container" style={{backgroundColor:'white'}}>
			<table className="table" style={{backgroundColor:'white'}}>
				<tbody>
					
					<tr>
						<th>Rut Solicitante</th>
						<td>{data.rut_solicitante}</td>
					</tr>
					<tr>
						<th>Nombre Solicitante</th>
						<td>{data.nombre_cliente}</td>
					</tr>
					<tr>
						<th>Dirección Cliente</th>
						<td>{data.direccion_cliente}</td>
					</tr>
					<tr>
						<th>Cuotas</th>
						<td>{data.numero_cuotas}</td>
					</tr>
					<tr>
						<th>monto</th>
						<td>{data.monto_credito}</td>
					</tr>
					<tr>
						<th>Valor UF</th>
						<td>{data.valor_uf_actual}</td>
					</tr>
					<tr>
						<th>Cuota en UF</th>
						<td>{data.cuota_en_uf}</td>
					</tr>
					
				</tbody>
			</table>
			
		</div>
		<Container style={{textAlign:'center'}}>
					<Link to={'/solicitudes'}>
					<a style={{fontSize:"26px"}} href="/solicitudes" onClick={() => Aprobar(numero_solicitud)} className="ml-2 btn btn-success"> Aprobar
					</a>
					</Link>
					
					<Link to={'/solicitudes'}>
					<a style={{fontSize:"26px", color:'white'}} href="/solicitudes" onClick={() => Derivar(numero_solicitud)} className="ml-2 btn btn-warning"> Derivar
					</a></Link>

					<Link to={'/solicitudes'}>
					<a style={{fontSize:"26px"}} href="/solicitudes" onClick={() => Rechazar(numero_solicitud)} className="ml-2 btn btn-danger"> Rechazar
					</a></Link>
					</Container>
		</body>
	);
}
