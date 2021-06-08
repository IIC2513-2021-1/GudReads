const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const AuthorSerializer = new JSONAPISerializer('authors', {
  attributes: ['firstName', 'lastName', 'birthDate'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.get('api.authors.show', '/:id', async (ctx) => {
  const author = await ctx.orm.author.findByPk(ctx.params.id);
  if (!author) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = AuthorSerializer.serialize(author);
});

router.post('api.authors.create', '/', async (ctx) => {
  try {
    const author = ctx.orm.author.build(ctx.request.body);
    await author.save({ fields: ['lastName', 'firstName', 'birthDate'] });
    ctx.status = 201;
    ctx.body = AuthorSerializer.serialize(author);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

module.exports = router;
