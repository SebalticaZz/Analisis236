import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../../Login.css';
import { Link } from "react-router-dom";


const CommercialAreaNavbar = () => {
    return (
        <Navbar className='navbarVentas' expand="lg" >
            <Navbar.Brand  href="#home"><h2 className='brand'>Área Comercial</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Link to={`/solicitudes`}>
						<a href={``} className="btn btn-primary mr-3">
							Ver solicitudes pendientes
						</a>
			</Link>

            <Link to={'/Login'}>
                        <a href={'/Login'} className="btn btn-danger" style={{marginLeft: '900px'}}>
                            Cerrar Sesion
                        </a>
            </Link>

            </Navbar.Collapse>
        </Navbar>
    );
}

export default CommercialAreaNavbar;