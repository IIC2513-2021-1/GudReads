const KoaRouter = require('koa-router');
const { checkAuth } = require('../middlewares/auth');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.book = await ctx.orm.book.findByPk(ctx.params.id);
  if (!ctx.state.book) return ctx.throw(404);
  return next();
});

router.use(checkAuth);

router.post('books.create', '/', async (ctx) => {
  const book = ctx.orm.book.build(ctx.request.body);
  try {
    await book.save({ field: ['title', 'publication', 'authorId', 'description', 'pages'] });
    ctx.redirect(ctx.router.url('authors.show', { id: book.authorId }));
  } catch (ValidationError) {
    const authorList = await ctx.orm.author.findAll();
    await ctx.render('books/new', {
      book,
      authorList,
      errors: ValidationError.errors,
      submitBookPath: ctx.router.url('books.create'),
    });
  }
});

router.get('books.new', '/new', async (ctx) => {
  const book = ctx.orm.book.build();
  const authorList = await ctx.orm.author.findAll();
  await ctx.render('books/new', {
    book,
    authorList,
    submitBookPath: ctx.router.url('books.create'),
  });
});

router.get('books.show', '/:id', async (ctx) => {
  const { book } = ctx.state;
  await ctx.render('books/show', {
    book,
    backToAuthorPath: ctx.router.url('authors.show', { id: book.authorId }),
    notice: ctx.flashMessage.notice,
  });
});

module.exports = router;
