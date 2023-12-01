import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../Login.css';
import { Link } from "react-router-dom";


const CommercialAreaNavbar = () => {
    return (
        <Navbar className='navbarVentas' expand="lg">
            <Navbar.Brand  href="#home"><h2 className='brand mr-3'>Área de Ventas</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            


            <Navbar.Collapse id="basic-navbar-nav">
            <Link to={`/CrearSOL`}>
						<a href={``} className="btn btn-primary mr-3">
							Crear Solicitud
						</a>
			</Link>
            
            <Link to={`/lista`}>
						<a href={``} className="btn btn-primary">
							Ver todas las solicitudes
						</a>
			</Link>

            <Link to={'/Login'}>
                        <a href={'/Login'} className="btn btn-danger" style={{marginLeft: '850px'}}>
                            Cerrar Sesion
                        </a>
            </Link>

            

            </Navbar.Collapse>
        </Navbar>
    );
}

export default CommercialAreaNavbar;