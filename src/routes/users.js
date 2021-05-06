const KoaRouter = require('koa-router');
const router = new KoaRouter();
const bcrypt = require('bcrypt');

router.get('users.new', '/signup', (ctx) => ctx.render('users/new', {
    userCreatePath: ctx.router.url('users.create'),
    notice: ctx.flashMessage.notice,
  }));

router.post('users.create','/', async (ctx) => {
    try {
        var user = await ctx.orm.user.findOne(
        {
            where: { email:ctx.request.body.email } 
        }) 
      console.log(user)
      if (user != null) {
        return ctx.render('users/new', {
            userCreatePath: ctx.router.url('users.create'),
            error: 'El usuario ya existe',
          });
        return ctx.body = {msg: 'El usuario ya existe', state:'fail'}
      }
      ctx.body = ctx.request.body;
      const hashedPassword = await bcrypt.hash(ctx.body.password, 10)
      var user = await ctx.orm.user.create({ email: ctx.body.email, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() })
      return ctx.redirect(ctx.router.url('session.new'));
    }
    catch(error) {
      ctx.body = {msg: error,
                  state: 'fail'
                 };
    }
  })

  module.exports = router;