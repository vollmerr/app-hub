// GET ACK STATUS CODES
export const GET_ACK_STATUS_REQUEST = 'app/Spa/GET_ACK_STATUS_REQUEST';
export const GET_ACK_STATUS_SUCCESS = 'app/Spa/GET_ACK_STATUS_SUCCESS';
export const GET_ACK_STATUS_FAILURE = 'app/Spa/GET_ACK_STATUS_FAILURE';
// GET DATA FOR A USER
export const GET_USER_DATA_REQUEST = 'app/Spa/GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'app/Spa/GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'app/Spa/GET_USER_DATA_FAILURE';
// READ EXISITNG ACKNOWLEDGMENT
export const READ_ACK_REQUEST = 'app/Spa/READ_ACK_REQUEST';
export const READ_ACK_SUCCESS = 'app/Spa/READ_ACK_SUCCESS';
export const READ_ACK_FAILURE = 'app/Spa/READ_ACK_FAILURE';
// GET DATA FOR AN ADMIN
export const GET_ADMIN_DATA_REQUEST = 'app/Spa/GET_ADMIN_DATA_REQUEST';
export const GET_ADMIN_DATA_SUCCESS = 'app/Spa/GET_ADMIN_DATA_SUCCESS';
export const GET_ADMIN_DATA_FAILURE = 'app/Spa/GET_ADMIN_DATA_FAILURE';
// GET AD GROUPS
export const GET_GROUPS_REQUEST = 'app/Spa/GET_GROUPS_REQUEST';
export const GET_GROUPS_SUCCESS = 'app/Spa/GET_GROUPS_SUCCESS';
export const GET_GROUPS_FAILURE = 'app/Spa/GET_GROUPS_FAILURE';
// NEW ACKNOWLEDGMENT
export const NEW_ACK_REQUEST = 'app/Spa/NEW_ACK_REQUEST';
export const NEW_ACK_SUCCESS = 'app/Spa/NEW_ACK_SUCCESS';
export const NEW_ACK_FAILURE = 'app/Spa/NEW_ACK_FAILURE';
// SAVE ACKNOWLEDGMENT
export const SAVE_ACK_REQUEST = 'app/Spa/SAVE_ACK_REQUEST';
export const SAVE_ACK_SUCCESS = 'app/Spa/SAVE_ACK_SUCCESS';
export const SAVE_ACK_FAILURE = 'app/Spa/SAVE_ACK_FAILURE';
// DISABLE EXISITNG ACKNOWLEDGMENT
export const DISABLE_ACK_REQUEST = 'app/Spa/DISABLE_ACK_REQUEST';
export const DISABLE_ACK_SUCCESS = 'app/Spa/DISABLE_ACK_SUCCESS';
export const DISABLE_ACK_FAILURE = 'app/Spa/DISABLE_ACK_FAILURE';
// GET DATA FOR REPORT
export const GET_REPORT_DATA_REQUEST = 'app/Spa/GET_REPORT_DATA_REQUEST';
export const GET_REPORT_DATA_SUCCESS = 'app/Spa/GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAILURE = 'app/Spa/GET_REPORT_DATA_FAILURE';

export const SET_REPORT_KEY = 'app/Spa/SET_REPORT_KEY';

// ROLES
export const ROLES = {
  ADMIN: 'SPA Creator',
};
export const TEST_ROLES = {
  BPAS: 'SPA Creator - BPAS',
  SECURITY: 'SPA Creator - Security',
  TEST: 'SPA Creator - Test',
};
export const ROLES_VALUES = Object.values(ROLES);
export const TEST_ROLES_VALUES = Object.values(TEST_ROLES);
// STATUS VALUES
export const STATUS = {
  DRAFT: 1,
  PENDING: 2,
  ACTIVE: 3,
  CANCELED: 4,
  DISABLED: 5,
  EXPIRED: 6,
};
// DATA FIELDS
// fields for acknowledgment
export const ACK = {
  ID: 'id',
  TITLE: 'title',
  STATUS: 'acknowledgementStatusID',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  // CREATED_BY: 'createdBy',
  // CREATED_DATE: 'createdDate',
  CREATOR_GROUP: 'creatorGroup',
  TARGET_GROUPS: 'targetGroupSids',
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
  ACK_ID: 'acknowledgementID',
  ACK_DATE: 'acknowledgementDate',
  FIRST_REMINDER_DATE: 'firstReminderDate',
  SECOND_REMINDER_DATE: 'secondReminderDate',
  FINAL_REMINDER_DATE: 'finalReminderDate',
};

export const ACK_STATUS = {
  ID: 'id',
  STATUS: 'status',
  DESC: 'description',
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
