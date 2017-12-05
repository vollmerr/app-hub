const faker = require('faker');
const jwt = require('jsonwebtoken');

const secret = require('../../../internals/.secret');

const roles = [
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

function generateJwt(sid, firstName, lastName, userRoles) {
  return jwt.sign({
    name: `${firstName} ${lastName}`,
    sub: sid,
    roles: userRoles,
    exp: Math.floor(Date.now() / 1000) + 100000,
  }, secret);
}

const jwts = [];

function generateRecipient() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const sid = faker.random.uuid();

  let firstReminder = '';
  let secondReminder = '';
  let finalReminder = '';
  let ackDate = '';

  const userRoles = ['AppHub User'];
  roles.forEach((role) => {
    if (faker.random.boolean()) {
      userRoles.push(role);
    }
  });

  jwts.push({
    key: generateJwt(sid, firstName, lastName, userRoles),
    text: `${firstName} ${lastName} - ${userRoles.join(', ')}`,
  });

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
    [r.ID]: faker.random.uuid(),
    [r.SID]: sid,
    [r.SAM]: faker.internet.userName(firstName, lastName),
    [r.FIRST_NAME]: firstName,
    [r.LAST_NAME]: lastName,
    [r.EMAIL]: faker.internet.email(firstName, lastName, 'state.ca.gov'),
    [r.FIRST_REMINDER_DATE]: firstReminder,
    [r.SECOND_REMINDER_DATE]: secondReminder,
    [r.FINAL_REMINDER_DATE]: finalReminder,
    [r.ACK_ID]: faker.random.number({ min: 100, max: 110 }),
    [r.ACK_DATE]: ackDate,
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

function generateRecipients() {
  const acks = [];
  for (let i = 0; i < 100; i += 1) {
    acks.push(generateRecipient());
  }
  return acks;
}

function generateAcknowledgments() {
  const acks = [];
  for (let i = 0; i < 100; i += 1) {
    acks.push(generateAcknowledgment());
  }
  return acks;
}

const recipients = generateRecipients();
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
  ],
};
