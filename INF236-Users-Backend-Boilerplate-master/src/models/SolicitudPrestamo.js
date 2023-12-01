import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class SolicitudPrestamo extends Sequelize.Model {};

SolicitudPrestamo.init({
  numero_solicitud: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rut_solicitante: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  numero_cuotas: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  nombre_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  fecha_actual: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  direccion_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  valor_uf_actual: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: Sequelize.DataTypes.ENUM('aceptada', 'rechazada', 'pendiente'),
    defaultValue: 'pendiente'
  },
  monto_credito: {
    type: Sequelize.DataTypes.DECIMAL(10, 2), // Cambia el tipo de dato según corresponda
    allowNull: false
  },
  derivada: {
    type: Sequelize.DataTypes.BOOLEAN, // Puedes usar un tipo booleano para indicar si es derivada o no
    allowNull: false,
    defaultValue: false // Valor por defecto en false
  },
  cuota_en_uf: {
    type: Sequelize.DECIMAL(10, 4), // Tipo de datos para valores en UF
    allowNull: true // Establece allowNull en true si el campo no es obligatorio
  }
}, {
  sequelize,
  timestamps: false, // Puedes cambiar esto si necesitas timestamps
  modelName: 'SolicitudPrestamo', // Nombre del modelo
  tableName: 'SolicitudesPrestamos'
});

export default SolicitudPrestamo;
