import React from "react";
import useSWR from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import DeleteForm from "../../components/DeleteForm";
import { deleteUser, getAllUsers } from "../../repositories/user";
import '../../Login.css';



import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const clickborrar = (a) => {
    deleteUser(a);
    window.location.reload();
};

export default function Index() {
	const { data, error } = useSWR("/users/all", {
		fetcher: getAllUsers,
		initialData: [],
		revalidateOnMount: true,
	});

	const tbody = [];

	data.forEach(({ nombre, email, id }) => {
		tbody.push(
			<tr style={{ height: 'auto', margin:'0'}}>
				<td style={{ height: 'auto', margin:'0'}}>{nombre}</td>
				<td style={{ height: 'auto', margin:'0' }}>{email}</td>
				<td style={{ height: 'auto', margin:'0' }}>
					<Link to={`users/${id}`} style={{ height: 'auto', margin:'0'}}>
						<a href={`users/${id}`} className="btn btn-success">
							Ver
						</a>
					</Link>
					<Link to={`users/${id}/edit`} style={{ height: 'auto', margin:'0'}}>
						<a href={`users/${id}/edit`} className="ml-2 btn btn-primary">
							Editar
						</a>
					</Link>
					<a onClick={() => clickborrar(id)} className="ml-2 btn btn-danger"> Borrar
                    </a>
				</td>
			</tr>
		);
	});

	return (

		<div>
			<Header />
			<Container fluid className="p-0">
				<Row className="no-gutters">
					<Col xs="2">
						<Sidebar />
					</Col>
					<Col xs="10">
						<Container className="pt-4">
							<div className="d-flex align-items-center">
								<h1>Listado de Usuarios</h1>
								<Link to="/users/create">
									<a href="/users/create" className="ml-4 btn btn-primary">
										Crear Usuario
									</a>
								</Link>
							</div>

							<div className="container">

								<table className="table">
									<thead>
										<tr>
											<th>Nombre</th>
											<th>Email</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>{tbody}</tbody>
								</table>

							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
