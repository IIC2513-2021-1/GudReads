const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.author = await ctx.orm.author.findByPk(ctx.params.id, {
    include: ctx.orm.book,
  });
  if (!ctx.state.author) return ctx.throw(404);
  return next();
});

router.get('authors.list', '/', async (ctx) => {
  const authorsList = await ctx.orm.author.findAll();
  await ctx.render('authors/index', {
    authorsList,
    authorPath: (author) => ctx.router.url('authors.show', { id: author.id }),
    newAuthorPath: ctx.router.url('authors.new'),
    notice: ctx.flashMessage.notice,
  });
});

router.get('authors.new', '/new', async (ctx) => {
  const author = ctx.orm.author.build();
  await ctx.render('authors/new', {
    author,
    submitAuthorPath: ctx.router.url('authors.create'),
  });
});

router.get('authors.show', '/:id', async (ctx) => {
  const { author } = ctx.state;
  // const books = await ctx.orm.book.findAll({ where: { authorId: author.id } });
  // const books = await author.getBooks();
  await ctx.render('authors/show', {
    author,
    newBookPath: ctx.router.url('books_for_authors.new', {
      authorId: author.id,
    }),
    notice: ctx.flashMessage.notice,
  });
});

router.post('authors.create', '/', async (ctx) => {
  const author = ctx.orm.author.build(ctx.request.body);
  try {
    await author.save({ fields: ['lastName', 'firstName', 'birthDate'] });
    ctx.redirect(ctx.router.url('authors.list'));
  } catch (ValidationError) {
    await ctx.render('authors/new', {
      author,
      errors: ValidationError.errors,
      submitAuthorPath: ctx.router.url('authors.create'),
    });
  }
});

module.exports = router;
