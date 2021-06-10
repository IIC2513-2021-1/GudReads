const supertest = require('supertest');
const { format } = require('date-fns');
const app = require('../../app');

const request = supertest(app.callback());

describe('Author routes', () => {
  let auth;
  const userFields = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@gmail.com',
    password: 'testPassword',
  };

  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
    await app.context.orm.user.create(userFields);
    const authResponse = await request
      .post('/api/auth')
      .set('Content-type', 'application/json')
      .send({ email: userFields.email, password: userFields.password });
    auth = authResponse.body;
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });

  describe('GET /api/authors/:id', () => {
    let author;
    let response;
    const authorData = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
    };
    const authorizedGetAuthor = (id) => request
      .get(`/api/authors/${id}`)
      .auth(auth.access_token, { type: 'bearer' });
    const unauthorizedGetAuthor = (id) => request.get(`/api/authors/${id}`);

    beforeAll(async () => {
      author = await app.context.orm.author.create(authorData);
    });

    describe('when passed id corresponds to an existing author', () => {
      beforeAll(async () => {
        response = await authorizedGetAuthor(author.id);
      });

      test('responds with 200 status code', () => {
        expect(response.status).toBe(200);
      });

      test('responds with a json body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when passed id does not correspond to any author', () => {
      test('responds with 404 status code', async () => {
        response = await authorizedGetAuthor(author.id * -1);
        expect(response.status).toBe(404);
      });
    });

    describe('when request is unauthorized because user is not logged in', () => {
      test('unauthorized get request to endpoint', async () => {
        response = await unauthorizedGetAuthor(author.id);
        expect(response.status).toBe(401);
      });
    });
  });

  describe('POST /api/authors', () => {
    const authorData = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
    };
    const authorizedPostAuthor = (body) => request
      .post('/api/authors')
      .auth(auth.access_token, { type: 'bearer' })
      .set('Content-type', 'application/json')
      .send(body);
    const unauthorizedPostAuthor = (body) => request
      .post('/api/authors')
      .set('Content-type', 'application/json')
      .send(body);

    describe('author data is valid', () => {
      let response;

      beforeAll(async () => {
        response = await authorizedPostAuthor(authorData);
      });

      test('responds with 201 (created) status code', () => {
        expect(response.status).toBe(201);
      });

      test('responds with a JSON body type', () => {
        expect(response.type).toEqual('application/json');
      });

      test('response for POST author has an id (author has an id)', () => {
        expect(response.body.data.id).toBeDefined();
      });

      test('post request actually created the the given author', async () => {
        const author = await app.context.orm.author.findByPk(response.body.data.id);
        const { firstName, lastName, birthDate } = author.dataValues;
        const sanitizedAuthor = { firstName, lastName, birthDate };
        expect(sanitizedAuthor).toEqual(authorData);
      });
    });

    describe('author data is invalid', () => {
      test('responds with 400 status code', async () => {
        const invalidBodies = [
          {},
          { firstName: 'John' },
          { lastName: 'Doe' },
          { firstName: 'John', lastName: 'Doe', birthDate: 'My birthday 🥳' },
          { firstName: 'John', last_name: 'Doe' },
          { lastName: 'Doe', birthDate: authorData.birthDate },
        ];
        await Promise.all(invalidBodies.map(authorizedPostAuthor))
          .then((responses) => {
            responses.forEach((response) => expect(response.status).toBe(400));
          });
      });
    });

    describe('author data is valid but request is unauthorized', () => {
      test('responds with 201 (created) status code', async () => {
        const response = await unauthorizedPostAuthor(authorData);
        expect(response.status).toBe(401);
      });
    });
  });
});
