'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authorsArray = [];

    authorsArray.push({
      firstName: 'Joanne',
      lastName: 'Rowling',
      birthDate: '1965-07-31',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    authorsArray.push({
      firstName: 'Suzanne',
      lastName: 'Collins',
      birthDate: '1962-08-10',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('authors', authorsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
