/* eslint-disable */
const generate = 0; // change to 1 to generate random data
const auth = 0; // chagne to 1 to test with authentication

if (generate) {
  require('./generate');
} else {
  const path = require('path');
  const chalk = require('chalk');
  const jwt = require('express-jwt');
  const jsonServer = require('json-server');
  const server = jsonServer.create();
  const router = jsonServer.router(path.join(__dirname, 'db.json'));
  const middlewares = jsonServer.defaults();

  const secret = require('./secret');

  const host = 'localhost';
  const port = 3001;

  server.use(middlewares);

  server.use(jsonServer.bodyParser)

  // handle patching in correct format
  // http://jsonpatch.com/
  // https://tools.ietf.org/html/rfc6902#section-4.3
  server.use((req, res, next) => {
    if (req.method === 'PATCH') {
      let newBody = {};
      req.body.forEach((x) => {
        // handle replace ops
        if (x.op === 'replace') {
          newBody[x.path.slice(1)] = x.value;
        }
      });
      req.body = newBody;
    }
    // Continue to JSON Server router
    next()
  })

  if (auth) {
    server.use(jwt({ secret }));
    server.use((req, res, next) => {
      if (req.user) {
        next(); // continue to JSON Server router
      } else {
        res.sendStatus(401);
      }
    });
  }

  server.use(router);

  server.listen(port, () => {
    console.log(`JSON Server at ${chalk.magenta(`http://${host}:${port}`)}`);
  });
}

