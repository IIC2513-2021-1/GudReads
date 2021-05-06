const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const authors = require('./routes/authors');
const books = require('./routes/books');
const booksForAuthors = require('./routes/booksForAuthors');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async(ctx,next)=>{
    if (ctx.session.currentUserId){
      ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
    }
    return next();
  });
  
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


module.exports = router;
