const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('authors.list', '/', async (ctx) => {
  const authorsList = await ctx.orm.author.findAll();
  await ctx.render('authors/index', {
    authorsList,
    notice: ctx.flashMessage.notice,
  });
});

module.exports = router;
