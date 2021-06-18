const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const AuthorSerializer = new JSONAPISerializer('authors', {
  attributes: ['firstName', 'lastName', 'birthDate', 'imageUrl'],
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
    await author.save({ fields: ['firstName', 'lastName', 'birthDate'] });
    ctx.status = 201;
    ctx.body = AuthorSerializer.serialize(author);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

router.patch('api.authors.update', '/:id', async (ctx) => {
  const { cloudinary } = ctx.state;
  try {
    // Remover línea siguiente si se agrega un router.params
    const author = await ctx.orm.author.findByPk(ctx.params.id);
    const { image } = ctx.request.files;
    if (image.size > 0) {
      const imageUrl = await cloudinary.uploader.upload(image.path);
      ctx.request.body.imageUrl = imageUrl.url;
    }
    await author.update(ctx.request.body, { fields: ['firstName', 'lastName', 'birthDate', 'imageUrl'] });
    ctx.body = AuthorSerializer.serialize(author);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

module.exports = router;
