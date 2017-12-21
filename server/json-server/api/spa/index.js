const faker = require('faker/locale/en');
const jwt = require('jsonwebtoken');

const secret = require('../../secret');
const C = require('./constants');

const jwts = [];
function generateJwt(sid, firstName, lastName, roles) {
  return jwt.sign({
    name: `${firstName} ${lastName}`,
    sub: sid,
    roles,
    exp: Math.floor(Date.now() / 1000) + 1000000,
  }, secret);
}

function generateUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();
  const roles = ['AppHub User'];
  // add some roles...
  C.ROLES.forEach((role) => {
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
    [C.RECIPIENT.SID]: sid,
    [C.RECIPIENT.SAM]: faker.internet.userName(firstName, lastName),
    [C.RECIPIENT.FIRST_NAME]: firstName,
    [C.RECIPIENT.LAST_NAME]: lastName,
    [C.RECIPIENT.EMAIL]: faker.internet.email(firstName, lastName, 'state.ca.gov'),
  };
}

function generateRecipient(user) {
  let firstReminder = '';
  let secondReminder = '';
  let finalReminder = '';
  let ackDate = '';

  if (faker.random.boolean()) {
    firstReminder = faker.date.future(1);
    if (faker.random.boolean()) {
      secondReminder = faker.date.future(2);
      if (faker.random.boolean()) {
        finalReminder = faker.date.future(3);
      }
    }
  }

  if (faker.random.boolean()) {
    ackDate = faker.date.future(4);
  }

  return {
    [C.RECIPIENT.FIRST_REMINDER_DATE]: firstReminder,
    [C.RECIPIENT.SECOND_REMINDER_DATE]: secondReminder,
    [C.RECIPIENT.FINAL_REMINDER_DATE]: finalReminder,
    [C.RECIPIENT.ACK_ID]: faker.random.number({ min: C.MIN_ACK, max: C.MAX_ACK }),
    [C.RECIPIENT.ACK_DATE]: ackDate,
    ...user,
  };
}


function generateAcknowledgment() {
  const targetGroups = Array
    .from(
    { length: faker.random.number({ min: C.MIN_TARGET, max: C.MAX_TARGET }) },
    () => faker.random.number({ min: C.MIN_TARGET, max: C.MAX_TARGET })
    )
    .filter((x, i, arr) => i === arr.indexOf(x));

  return {
    [C.ACK.ID]: faker.random.number({ min: C.MIN_ACK, max: C.MAX_ACK }),
    [C.ACK.TITLE]: faker.lorem.words(),
    [C.ACK.STATUS]: faker.random.number({ min: C.MIN_STATUS, max: C.MAX_STATUS }),
    [C.ACK.START_DATE]: faker.date.past(),
    [C.ACK.END_DATE]: faker.date.future(),
    // CREATED_BY
    // CREATED_DATE
    [C.ACK.CREATOR_GROUP]: faker.random.number({ min: C.MIN_CREATOR, max: C.MAX_CREATOR }),
    [C.ACK.TARGET_GROUPS]: targetGroups,
    [C.ACK.DETAILS]: faker.lorem.paragraphs(),
    [C.ACK.STATEMENT]: faker.lorem.sentences(),
    [C.ACK.FILE_NAME]: faker.system.fileName(),
    [C.ACK.FILE_CONTENT]: faker.image.abstract(),
    // UPDATED_BY
    // UPDATED_DATE
  };
}


function generateUsers() {
  const users = [];
  for (let i = 0; i < 20; i += 1) {
    users.push(generateUser());
  }
  return users;
}


function generateRecipients(users) {
  const recipients = [];
  for (let i = 0; i < 500; i += 1) {
    const user = users[i % 20];
    const recipient = generateRecipient(user);
    // if the user dosnt already have an acknowledgment with that id
    if (!recipients.find((x) => (
      x[C.RECIPIENT.ACK_ID] === recipient[C.RECIPIENT.ACK_ID] &&
      x[C.RECIPIENT.SID] === recipient[C.RECIPIENT.SID]
    ))) {
      recipient[C.RECIPIENT.ID] = i;
      // add to the pile...
      recipients.push(recipient);
    }
  }
  return recipients;
}


function generateAcknowledgments() {
  const acks = [];
  for (let i = 0; i < 300; i += 1) {
    const ack = generateAcknowledgment();
    if (!acks.find((x) => (
      x[C.ACK.ID] === ack[C.ACK.ID]
    ))) {
      acks.push(ack);
    }
  }
  return acks;
}


function generateGroups(min, max) {
  const groups = [];
  for (let i = min; i <= max; i += 1) {
    groups.push({
      [C.GROUP.NAME]: faker.lorem.words(),
      [C.GROUP.SID]: i,
    });
  }
  return groups;
}


const users = generateUsers();
const recipients = generateRecipients(users);
const acknowledgments = generateAcknowledgments();
const targetGroups = generateGroups(C.MIN_TARGET, C.MAX_TARGET);
const creatorGroups = generateGroups(C.MIN_CREATOR, C.MAX_CREATOR);

module.exports = {
  jwts,
  name: 'spa',
  keys: {
    recipients,
    acknowledgments,
    targetGroups,
    creatorGroups,
  },
  routes: [
    { '/spa': '/spa-acknowledgments' },
    { '/spa/recipients/:id': `/spa-recipients?${C.RECIPIENT.SID}=:id` },
    { '/spa/acknowledgments/:id/recipients': `/spa-recipients?${C.RECIPIENT.ACK_ID}=:id` },
    { '/spa/groups/targets': '/spa-targetGroups' },
    { '/spa/groups/creators': '/spa-creatorGroups' },
  ],
};
