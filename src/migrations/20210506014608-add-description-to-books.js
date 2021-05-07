'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.addColumn('books', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    }),
    await queryInterface.addColumn('books', 'pages', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  ],

  down: async (queryInterface) => [
    await queryInterface.removeColumn('books', 'description'),
    await queryInterface.removeColumn('books', 'pages'),
  ],
};
