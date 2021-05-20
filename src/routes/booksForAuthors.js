const KoaRouter = require('koa-router');
const { checkAuth } = require('../middlewares/auth');
const { getAuthor } = require('../middlewares/authors');

const router = new KoaRouter();

router.use(checkAuth);

router.get('books_for_authors.new', '/new', getAuthor, async (ctx) => {
  const { author } = ctx.state;
  const book = ctx.orm.book.build();
  await ctx.render('books/new_for_authors', {
    book,
    submitBookPath: ctx.router.url('books_for_authors.create', {
      authorId: author.id,
    }),
  });
});

router.post('books_for_authors.create', '/', getAuthor, async (ctx) => {
  const { author } = ctx.state;
  try {
    await author.createBook(ctx.request.body);
    ctx.redirect(ctx.router.url('authors.show', { id: author.id }));
  } catch (ValidationError) {
    await ctx.render('books/new_for_authors', {
      errors: ValidationError.errors,
      submitBookPath: ctx.router.url('books_for_authors.create', {
        authorId: author.id,
      }),
    });
  }
});

module.exports = router;
