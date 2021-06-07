const KoaRouter = require('koa-router');
const authors = require('./authors');

const router = new KoaRouter();

router.use('/authors', authors.routes());

module.exports = router;
