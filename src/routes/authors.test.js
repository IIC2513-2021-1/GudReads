const supertest = require('supertest');
const app = require('../app');

const request = supertest(app.callback());

describe('Authors routes', () => {
  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });

  describe('GET /authors/:id', () => {
    let author;

    beforeAll(async () => {
      const authorData = {
        firstName: 'Jane',
        lastName: 'Writer',
      };
      author = await app.context.orm.author.create(authorData);
    });

    describe('when passed id corresponds to an existing author', () => {
      test('responds with 200 status code', async () => {
        const response = await request.get(`/authors/${author.id}`);
        expect(response.status).toBe(200);
      });
    });

    describe('when passed id does not correspond to any author', () => {
      test('responds with 404 status code', async () => {
        const response = await request.get(`/authors/${author.id + 10}`);
        expect(response.status).toBe(404);
      });
    });
  });

  describe('POST /authors', () => {
    describe('with valid author data', () => {
      test('responds with 302 status code (redirects to authors list)', async () => {
        const response = await request
          .post('/authors')
          .send({ firstName: 'Joanne', lastName: 'Rowling' });
        expect(response.status).toBe(302);
      });
    });

    describe('with invalid author data', () => {
      // TODO: implement this scenario as well
    });
  });
});
