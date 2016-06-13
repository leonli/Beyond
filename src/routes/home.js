import marko from 'marko';
const welcomeTemplate = marko.load(require.resolve('../views/templates/welcome/index.marko'));
import {userList, addUser} from '../services';

export const home = async (ctx, next) => {
  ctx.body = welcomeTemplate.stream({userList});
  ctx.type = 'text/html';
  await next();
};

export const userAdd = async (ctx, next) => {
  const result = await addUser(ctx.request.body);
  if (result.err) {
    console.log(result.err);
  }
  ctx.redirect("/");
};
