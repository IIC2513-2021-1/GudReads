const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', { appVersion: pkg.version, authorsPath: ctx.router.url('authors.list') });
});

module.exports = router;
