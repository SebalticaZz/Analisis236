import React from "react";
import useSWR from "swr";

import { useParams } from "react-router-dom";
import { getUser } from "../../repositories/user";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import '../../Login.css';

export default function Show() {
	const { id } = useParams();

	const { data, error } = useSWR(id, {
		fetcher: getUser,
		initialData: [],
		revalidateOnMount: true,
	});
	return (
		<div>
			<Header/>
				<Container fluid className="p-0">
					<Row className="no-gutters">
						<Col xs="2">
							<Sidebar />
						</Col>
						<Col xs="10">
							<div className="container">
								<table className="table">
									<tbody>
										<tr>
											<th>ID:</th>
											<td>{data.id}</td>
										</tr>
										<tr>
											<th>Nombre</th>
											<td>{data.nombre}</td>
										</tr>
										<tr>
											<th>Email</th>
											<td>{data.email}</td>
										</tr>
										<tr>
											<th>Username</th>
											<td>{data.username}</td>
										</tr>
										<tr>
											<th>Cargo</th>
											<td>{data.userType}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Col>
					</Row>
				</Container>
		</div>
	);
}
