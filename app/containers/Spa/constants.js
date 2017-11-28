// DATA REQUESTS
export const INIT_DATA_REQUEST = 'app/Spa/INIT_DATA_REQUEST';
export const INIT_DATA_SUCCESS = 'app/Spa/INIT_DATA_SUCCESS';
export const INIT_DATA_FAILURE = 'app/Spa/INIT_DATA_FAILURE';
// NEW ACKNOWLEDGMENT
export const NEW_ACK_REQUEST = 'app/Spa/NEW_ACK_REQUEST';
export const NEW_ACK_SUCCESS = 'app/Spa/NEW_ACK_SUCCESS';
export const NEW_ACK_FAILURE = 'app/Spa/NEW_ACK_FAILURE';
// NEW ACKNOWLEDGMENT
export const DISABLE_ACK_REQUEST = 'app/Spa/DISABLE_ACK_REQUEST';
export const DISABLE_ACK_SUCCESS = 'app/Spa/DISABLE_ACK_SUCCESS';
export const DISABLE_ACK_FAILURE = 'app/Spa/DISABLE_ACK_FAILURE';
// ASSIGNMENTS
export const START_ASSIGNMENT = 'app/Spa/START_ASSIGNMENT';
export const FINISH_ASSIGNMENT = 'app/Spa/FINISH_ASSIGNMENT';
// ROLES
export const SPA_ROLE_ADMIN = 'BARS Security';
export const SPA_ROLE_GUARD = 'BARS Guard';
// STATUS
export const STATUS = {
  ACTIVE: 0,
  EXPIRED: 1,
  DISABLED: 2,
};
// DATA FIELDS
// fields for acknowledgment
export const ACK = {
  ID: 'id',
  TITLE: 'title',
  DATE_START: 'activeStartDate',
  DATE_END: 'activeEndDate',
  GROUP_CREATOR: 'creatorGroup',
  GROUP_TARGET: 'targetADGroup',
  STATEMENT: 'ackStatement',
  DETAILS: 'detailsText',
  FILE_NAME: 'fileName',
  FILE_CONTENT: 'fileContent',
  STATUS: 'status',
};
// all fields
export const FIELDS = {
  ACK,
};
