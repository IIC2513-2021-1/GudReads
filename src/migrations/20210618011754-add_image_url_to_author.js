module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('authors', 'imageUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
      default: 'https://res.cloudinary.com/diegoheg/image/upload/v1623946859/descarga_ezg46l.jpg',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('authors', 'imageUrl');
  },
};
