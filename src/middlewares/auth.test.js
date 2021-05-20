const orm = require('../models');
const { checkAuth } = require('./auth');

describe('checkAuth middleware', () => {
  const ctx = {};

  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('when currentUser exists inside ctx.state', () => {
    beforeAll(async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Web',
        email: 'user@example.org',
        password: '12345',
      };
      ctx.state = {
        currentUser: await orm.user.create(userData),
      };
    });

    test('returns undefined (it means everything is ok)', async () => {
      const result = await checkAuth(ctx, () => {});
      expect(result).toBeUndefined();
    });
  });

  describe('when currentUser does not exist inside ctx.state', () => {
    beforeAll(() => {
      ctx.state = {};
      ctx.throw = jest.fn(); // Mock ctx.throw fn
    });

    test('calls ctx.throw with 401 status code (unauthorized)', async () => {
      await checkAuth(ctx, () => {});
      expect(ctx.throw).toHaveBeenCalledWith(401);
    });
  });
});
