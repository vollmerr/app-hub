const C = require('./constants');

function spaRoutes(server, router) {
  server.use((req, res, next) => {
    if (req.method === 'POST') {
      if (req.url === '/spa-acknowledgments') {
        // set to active status
        req.body[C.ACK.STATUS] = 0;
      } else if (/\/spa-recipients\?id=\d+/.test(req.url)) {
        req.body[C.RECIPIENT.ACK_DATE] = new Date().toISOString();
      }
    }
    // Continue to JSON Server router
    next();
  });

  server.get('/spa/recipients/:sid/acknowledgments', (req, res) => {
    let ackIds = [];
    let acks = [];
    // get the list of users acks ids
    ackIds = router.db
      .get('spa-recipients')
      .value()
      .filter((x) => x[C.RECIPIENT.SID] === req.params.sid)
      .map((x) => x[C.RECIPIENT.ACK_ID]);
    // get the list of acks based off the users ack ids
    acks = router.db
      .get('spa-acknowledgments')
      .value()
      .filter((x) => ackIds.includes(x[C.ACK.ID]));

    res.jsonp(acks);
  });

  server.post(`/spa/recipients/:${C.RECIPIENT.ID}/acknowledge`, (req, res) => {
    router.db
      .get('spa-recipients')
      .find({ [C.RECIPIENT.ID]: Number(req.params[C.RECIPIENT.ID]) })
      .assign({ [C.RECIPIENT.ACK_DATE]: new Date().toISOString() })
      .write();

    res.sendStatus(204);
  });
}

module.exports = spaRoutes;
