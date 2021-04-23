const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const authors = require('./routes/authors');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/authors', authors.routes());

module.exports = router;
