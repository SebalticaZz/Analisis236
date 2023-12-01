'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SolicitudesPrestamos', {
      numero_solicitud: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut_solicitante: {
        type: Sequelize.STRING
      },
      numero_cuotas: {
        type: Sequelize.INTEGER
      },
      nombre_cliente: {
        type: Sequelize.STRING
      },
      fecha_actual: {
        type: Sequelize.DATE
      },
      direccion_cliente: {
        type: Sequelize.STRING
      },
      valor_uf_actual: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.ENUM,
        values: ['aceptada', 'rechazada', 'pendiente'],
        defaultValue: 'pendiente'
      },
      monto_credito: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      derivada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      cuota_en_uf: {
        type: Sequelize.DECIMAL(10, 4), // Tipo de datos para valores en UF
        allowNull: true // Establece allowNull en true si el campo no es obligatorio
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SolicitudesPrestamos');
  }
};