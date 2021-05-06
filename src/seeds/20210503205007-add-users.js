'use strict';
const faker = require('faker');

const users = [...Array(10)].map((user) => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

users.push({
  firstName: 'Jalen',
  lastName: '87',
  email: 'Jalen83@gmail.com',
  password: 'KMsnQpv4',
  createdAt: new Date(),
  updatedAt: new Date()  
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
