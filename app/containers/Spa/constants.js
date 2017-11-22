// DATA REQUESTS
export const INIT_DATA_REQUEST = 'app/Spa/INIT_DATA_REQUEST';
export const INIT_DATA_SUCCESS = 'app/Spa/INIT_DATA_SUCCESS';
export const INIT_DATA_FAILURE = 'app/Spa/INIT_DATA_FAILURE';
// ASSIGNMENTS
export const START_ASSIGNMENT = 'app/Spa/START_ASSIGNMENT';
export const FINISH_ASSIGNMENT = 'app/Spa/FINISH_ASSIGNMENT';
// ROLES
export const SPA_ROLE_ADMIN = 'BARS Security';
export const SPA_ROLE_GUARD = 'BARS Guard';
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
};
// all fields
export const FIELDS = {
  ACK,
};
