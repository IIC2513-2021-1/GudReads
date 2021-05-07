const KoaRouter = require('koa-router');
const { checkAuth } = require('../middlewares/auth');

const router = new KoaRouter();

router.use(checkAuth);

router.get('books.new', '/new', async (ctx) => {
  const book = ctx.orm.book.build();
  const authorList = await ctx.orm.author.findAll();
  await ctx.render('books/new', {
    book,
    authorList,
    submitBookPath: ctx.router.url('books.create'),
  });
});

router.post('books.create', '/', async (ctx) => {
  const book = ctx.orm.book.build(ctx.request.body);
  try {
    await book.save({ field: ['title', 'publication', 'authorId'] });
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

module.exports = router;
