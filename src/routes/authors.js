const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.author = await ctx.orm.author.findByPk(ctx.params.id);
  if (!ctx.state.author) return ctx.throw(404);
  return next();
});

router.get('authors.list', '/', async (ctx) => {
  const authorsList = await ctx.orm.author.findAll();
  await ctx.render('authors/index', {
    authorsList,
    authorPath: (author) => ctx.router.url('authors.show', { id: author.id }),
    notice: ctx.flashMessage.notice,
  });
});

router.get('authors.new', '/new', async (ctx) => {
  await ctx.render('authors/new', {
    submitAuthorPath: ctx.router.url('authors.create'),
  });
});

router.get('authors.show', '/:id', async (ctx) => {
  const { author } = ctx.state;
  await ctx.render('authors/show', { author, notice: ctx.flashMessage.notice });
});

router.post('authors.create', '/', async (ctx) => {
  const author = ctx.orm.author.build(ctx.request.body);
  try {
    await author.save({ fields: ['lastName', 'firstName', 'birthDate'] });
    ctx.redirect(ctx.router.url('authors.list'));
  } catch (e) {
    await ctx.render('authors/new', {
      error: e,
      submitAuthorPath: ctx.router.url('authors.create'),
    });
  }
});

module.exports = router;
