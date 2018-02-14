export const GET_MANAGER_DATA_REQUEST = 'app/Paas/GET_MANAGER_DATA_REQUEST';
export const GET_MANAGER_DATA_SUCCESS = 'app/Paas/GET_MANAGER_DATA_SUCCESS';
export const GET_MANAGER_DATA_FAILURE = 'app/Paas/GET_MANAGER_DATA_FAILURE';

export const UPDATE_USERS_REQUEST = 'app/Paas/UPDATE_USERS_REQUEST';
export const UPDATE_USERS_SUCCESS = 'app/Paas/UPDATE_USERS_SUCCESS';
export const UPDATE_USERS_FAILURE = 'app/Paas/UPDATE_USERS_FAILURE';

export const GET_REPORT_DATA_REQUEST = 'app/Paas/GET_REPORT_DATA_REQUEST';
export const GET_REPORT_DATA_SUCCESS = 'app/Paas/GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAILURE = 'app/Paas/GET_REPORT_DATA_FAILURE';

export const SET_REPORT_KEY = 'app/Paas/SET_REPORT_KEY';
export const SET_REPORT_FILTER = 'app/Paas/SET_REPORT_FILTER';

// ROLES
export const ROLES = {
  MANAGER: 'PAAS Manager',
  SECURITY: 'PAAS Security',
  HR: 'PAAS HR',
};
export const ROLES_VALUES = Object.values(ROLES);
// APPROVAL CODES
export const APPROVAL = {
  NONE: undefined,
  DENY: 0,
  APPROVE: 1,
};
// ACCESS AUTHORIZATION
export const AUTH = {
  ID: '_id',
  SID: 'sid',
  FULL_NAME: 'fullName',
  EMAIL: 'email',
  POS_NUMBER: 'posNumber',
  MANAGER_SID: 'managerSid',
  MANAGER_NAME: 'managerFullName',
  STATUS: 'status',
  LAST_MODIFIED: 'lastUpdated',
  LAST_APPROVED: 'lastApproved',
  DATE_CREATED: 'created',
  AUTH_YEAR: 'authYear',
};
// AUTH STATUS
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  NO_MANAGER: 'noManager',
};
// APP TO AUTHORIZE
export const APPS = {
  APP_1: 'app1',
  APP_2: 'app2',
  APP_3: 'app3',
  APP_4: 'app4',
};
export const APP_LIST = Object.values(APPS);
export const BUTTONS = {
  APPROVE: 'approveButton',
  DENY: 'denyButton',
};
export const REPORT = {
  APPROVED: 0,
  DENIED: 1,
  PENDING: 2,
  NO_MANAGER: 3,
};
