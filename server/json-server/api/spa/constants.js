module.exports = {
  ROLES: [
    'SPA Admin',
    'SPA Guard',
  ],
  ACK: {
    ID: 'id',
    TITLE: 'title',
    STATUS: 'acknowledgmentStatusID',
    START_DATE: 'startDate',
    END_DATE: 'endDate',
    // CREATED_DATE: 'createdDate',
    // CREATED_BY: 'createdBy',
    CREATOR_GROUP: 'creatorGroupID',
    TARGET_GROUPS: 'targetADGroup',
    DETAILS: 'details',
    STATEMENT: 'statement',
    FILE_NAME: 'fileName',
    FILE_CONTENT: 'fileContent',
    // UPDATED_BY: 'updatedBy',
    // UPDATED_DATE: 'updatedDate',
  },
  RECIPIENT: {
    ID: 'id',
    SID: 'sid',
    SAM: 'samAccount',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
    FIRST_REMINDER_DATE: 'firstReminderDate',
    SECOND_REMINDER_DATE: 'secondReminderDate',
    FINAL_REMINDER_DATE: 'finalReminderDate',
    ACK_ID: 'acknowledgmentID',
    ACK_DATE: 'acknowledgmentDate',
  },
  GROUP: {
    NAME: 'name',
    SID: 'sid',
  },
  MIN_TARGET: 0,
  MAX_TARGET: 3,
  MIN_CREATOR: 1000,
  MAX_CREATOR: 1003,
  MIN_ACK: 100,
  MAX_ACK: 130,
};
