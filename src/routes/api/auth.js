const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');
require('dotenv').config();

const router = new KoaRouter();

async function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  if (!user) {
    ctx.throw(404, `No user found with ${email}`);
  } else if (!await user.checkPassword(password)) {
    ctx.throw(401, 'Invalid password');
  }
  try {
    const token = await generateToken(user);
    ctx.body = { access_token: token };
  } catch (error) {
    ctx.throw(400);
  }
});

module.exports = router;
