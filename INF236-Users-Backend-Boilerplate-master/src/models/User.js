import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class User extends Sequelize.Model {};

User.init({
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: Sequelize.DataTypes.STRING,
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false

  
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    unique: true, // Opcional, si quieres que el nombre de usuario sea único
  },

  userType: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      isIn: [['Area Comercial', 'Area de Ventas', 'Supervisor']]
    }
  },

  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }},
  
  {
    sequelize,
    timestamps: true,
  }
);


export default User;
