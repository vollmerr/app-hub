const faker = require('faker/locale/en');

const generateJwt = require('../sec');
const C = require('./constants');


const jwts = [];
// TEST USERS FOR DEV API
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', ...Object.values(C.ROLES)]),
  text: `VAN VO - ${Object.values(C.ROLES).join(', ')}`,
});


function generateAuthorization(manager) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();
  const roles = ['AppHub User'];
  const date = new Date(faker.date.past(10));
  const status = faker.random.arrayElement(Object.values(C.STATUS));
  // set manager details
  let managerSid = '';
  let managerName = '';
  // ignore noMnaager status employees
  if (status !== C.STATUS.NO_MANAGER) {
    if (manager) {
      // manager provided, use their details
      managerSid = manager[C.AUTH.SID];
      managerName = manager[C.AUTH.FULL_NAME];
    } else {
      // make fake manager details
      managerSid = faker.random.number({ min: 0, max: C.NUM_MANAGERS });
      managerName = `Manager (${managerSid})`;
    }
  }
  // add some roles...
  // if they dont have a manager, just make them one...
  if (!manager) {
    roles.push(C.ROLES.MANAGER);
  }
  Object.values(C.ROLES)
    .filter((x) => x !== C.ROLES.MANAGER)
    .forEach((role) => {
      if (faker.random.boolean()) {
        roles.push(role);
      }
    });
  // create a jwt for user
  jwts.push({
    key: generateJwt(sid, firstName, lastName, roles),
    text: `${firstName} ${lastName} - ${roles.join(', ')}`,
  });
  // add app auths
  let possibleApps = [C.APPROVAL.NONE];
  if (status !== C.STATUS.NO_MANAGER) {
    if (faker.random.boolean()) {
      possibleApps = [C.APPROVAL.APPROVE, C.APPROVAL.DENY];
    }
  }
  const apps = Object.values(C.APPS).reduce((rest, app) => ({
    ...rest,
    [app]: faker.random.arrayElement(possibleApps),
  }), {});

  return {
    [C.AUTH.ID]: faker.random.uuid(),
    [C.AUTH.SID]: sid,
    [C.AUTH.FULL_NAME]: `${firstName} ${lastName}`,
    [C.AUTH.EMAIL]: faker.internet.email(firstName, lastName, 'state.ca.gov'),
    [C.AUTH.POS_NUMBER]: faker.random.uuid(),
    [C.AUTH.MANAGER_SID]: managerSid,
    [C.AUTH.MANAGER_NAME]: managerName,
    [C.AUTH.STATUS]: status,
    [C.AUTH.LAST_MODIFIED]: faker.date.past(1, date),
    [C.AUTH.LAST_APPROVED]: faker.date.past(1, date),
    [C.AUTH.DATE_CREATED]: faker.date.past(1, date),
    [C.AUTH.AUTH_YEAR]: date.getFullYear(),
    ...apps
  };
}


function generateMgrAuthorizations() {
  const managers = [];
  for (let i = 0; i < C.NUM_MANAGERS; i += 1) {
    managers.push(generateAuthorization());
  }
  return managers;
}


function generateEmployeeAuthorizations(managers) {
  const employees = [];
  managers.forEach((manager) => {
    const numEmployees = faker.random.number({ min: 1, max: C.NUM_EMPLOYEES });
    for (let i = 0; i < numEmployees; i += 1) {
      employees.push(generateAuthorization(manager));
    }
  });
  return employees;
}


const managers = generateMgrAuthorizations();
const employees = generateEmployeeAuthorizations(managers);
const authorizations = [
  ...managers,
  ...employees,
];


module.exports = {
  jwts,
  name: 'paas',
  keys: {
    authorizations,
  },
  routes: [
    { '/paas': '/paas-authorizations' },
    { '/paas/reports': '/paas-authorizations' },
  ],
};
