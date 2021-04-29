const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', {
    appVersion: pkg.version,
    authorsPath: ctx.router.url('authors.list'),
    newBookPath: ctx.router.url('books.new'),
  });
});

module.exports = router;
