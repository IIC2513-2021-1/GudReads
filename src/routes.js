const KoaRouter = require('koa-router');

const { setCurrentUser } = require('./middlewares/auth');
const hello = require('./routes/hello');
const index = require('./routes/index');
const authors = require('./routes/authors');
const books = require('./routes/books');
const booksForAuthors = require('./routes/booksForAuthors');
const session = require('./routes/session');
const api = require('./routes/api');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.status) {
      case 401:
        ctx.app.emit('error', err, ctx);
        ctx.redirect(ctx.router.url('session.new'));
        break;
      default:
        throw err;
    }
  }
});

router.use(setCurrentUser);

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    paths: {
      destroySession: ctx.router.url('session.destroy'),
      newSession: ctx.router.url('session.new'),
    },
  });
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/authors', authors.routes());
router.use('/books', books.routes());
router.use('/authors/:authorId/books', booksForAuthors.routes());
router.use('/session', session.routes());
router.use('/api', api.routes());

module.exports = router;
