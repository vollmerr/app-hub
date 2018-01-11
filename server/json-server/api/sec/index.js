const jwt = require('jsonwebtoken');

const secret = require('../../.secret');


function generateJwt(sid, firstName, lastName, roles) {
  return jwt.sign({
    name: `${firstName} ${lastName}`,
    sub: `${firstName}.${lastName}`,
    sid,
    roles,
    exp: Math.floor(Date.now() / 1000) + 1000000,
    iat: Math.floor(Date.now() / 1000),
  }, secret);
}

module.exports = generateJwt;
