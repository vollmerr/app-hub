/* eslint-disable */
const auth = 1; // chagne to 1 to test with authentication

const path = require('path');
const chalk = require('chalk');
const jwt = require('express-jwt');
const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '.db.json'));
const middlewares = jsonServer.defaults();
const redirects = require('./.routes.json');
const secret = require('./.secret');

const spaRoutes = require('./api/spa/routes');
const paasRoutes = require('./api/paas/routes');

const host = 'localhost';
const port = 3001;

server.use(middlewares);
server.use(jsonServer.rewriter(redirects));
server.use(jsonServer.bodyParser);
server.use(cors());

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
  next();
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

spaRoutes(server, router);
paasRoutes(server, router);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server at ${chalk.magenta(`http://${host}:${port}`)}`);
});
