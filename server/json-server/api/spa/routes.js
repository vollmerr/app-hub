function spaRoutes(server, router) {
  server.use((req, res, next) => {
    if (req.method === 'POST') {
      if (req.url === '/spa-acknowledgments') {
        // set to active status
        req.body.status = 0;
      } else if (/\/spa-recipients\?id=\d+/.test(req.url)) {
        req.body.AcknowledgmentDate = new Date().toString();
      }
    }
    // Continue to JSON Server router
    next();
  });

  server.get('/spa/recipients/:id/acknowledgments', (req, res) => {
    let ackIds = [];
    let acks = [];
    // get the list of users acks ids
    ackIds = router.db
      .get('spa-recipients')
      .value()
      .filter((x) => x.SID === req.params.id)
      .map((x) => x.AcknowledgmentID);
    // get the list of acks based off the users ack ids
    acks = router.db
      .get('spa-acknowledgments')
      .value()
      .filter((x) => ackIds.includes(x.id));

    res.jsonp(acks);
  });
}

module.exports = spaRoutes;
