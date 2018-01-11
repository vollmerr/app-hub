const faker = require('faker/locale/en');
const jwt = require('jsonwebtoken');

const secret = require('../../.secret');
const C = require('./constants');


const jwts = [];
function generateJwt(sid, firstName, lastName, roles) {
  return jwt.sign({
    name: `${firstName} ${lastName}`,
    sub: faker.internet.email(firstName, lastName),
    sid,
    roles,
    exp: Math.floor(Date.now() / 1000) + 1000000,
    iat: Math.floor(Date.now() / 1000),
  }, secret);
}
// TEST USERS FOR DEV API
jwts.push({
  key: generateJwt('S-1-5-21-695811389-1873965473-9522986-6116', 'Van', 'Vo', ['AppHub User', ...Object.values(C.ROLES)]),
  text: 'VAN VO - PAAS Manager',
});

function generateAuthorization(manager) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();
  const roles = ['AppHub User'];
  const managerSid = manager ? manager[C.AUTH.SID] : faker.random.number({ min: 0, max: 4 });
  // add some roles...
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

  return {
    [C.AUTH.SID]: sid,
    // [C.AUTH.SAM]: faker.internet.userName(firstName, lastName),
    [C.AUTH.FIRST_NAME]: firstName,
    [C.AUTH.LAST_NAME]: lastName,
    [C.AUTH.EMAIL]: faker.internet.email(firstName, lastName, 'state.ca.gov'),
    [C.AUTH.POS_NUMBER]: faker.random.uuid(),
    [C.AUTH.MANAGER_SID]: managerSid,
    [C.AUTH.MANAGER_NAME]: `Manager Name ${managerSid}`,
    [C.AUTH.STATUS]: faker.random.arrayElement(Object.values(C.APPROVAL)),
    [C.AUTH.LAST_MODIFIED]: faker.date.past(),
  };
}


function generateMgrAuthorizations() {
  const managers = [];
  for (let i = 0; i < 5; i += 1) {
    managers.push(generateAuthorization());
  }
  return managers;
}


function generateEmployeeAuthorizations(managers) {
  const employees = [];
  managers.forEach((manager) => {
    const numEmployees = faker.random.number({ min: 1, max: 10 });
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
  ],
};
