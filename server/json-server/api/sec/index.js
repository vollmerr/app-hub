const jwt = require('jsonwebtoken');

const secretFile = process.env.CI ? '.secret.tmp' : '.secret';
const secret = require(`../../${secretFile}`);


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
