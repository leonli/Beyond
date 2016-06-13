require('babel-core/register')({
    presets: ['es2015-node5', 'stage-3']
});
require('babel-polyfill');

// Setup the node evnironment to global application context
global.__ENV_MODE__ = process.env.NODE_ENV || 'dev';
global.__PORT__ = process.env.PORT ? process.env.PORT : 3000;

// export for test engine - mocha
module.exports = exports = require('./src');
