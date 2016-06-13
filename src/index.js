import koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import session from 'koa-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import koaBunyanLogger from 'koa-bunyan-logger';
// Import defined routes
import {router} from './routes';
import lasso from 'lasso';
import {devConfig, prodConfig} from '../config';
import send from 'koa-send';

// const passport = global.$passport = require("./middlewares/passport");
// Config Lasso for building up the static resources
if (__ENV_MODE__ !== 'production') {
  lasso.configure(devConfig);
  require('../config/browser-refresh-config').enable();
} else {
  lasso.configure(prodConfig);
}
require('../db/install.js');
// Init the Koa application
const app = new koa();
// Init the koa logger
app.use(convert(koaBunyanLogger({
  name: 'duoduo',
  level: __ENV_MODE__ !== 'production' ? 'debug' : 'info'
})));
app.use(require('koa-logger')());
// Init the session midleware, we will use memory store in development mode
app.keys = ['markoa-4mjsd67D9s'];
app.use(convert(session(app)));
// TODO prodction session store

// Init the compress midleware
app.use(compress({
  filter: content_type => {
    return /text|json|javascript/i.test(content_type);
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));


app.use(convert(bodyParser()));

// Init routes
app.use(router.routes());

// Apply serving static resources
app.use(serve('./static'));
app.use(serve('./public'));

// we will export the koa app for test cases
module.exports = exports = app.listen(__PORT__ || 3000);

if (__ENV_MODE__ !== 'production') {
  if (process.send) {
    process.send('online');
  }
}

console.info(`==> Server now is listening on port ${__PORT__}`);
