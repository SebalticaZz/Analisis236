import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UsersEdit from "./views/users/edit";
import UsersView from "./views/users/show";
import UserList from "./views/users/index";
import UserAdd from "./views/users/create";

import Login from './views/Login/Login';
import Register from './views/Login/Register';

import HeaderCom from "./views/AreaComercial/Header";
import CrearSol from "./views/AreaVentas/vistaSolicitud";
import VerSolicitudes from "./views/AreaComercial/SolicitudesPrestamos";
import VerSolicitud from "./views/AreaComercial/SolicitudPrestamo"
import ListaSolicitudes from "./views/AreaVentas/vistaLista";
import Home from "./views/Home";

import Users from "./App"


export default function App() {
	return (
		<Router>
			<div>

							{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
							<Switch>

								<Route path="/User2">
									<Users />
								</Route>

								<Route path="/comercial">
									<HeaderCom />
								</Route>

								
								<Route path="/solicitudes">
									<VerSolicitudes />
								</Route>


								<Route path="/solicitud/:numero_solicitud">
									<VerSolicitud />
								</Route>

								<Route path="/crearSol">
									<CrearSol />
								</Route>

								<Route path="/login">
                                    <Login />
                                </Route>

								<Route path="/lista">
                                    <ListaSolicitudes />
                                </Route>

								<Route path="/users/create">
									<UserAdd />
								</Route>
								<Route path="/users/:id/edit">
									<UsersEdit />
								</Route>
								<Route path="/users/:id">
									<UsersView />
								</Route>
								<Route path="/users">
									<UserList />
								</Route>
								<Route path="/">
									<Login />
								</Route>
								<Route path="/REGISTER">
									<Register />
								</Route>

							</Switch>
			</div>
		</Router>
	);
}
