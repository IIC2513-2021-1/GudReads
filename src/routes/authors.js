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

router.get('authors.show', '/:id', async (ctx) => {
  const { author } = ctx.state;
  await ctx.render('authors/show', { author, notice: ctx.flashMessage.notice });
});

module.exports = router;
