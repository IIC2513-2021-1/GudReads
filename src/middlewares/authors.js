async function getAuthor(ctx, next) {
  ctx.state.author = await ctx.orm.author.findByPk(ctx.params.authorId);
  if (!ctx.state.author) return ctx.throw(404);
  return next();
}

module.exports = {
  getAuthor,
};
