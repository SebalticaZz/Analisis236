import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            const userType = response.data.user && response.data.user.userType;

            switch (userType) {
                case 'Area Comercial':
                    history.push('/solicitudes');
                    break;
                case 'Area de Ventas':
                    history.push('/crearSol');
                    break;
                case 'Supervisor':
                    // Asumiendo que tienes una ruta para los supervisores
                    history.push('/ruta-supervisor');
                    break;
                default:
                    history.push('/');
                    break;
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            // Aquí puedes manejar errores, como mostrar un mensaje al usuario
        }
    };

    return(
        <div style={{background:'#142d4c'}}>
            <form onSubmit={handleSubmit}>
              <div className='login'>
                <label htmlFor="username-login"> <b>Usuario:</b> </label>
                <input
                    id='username-login'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nombre de Usuario"
                />
                <label htmlFor="username-password"> <b>Contraseña</b> </label>
                <input
                    id='username-password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button className='boton' type="submit">Iniciar Sesión</button>

              </div>

            </form>


        </div>
    );
};

export default Login;
