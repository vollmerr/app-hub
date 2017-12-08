const faker = require('faker/locale/en');
const jwt = require('jsonwebtoken');

const secret = require('../secret');

const userRoles = [
  'SPA Admin',
  'SPA Guard',
];

const a = {
  ID: 'id',
  TITLE: 'title',
  DATE_START: 'activeStartDate',
  DATE_END: 'activeEndDate',
  CREATOR_GROUP: 'creatorGroup',
  TARGET_GROUPS: 'targetADGroup',
  STATEMENT: 'ackStatement',
  DETAILS: 'detailsText',
  FILE_NAME: 'fileName',
  FILE_CONTENT: 'fileContent',
  STATUS: 'status',
};
// fields for recipient
const r = {
  ID: 'id',
  SID: 'SID',
  SAM: 'SamAccount',
  FIRST_NAME: 'FirstName',
  LAST_NAME: 'LastName',
  EMAIL: 'Email',
  FIRST_REMINDER_DATE: 'FirstReminderDate',
  SECOND_REMINDER_DATE: 'SecondReminderDate',
  FINAL_REMINDER_DATE: 'FinalReminderDate',
  ACK_ID: 'AcknowledgmentID',
  ACK_DATE: 'AcknowledgmentDate',
};

const jwts = [];
function generateJwt(sid, firstName, lastName, roles) {
  return jwt.sign({
    name: `${firstName} ${lastName}`,
    sub: sid,
    roles,
    exp: Math.floor(Date.now() / 1000) + 10000,
  }, secret);
}

function generateUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();
  const roles = ['AppHub User'];
  // add some roles...
  userRoles.forEach((role) => {
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
    [r.SID]: sid,
    [r.SAM]: faker.internet.userName(firstName, lastName),
    [r.FIRST_NAME]: firstName,
    [r.LAST_NAME]: lastName,
    [r.EMAIL]: faker.internet.email(firstName, lastName, 'state.ca.gov'),
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
    [r.FIRST_REMINDER_DATE]: firstReminder,
    [r.SECOND_REMINDER_DATE]: secondReminder,
    [r.FINAL_REMINDER_DATE]: finalReminder,
    [r.ACK_ID]: faker.random.number({ min: 100, max: 110 }),
    [r.ACK_DATE]: ackDate,
    ...user,
  };
}


function generateAcknowledgment() {
  const targetGroups = Array
    .from(
    { length: faker.random.number({ min: 1, max: 3 }) },
    () => faker.random.number({ min: 1, max: 3 })
    )
    .filter((x, i, arr) => i === arr.indexOf(x));

  return {
    [a.ID]: faker.random.number({ min: 100, max: 110 }),
    [a.TITLE]: faker.lorem.words(),
    [a.DATE_START]: faker.date.past(),
    [a.DATE_END]: faker.date.future(),
    [a.CREATOR_GROUP]: faker.random.number({ min: 1000, max: 1003 }),
    [a.TARGET_GROUPS]: targetGroups,
    [a.STATEMENT]: faker.lorem.sentences(),
    [a.DETAILS]: faker.lorem.paragraphs(),
    [a.FILE_NAME]: faker.system.fileName(),
    [a.FILE_CONTENT]: faker.image.abstract(),
    [a.STATUS]: faker.random.number({ min: 0, max: 3 }),
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
  for (let i = 0; i < 300; i += 1) {
    const user = users[i % 20];
    const recipient = generateRecipient(user);
    // if the user dosnt already have an acknowledgment with that id
    if (!recipients.find((x) => (
      x[r.ACK_ID] === recipient[r.ACK_ID] &&
      x[r.SID] === recipient[r.SID]
    ))) {
      recipient[r.ID] = i;
      // add to the pile...
      recipients.push(recipient);
    }
  }
  return recipients;
}

function generateAcknowledgments() {
  const acks = [];
  for (let i = 0; i < 50; i += 1) {
    const ack = generateAcknowledgment();
    if (!acks.find((x) => (
      x[a.ID] === ack[a.ID]
    ))) {
      acks.push(ack);
    }
  }
  return acks;
}

const users = generateUsers();
const recipients = generateRecipients(users);
const acknowledgments = generateAcknowledgments();

module.exports = {
  jwts,
  name: 'spa',
  keys: {
    recipients,
    acknowledgments,
  },
  routes: [
    { '/spa': '/spa-acknowledgments' },
    { '/spa/recipients\\?:target=:id': '/spa-recipients?:target=:id' },
    { '/spa/recipients/:id': '/spa-recipients?SID=:id' },
    { '/spa/acknowledgements/:id/recipients': '/spa-recipients?ackId=:id' },
  ],
};
