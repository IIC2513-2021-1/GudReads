const faker = require('faker');
const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

const users = [...Array(10)].map(() => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(8), PASSWORD_SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
));

users.push({
  firstName: 'Jalen',
  lastName: '87',
  email: 'Jalen83@gmail.com',
  password: bcrypt.hashSync('KMsnQpv4', PASSWORD_SALT_ROUNDS),
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', users, {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
