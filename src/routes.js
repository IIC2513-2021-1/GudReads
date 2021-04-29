const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const authors = require('./routes/authors');
const books = require('./routes/books');
const booksForAuthors = require('./routes/booksForAuthors');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/authors', authors.routes());
router.use('/books', books.routes());
router.use('/authors/:authorId/books', booksForAuthors.routes());

module.exports = router;
