import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../repositories/user";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import '../../Login.css';

export default function Create() {
	const history = useHistory();

	const [state, setstate] = useState({});

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await createUser(state);
			history.push(`/users/${response.data.id}`);
		} catch (error) {
			console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};

	return (

		<div>
			<Header />
			<Container fluid className="p-0">
				<Row className="no-gutters">
					<Col xs="2">
						<Sidebar />
					</Col>
					<Col xs="10">
						<div className="container mt-4">
							<form className="formCrear"onSubmit={submitForm}>
								<div className="form-group">
									<label htmlFor="nombre">Nombre</label>
									<input
										className="form-control"
										id="nombre"
										type="text"
										value={state.nombre}
										onChange={(e) => {
											setstate({ ...state, nombre: e.target.value });
										}}
										placeholder="Ingrese Nombre"
										required
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										className="form-control"
										id="email"
										type="email"
										value={state.email}
										onChange={(e) => {
											setstate({ ...state, email: e.target.value });
										}}
										placeholder="Ingrese Email"
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="username">Nombre de Usuario</label>
									<input
										className="form-control"
										id="username"
										type="text"
										value={state.username || ''}
										onChange={(e) => {
											setstate({ ...state, username: e.target.value });
										}}
										placeholder="Ingrese Nombre de Usuario"
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Contraseña</label>
									<input
										className="form-control"
										id="password"
										type="password"
										value={state.password || ''}
										onChange={(e) => {
											setstate({ ...state, password: e.target.value });
										}}
										placeholder="Ingrese Contraseña"
										required
									/>
								</div>

								<select
									value={state.userType || ''}
									onChange={(e) => {
										setstate({ ...state, userType: e.target.value });
									}}
								>
									<option value="">Seleccione Tipo de Usuario</option>
									<option value="Area Comercial">Area Comercial</option>
									<option value="Area de Ventas">Area de Ventas</option>
									<option value="Supervisor">Supervisor</option>
								</select>

								<div className="float-right">
									<button type="submit" className="btn btn-primary">
										Guardar
									</button>
								</div>

							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
