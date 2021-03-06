module.exports = {
  ROLES: [
    'SPA Creator',
    'SPA Creator - BPAS',
    'SPA Creator - Security',
    'SPA Creator - Test',
  ],
  ACK: {
    ID: 'id',
    TITLE: 'title',
    STATUS: 'acknowledgementStatusID',
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
    MANAGER_SID: 'managerSid',
    MANAGER_NAME: 'managerName',
    FIRST_REMINDER_DATE: 'firstReminderDate',
    SECOND_REMINDER_DATE: 'secondReminderDate',
    FINAL_REMINDER_DATE: 'finalReminderDate',
    ACK_ID: 'acknowledgementID',
    ACK_DATE: 'acknowledgementDate',
  },
  ACK_STATUS: {
    ID: 'id',
    STATUS: 'status',
    DESC: 'description',
  },
  STATUS: {
    DRAFT: 1,
    PENDING: 2,
    ACTIVE: 3,
    CANCELED: 4,
    DEACTIVATED: 5,
    EXPIRED: 6,
  },
  MIN_STATUS: 1, // maps to STATUS above
  MAX_STATUS: 6, // maps to STATUS above
  GROUP: {
    NAME: 'name',
    SID: 'sid',
  },
  MIN_TARGET: 1,
  MAX_TARGET: 3,
  MIN_CREATOR: 1000,
  MAX_CREATOR: 1003,
  MIN_ACK: 100,
  MAX_ACK: 130,
};
