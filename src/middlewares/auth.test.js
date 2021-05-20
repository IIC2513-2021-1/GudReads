const orm = require('../models');
const { checkAuth, setCurrentUser } = require('./auth');

describe('Auth middlewares', () => {
  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('checkAuth middleware', () => {
    const ctx = {};

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

  describe('setCurrentUser middleware', () => {
    const ctx = { orm };

    describe('when currentUserId exists inside ctx.session', () => {
      let user;

      beforeAll(async () => {
        const userData = {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.org',
          password: '12345',
        };
        user = await orm.user.create(userData);
      });

      describe('when there is a user with id equals to ctx.session.currentUserId', () => {
        beforeAll(async () => {
          ctx.session = {
            currentUserId: user.id,
          };
          ctx.state = {};

          await setCurrentUser(ctx, () => {});
        });

        test('sets ctx.state.currentUser with the instance of the user', async () => {
          expect(ctx.state.currentUser.toJSON()).toEqual(user.toJSON());
        });
      });

      describe('when there is no user with id equals to ctx.session.currentUserId', () => {
        beforeAll(async () => {
          ctx.session = {
            currentUserId: user.id + 10, // Use a different authorId
          };
          ctx.state = {};

          await setCurrentUser(ctx, () => {});
        });

        test('does not set ctx.state.currentUser', async () => {
          expect(ctx.state.currentUser).toBeNull();
        });
      });
    });

    describe('when currentUserId does not exist inside ctx.session', () => {
      beforeAll(async () => {
        ctx.session = {};
        ctx.state = {};

        await setCurrentUser(ctx, () => {});
      });

      test('does not set ctx.state.currentUser', async () => {
        expect(ctx.state.currentUser).toBeUndefined();
      });
    });
  });
});
