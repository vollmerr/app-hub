/* eslint-disable */
const C = require('./constants');


function pasRoutes(server, router) {
  server.get('/pas/auth', (req, res) => {
    const managerSid = req.user.sid;
    const auths = router.db
      .get('pas-authorizations')
      .value()
      .filter((x) => x[C.AUTH.MANAGER_SID] === managerSid);

    res.jsonp(auths);
  });

  server.post('/pas/auth', (req, res) => {
    req.body.forEach((auth) => {
      const newAuth = {
        ...auth,
        [C.AUTH.LAST_APPROVED]: new Date().toISOString(),
        [C.AUTH.LAST_MODIFIED]: new Date().toISOString(),
      };

      router.db
      .get('pas-authorizations')
      .find({ [C.AUTH.ID]: auth[C.AUTH.ID] })
      .assign(newAuth)
      .write();
    });

    res.sendStatus(204);
  });

  server.post('/pas/manager', (req, res) => {
    res.sendStatus(204);
  });
}


module.exports = pasRoutes;
