require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../../middlewares/auth');
const authors = require('./authors');
const auth = require('./auth');
const users = require('./users');

const router = new KoaRouter({ prefix: '/api' });

/* Unprotected routes */
router.use('/auth', auth.routes());
router.use('/users', users.routes());

/* Protected routes */
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }).unless({ method: 'GET' }));
router.use(apiSetCurrentUser);

router.use('/authors', authors.routes());

module.exports = router;
