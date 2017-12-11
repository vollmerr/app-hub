/* eslint-disable */
const auth = 0; // chagne to 1 to test with authentication

const path = require('path');
const chalk = require('chalk');
const jwt = require('express-jwt');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '.db.json'));
const middlewares = jsonServer.defaults();
const redirects = require('./.routes.json');
const secret = require('./secret');

const host = 'localhost';
const port = 3001;

server.use(middlewares);

// custom routes that require some logic...
server.get('/spa/recipients/:id/acknowledgments', (req, res) => {
  let ackIds = [];
  let acks = [];
  // get the list of users acks ids
  ackIds = router.db
    .get('spa-recipients')
    .value()
    .filter(x => x.SID === req.params.id)
    .map(x => x.AcknowledgmentID);
  // get the list of acks based off the users ack ids
  acks = router.db
    .get('spa-acknowledgments')
    .value()
    .filter(x => ackIds.includes(x.id));

  res.jsonp(acks);
})

server.use(jsonServer.rewriter(redirects));
server.use(jsonServer.bodyParser);

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
  if (req.method === 'POST') {
    // set to active status
    req.body.status = 0;
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

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server at ${chalk.magenta(`http://${host}:${port}`)}`);
});
