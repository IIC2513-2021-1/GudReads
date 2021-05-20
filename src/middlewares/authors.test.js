const orm = require('../models');
const { getAuthor } = require('./authors');

describe('getAuthor middleware', () => {
  const ctx = { orm };

  beforeAll(async () => {
    await orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await orm.sequelize.close();
  });

  describe('when authorId exists inside ctx.params', () => {
    let author;

    beforeAll(async () => {
      const authorData = {
        firstName: 'Jane',
        lastName: 'Writer',
      };
      author = await orm.author.create(authorData);
    });

    describe('when there is a user with id equals to ctx.params.authorId', () => {
      beforeAll(async () => {
        ctx.params = {
          authorId: author.id,
        };
        ctx.state = {};
      });

      test('sets ctx.state.author with the instance of the author', async () => {
        await getAuthor(ctx, () => {});
        expect(ctx.state.author.toJSON()).toEqual(author.toJSON());
      });
    });

    describe('when there is no user with id equals to ctx.params.authorId', () => {
      beforeAll(async () => {
        ctx.params = {
          authorId: author.id + 1, // Use a different authorId
        };
        ctx.state = {};
        ctx.throw = jest.fn(); // Mock ctx.throw fn

        await getAuthor(ctx, () => {});
      });

      test('calls ctx.throw with 404 status code (not found)', async () => {
        expect(ctx.throw).toHaveBeenCalledWith(404);
      });

      test('does not set ctx.state.author', async () => {
        expect(ctx.state.author).toBeNull();
      });
    });
  });

  describe('when authorId does not exist inside ctx.params', () => {
    // TODO: implement this scenario as well
  });
});
