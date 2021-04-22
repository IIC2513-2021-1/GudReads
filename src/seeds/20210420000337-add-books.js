'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const booksArray = [];

    booksArray.push({
      title: 'Harry Potter y la piedra filosofal',
      publication: 1997,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Harry Potter y la camara secreta',
      publication: 1998,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    booksArray.push({
      title: 'Los juegos del hambre',
      publication: 2008,
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('books', booksArray);
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
