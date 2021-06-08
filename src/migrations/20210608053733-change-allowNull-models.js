module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.changeColumn('authors', 'firstName', {
      allowNull: false,
      type: Sequelize.STRING,
    }),
  ],

  down: async (queryInterface, Sequelize) => [
    await queryInterface.changeColumn('authors', 'firstName', {
      type: Sequelize.STRING,
    }),
  ],
};
