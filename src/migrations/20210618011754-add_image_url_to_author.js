module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('authors', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
      // Cambiar defaultValue a voluntad, dejo imagen genérica
      defaultValue: 'https://res.cloudinary.com/dee8jw8ue/image/upload/v1623992961/descarga_puc6lu.jpg',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('authors', 'imageUrl');
  },
};
