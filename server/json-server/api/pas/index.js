const faker = require('faker/locale/en');

const generateJwt = require('../sec');
const C = require('./constants');


const jwts = [];
// TEST USERS FOR DEV API
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', ...Object.values(C.ROLES)]),
  text: `VAN VO - ${Object.values(C.ROLES).join(', ')}`,
});
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', C.ROLES.SECURITY]),
  text: `VAN VO - AppHub User, ${C.ROLES.SECURITY}`,
});
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', C.ROLES.HR]),
  text: `VAN VO - AppHub User, ${C.ROLES.HR}`,
});
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', C.ROLES.MANAGER]),
  text: `VAN VO - AppHub User, ${C.ROLES.MANAGER}`,
});


function generateAuthorization(manager) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();
  const roles = ['AppHub User'];
  const date = new Date(faker.date.past(10));
  let status = faker.random.arrayElement([C.STATUS.ACTIVE, C.STATUS.INACTIVE]);
  if (manager) {
    // make every 1/30 have no manager
    if (!faker.random.number({ min: 0, max: 30 })) {
      status = C.STATUS.NO_MANAGER;
    }
    // make every 1/10 have assignedManager
    if (!faker.random.number({ min: 0, max: 10 })) {
      status = C.STATUS.ASSIGNED_MANAGER;
    }
  }
  // set manager details
  let managerSid = '';
  let managerName = '';
  // ignore noManager status employees
  if (status !== C.STATUS.NO_MANAGER) {
    if (manager) {
      // manager provided, use their details
      managerSid = manager[C.AUTH.SID];
      managerName = manager[C.AUTH.FULL_NAME];
    } else {
      // make fake manager detailsfs
      // managerSid = faker.random.uuid();
      // managerName = `${faker.name.firstName()} ${faker.name.lastName()}`;
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
  let lastApproved = null;
  if (status !== C.STATUS.NO_MANAGER) {
    if (faker.random.boolean()) {
      possibleApps = [C.APPROVAL.APPROVE, C.APPROVAL.DENY];
      lastApproved = faker.date.past(1, date);
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
    [C.AUTH.LAST_APPROVED]: lastApproved,
    [C.AUTH.DATE_CREATED]: faker.date.past(1, date),
    [C.AUTH.AUTH_YEAR]: date.getFullYear(),
    ...apps,
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
  name: 'pas',
  keys: {
    authorizations,
  },
  routes: [
    { '/pas/report': '/pas-authorizations' },
  ],
};
