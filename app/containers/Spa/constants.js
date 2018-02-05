// GET DATA FOR A USER
export const GET_USER_DATA_REQUEST = 'app/SPA/GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'app/SPA/GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'app/SPA/GET_USER_DATA_FAILURE';
// READ EXISITNG ACKNOWLEDGMENT
export const READ_ACK_REQUEST = 'app/SPA/READ_ACK_REQUEST';
export const READ_ACK_SUCCESS = 'app/SPA/READ_ACK_SUCCESS';
export const READ_ACK_FAILURE = 'app/SPA/READ_ACK_FAILURE';
// GET DATA FOR AN ADMIN
export const GET_ADMIN_DATA_REQUEST = 'app/SPA/GET_ADMIN_DATA_REQUEST';
export const GET_ADMIN_DATA_SUCCESS = 'app/SPA/GET_ADMIN_DATA_SUCCESS';
export const GET_ADMIN_DATA_FAILURE = 'app/SPA/GET_ADMIN_DATA_FAILURE';
// GET AD GROUPS
export const GET_GROUPS_REQUEST = 'app/SPA/GET_GROUPS_REQUEST';
export const GET_GROUPS_SUCCESS = 'app/SPA/GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAILURE = 'app/SPA/GET_GROUPS_FAILURE';
// NEW ACKNOWLEDGMENT
export const NEW_ACK_REQUEST = 'app/SPA/NEW_ACK_REQUEST';
export const NEW_ACK_SUCCESS = 'app/SPA/NEW_ACK_SUCCESS';
export const NEW_ACK_FAILURE = 'app/SPA/NEW_ACK_FAILURE';
// DISABLE EXISITNG ACKNOWLEDGMENT
export const DISABLE_ACK_REQUEST = 'app/SPA/DISABLE_ACK_REQUEST';
export const DISABLE_ACK_SUCCESS = 'app/SPA/DISABLE_ACK_SUCCESS';
export const DISABLE_ACK_FAILURE = 'app/SPA/DISABLE_ACK_FAILURE';
// GET DATA FOR REPORT
export const GET_REPORT_DATA_REQUEST = 'app/SPA/GET_REPORT_DATA_REQUEST';
export const GET_REPORT_DATA_SUCCESS = 'app/SPA/GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAILURE = 'app/SPA/GET_REPORT_DATA_FAILURE';
// ROLES
export const ROLES = {
  ADMIN: 'SPA Admin',
};
// STATUS
// TODO: PULL IN FROM API
export const STATUS = {
  PENDING: 0,
  ACTIVE: 1,
  EXPIRED: 2,
  DISABLED: 3,
  CANCELED: 4,
};
// CODES FOR STATUS
export const STATUS_CODES = {
  [STATUS.PENDING]: 'Pending',
  [STATUS.ACTIVE]: 'Active',
  [STATUS.EXPIRED]: 'Expired',
  [STATUS.DISABLED]: 'Disabled',
  [STATUS.CANCELED]: 'Canceled',
};
// DATA FIELDS
// fields for acknowledgment
export const ACK = {
  ID: 'id',
  TITLE: 'title',
  STATUS: 'acknowledgmentStatusID',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  // CREATED_BY: 'createdBy',
  // CREATED_DATE: 'createdDate',
  CREATOR_GROUP: 'creatorGroupID',
  TARGET_GROUPS: 'targetADGroup',
  DETAILS: 'details',
  STATEMENT: 'statement',
  FILE_NAME: 'fileName',
  FILE_CONTENT: 'fileContent',
  // UPDATED_BY: 'updatedBy',
  // UPDATED_DATE: 'updatedDate',
};
// fields for recipient
export const RECIPIENT = {
  ID: 'id',
  SID: 'sid',
  SAM: 'samAccount',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  MANAGER_SID: 'managerSid',
  MANAGER_NAME: 'managerName',
  ACK_ID: 'acknowledgmentID',
  ACK_DATE: 'acknowledgmentDate',
  FIRST_REMINDER_DATE: 'firstReminderDate',
  SECOND_REMINDER_DATE: 'secondReminderDate',
  FINAL_REMINDER_DATE: 'finalReminderDate',
};

export const GROUP = {
  NAME: 'name',
  SID: 'sid',
};

export const REPORT = {
  PENDING: 0,
  PREVIOUS: 1,
};

export const EMAIL = {
  ALL: 'all',
  PENDING: 'pending',
  PREVIOUS: 'previous',
};

// all fields
export const FIELDS = {
  ACK,
  RECIPIENT,
};
