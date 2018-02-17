const C = require('./constants');

function spaRoutes(server, router) {
  // GET a recipients acknowledgments
  server.get('/spa/recipients/:sid/acknowledgements', (req, res) => {
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
  // GET a list of users creator groups
  server.get('/spa/creators', (req, res) => {
    const sid = req.user.sid;
    const users = router.db
      .get('spa-usersCreatorGroups')
      .value();
    res.jsonp(users[sid]);
  });
  // GET a list of users target groups
  server.get('/spa/targets', (req, res) => {
    const sid = req.user.sid;
    const users = router.db
      .get('spa-usersTargetGroups')
      .value();
    res.jsonp(users[sid]);
  });
  // POST an acknowlegment to acknowledge it
  server.post(`/spa/recipients/:${C.RECIPIENT.ID}/acknowledge`, (req, res) => {
    router.db
      .get('spa-recipients')
      .find({ [C.RECIPIENT.ID]: req.params[C.RECIPIENT.ID] })
      .assign({ [C.RECIPIENT.ACK_DATE]: new Date().toISOString() })
      .write();

    res.sendStatus(204);
  });
  // POST an acknowlegment to deactive it (from active state)
  server.post(`/spa/acknowledgements/:${C.ACK.ID}/deactivate`, (req, res) => {
    router.db
      .get('spa-acknowledgments')
      .find({ [C.ACK.ID]: req.params[C.ACK.ID] })
      .assign({ [C.ACK.STATUS]: C.STATUS.DEACTIVATED })
      .write();

    res.sendStatus(204);
  });
  // POST an acknowlegment to cancel it (from draft state)
  server.post(`/spa/acknowledgements/:${C.ACK.ID}/cancel`, (req, res) => {
    router.db
      .get('spa-acknowledgments')
      .find({ [C.ACK.ID]: req.params[C.ACK.ID] })
      .assign({ [C.ACK.STATUS]: C.STATUS.CANCELED })
      .write();

    res.sendStatus(204);
  });
}

module.exports = spaRoutes;
