// GET DATA FOR A USER
export const GET_USER_DATA_REQUEST = 'app/Spa/GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'app/Spa/GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'app/Spa/GET_USER_DATA_FAILURE';
// GET DATA FOR AN ADMIN
export const GET_ADMIN_DATA_REQUEST = 'app/Spa/GET_ADMIN_DATA_REQUEST';
export const GET_ADMIN_DATA_SUCCESS = 'app/Spa/GET_ADMIN_DATA_SUCCESS';
export const GET_ADMIN_DATA_FAILURE = 'app/Spa/GET_ADMIN_DATA_FAILURE';
// GET AD GROUPS
export const GET_GROUPS_REQUEST = 'app/Spa/GET_GROUPS_REQUEST';
export const GET_GROUPS_SUCCESS = 'app/Spa/GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAILURE = 'app/Spa/GET_GROUPS_FAILURE';
// GET LIST OF RECIPIENTS FOR EXISTSING ACK
export const GET_ACK_RECIPIENTS_REQUEST = 'app/Spa/GET_ACK_RECIPIENTS_REQUEST';
export const GET_ACK_RECIPIENTS_SUCCESS = 'app/Spa/GET_ACK_RECIPIENTS_SUCCESS';
export const GET_ACK_RECIPIENTS_FAILURE = 'app/Spa/GET_ACK_RECIPIENTS_FAILURE';
// NEW ACKNOWLEDGMENT
export const NEW_ACK_REQUEST = 'app/Spa/NEW_ACK_REQUEST';
export const NEW_ACK_SUCCESS = 'app/Spa/NEW_ACK_SUCCESS';
export const NEW_ACK_FAILURE = 'app/Spa/NEW_ACK_FAILURE';
// DISABLE EXISITNG ACKNOWLEDGMENT
export const DISABLE_ACK_REQUEST = 'app/Spa/DISABLE_ACK_REQUEST';
export const DISABLE_ACK_SUCCESS = 'app/Spa/DISABLE_ACK_SUCCESS';
export const DISABLE_ACK_FAILURE = 'app/Spa/DISABLE_ACK_FAILURE';
// READ EXISITNG ACKNOWLEDGMENT
export const READ_ACK_REQUEST = 'app/Spa/READ_ACK_REQUEST';
export const READ_ACK_SUCCESS = 'app/Spa/READ_ACK_SUCCESS';
export const READ_ACK_FAILURE = 'app/Spa/READ_ACK_FAILURE';
// ROLES
export const ROLES = {
  ADMIN: 'SPA Admin',
  GUARD: 'SPA Guard',
};
// STATUS
// TODO: PULL IN FROM API
export const STATUS = {
  ACTIVE: 0,
  EXPIRED: 1,
  DISABLED: 2,
};
// CODES FOR STATUS
// TODO: PULL IN FROM API
export const STATUS_CODES = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.EXPIRED]: 'Expired',
  [STATUS.DISABLED]: 'Disabled',
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
  FIRST_REMINDER_DATE: 'firstReminderDate',
  SECOND_REMINDER_DATE: 'secondReminderDate',
  FINAL_REMINDER_DATE: 'finalReminderDate',
  ACK_ID: 'acknowledgmentID',
  ACK_DATE: 'acknowledgmentDate',
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
