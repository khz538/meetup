'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT,
        // allowNull: false,
      },
      longitude: {
        type: Sequelize.FLOAT,
        // allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Venues');
  }
};