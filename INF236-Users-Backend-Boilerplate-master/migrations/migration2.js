'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar campos username y password
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar campos si se revierte la migración
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'password');
  }
};
