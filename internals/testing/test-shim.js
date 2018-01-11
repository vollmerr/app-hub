const secret = require('../../server/json-server/.secret');
const jwt = require('jsonwebtoken');

global.jwt = {
  valid: jwt.sign({
    sub: 'valid sam',
    sid: 'valid sid',
    roles: ['Test Role'],
    iat: 1512450434,
    exp: 1912450434,
  }, secret),
  expired: jwt.sign({
    sub: 'valid sam, but exipired',
    sid: 'valid sid',
    roles: ['Test Role'],
    iat: 1512450434,
    exp: 1512450435,
  }, secret),
  none: '',
};


// see https://github.com/facebook/jest/issues/4545
// Must be before test-bundler file to ignore errors that get thrown from missing requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};


global.API = {
  BARS: 'test url',
};

global.localStorage = {};
global.clearTimeout = jest.fn();
global.setTimeout = jest.fn();
