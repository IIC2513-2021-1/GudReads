module.exports = function sendExampleEmail(ctx, data, user) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('login-email', { to: user.email, subject: 'Nuevo Inicio de Sesión || GudReads' }, { data, user });
};
