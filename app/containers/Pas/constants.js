export const GET_MANAGER_DATA_REQUEST = 'app/Pas/GET_MANAGER_DATA_REQUEST';
export const GET_MANAGER_DATA_SUCCESS = 'app/Pas/GET_MANAGER_DATA_SUCCESS';
export const GET_MANAGER_DATA_FAILURE = 'app/Pas/GET_MANAGER_DATA_FAILURE';

export const UPDATE_USERS_REQUEST = 'app/Pas/UPDATE_USERS_REQUEST';
export const UPDATE_USERS_SUCCESS = 'app/Pas/UPDATE_USERS_SUCCESS';
export const UPDATE_USERS_FAILURE = 'app/Pas/UPDATE_USERS_FAILURE';

export const GET_REPORT_DATA_REQUEST = 'app/Pas/GET_REPORT_DATA_REQUEST';
export const GET_REPORT_DATA_SUCCESS = 'app/Pas/GET_REPORT_DATA_SUCCESS';
export const GET_REPORT_DATA_FAILURE = 'app/Pas/GET_REPORT_DATA_FAILURE';

export const SET_REPORT_KEY = 'app/Pas/SET_REPORT_KEY';
export const SET_REPORT_FILTER = 'app/Pas/SET_REPORT_FILTER';

export const UPDATE_USER_MANAGER_REQUEST = 'app/Pas/UPDATE_USER_MANAGER_REQUEST';
export const UPDATE_USER_MANAGER_SUCCESS = 'app/Pas/UPDATE_USER_MANAGER_SUCCESS';
export const UPDATE_USER_MANAGER_FAILURE = 'app/Pas/UPDATE_USER_MANAGER_FAILURE';


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
  MANAGER_SID: 'managerSID',
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
  ASSIGNED_MANAGER: 'assignedManager',
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

export const MANAGE = {
  EMPLOYEE_ID: 'employee_id',
  MANAGER_ID: 'manager_id',
};
