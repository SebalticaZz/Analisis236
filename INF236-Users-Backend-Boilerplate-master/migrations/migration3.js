'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'userType', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: [['Area Comercial', 'Area de Ventas', 'Supervisor']]
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'userType');
  }
};