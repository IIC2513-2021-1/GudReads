'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const booksArray = [];

    booksArray.push({
      title: 'Harry Potter y la piedra filosofal',
      publication: 1997,
      authorId: 8, // Fix this according to your db
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y el insoportable primo Dudley. Harry se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre. En ella le comunican que ha sido aceptado como alumno en el Colegio Hogwarts de Magia.',
      pages: 800,
    });

    booksArray.push({
      title: 'Harry Potter y la camara secreta',
      publication: 1998,
      authorId: 8, // Fix this according to your db
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'La trama sigue el segundo año de Harry Potter en el Colegio Hogwarts de Magia y Hechicería, durante el cual una serie de mensajes en las paredes de los pasillos de la escuela advierten que la Cámara de los Secretos ha sido abierta y que el "heredero de Slytherin" matará a todos los alumnos que no provengan de familias con sangre mágica.',
      pages: 940,
    });

    booksArray.push({
      title: 'Los juegos del hambre',
      publication: 2008,
      authorId: 9, // Fix this according to your db
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Sin libertad y en la pobreza, nadie puede salir de los límites de su distrito. Sólo una chica de 16 años, Katniss Everdeen, osa desafiar las normas para conseguir comida. Sus prinicipios se pondrán a prueba con “Los juegos del hambre”, espectáculo televisado que el Capitolio organiza para humillar a la población.',
      pages: 560,
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
