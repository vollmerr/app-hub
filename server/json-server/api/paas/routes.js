/* eslint-disable */
const C = require('./constants');


function paasRoutes(server, router) {
  server.get('/paas/auth', (req, res) => {
    const managerSid = req.user.sid;
    const auths = router.db
      .get('paas-authorizations')
      .value()
      .filter((x) => x[C.AUTH.MANAGER_SID] === managerSid);

    res.jsonp(auths);
  });

  server.post('/paas/auth', (req, res) => {
    req.body.forEach((auth) => {
      const newAuth = {
        ...auth,
        [C.AUTH.LAST_APPROVED]: new Date().toISOString(),
        [C.AUTH.LAST_MODIFIED]: new Date().toISOString(),
      };

      router.db
      .get('paas-authorizations')
      .find({ [C.AUTH.ID]: auth[C.AUTH.ID] })
      .assign(newAuth)
      .write();
    });

    res.sendStatus(204);
  });
}


module.exports = paasRoutes;
