import { types, mapToColumns } from 'utils/data';

import { AUTH, APPS, APP_LIST, REPORT, BUTTONS } from './constants';


export const authorization = {
  [AUTH.ID]: {
    label: 'ID',
    name: AUTH.ID,
    ariaLabel: 'ID of the authorization',
  },
  [AUTH.SID]: {
    label: 'SID',
    name: AUTH.SID,
    ariaLabel: 'SID of the Employee',
  },
  [AUTH.FULL_NAME]: {
    label: 'Full Name',
    name: AUTH.FULL_NAME,
    ariaLabel: 'Full Name of the Employee',
    minWidth: 100,
    maxWidth: 150,
    isSortedDescending: true,
  },
  [AUTH.EMAIL]: {
    label: 'Email',
    name: AUTH.EMAIL,
    ariaLabel: 'Date the acknowledgment takes effect',
  },
  [AUTH.POS_NUMBER]: {
    label: 'Position Number',
    name: AUTH.POS_NUMBER,
    ariaLabel: 'Position Number of the Employee',
  },
  [AUTH.MANAGER_SID]: {
    label: 'Manager SID',
    name: AUTH.MANAGER_SID,
    ariaLabel: 'AD SID of the Employee\'s Manager',
  },
  [AUTH.MANAGER_NAME]: {
    label: 'Manager Name',
    name: AUTH.MANAGER_NAME,
    ariaLabel: 'Full Name of the Employee\'s Manager',
  },
  [AUTH.STATUS]: {
    label: 'Status',
    name: AUTH.STATUS,
    ariaLabel: 'Status of the Authorization',
  },
  [AUTH.LAST_MODIFIED]: {
    label: 'Last Modified',
    name: AUTH.LAST_MODIFIED,
    ariaLabel: 'Date the Authorization was last modified',
    data: {
      type: types.date,
    },
  },
  [AUTH.LAST_APPROVED]: {
    label: 'Date Authorized',
    name: AUTH.LAST_APPROVED,
    ariaLabel: 'Date of last Authorization denial or approval',
    data: {
      type: types.date,
    },
  },
  [AUTH.DATE_CREATED]: {
    label: 'Date Created',
    name: AUTH.DATE_CREATED,
    ariaLabel: 'Date the Authorization was created',
    data: {
      type: types.date,
    },
  },
  [APPS.APP_1]: {
    label: 'App 1 Name',
    name: APPS.APP_1,
    ariaLabel: 'App 1 AriaLabel',
    minWidth: 80,
    maxWidth: 100,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_2]: {
    label: 'App 2 Name',
    name: APPS.APP_2,
    ariaLabel: 'App 2 AriaLabel',
    minWidth: 80,
    maxWidth: 100,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_3]: {
    label: 'App 3 Name',
    name: APPS.APP_3,
    ariaLabel: 'App 3 AriaLabel',
    minWidth: 80,
    maxWidth: 100,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_4]: {
    label: 'App 4 Name',
    name: APPS.APP_4,
    ariaLabel: 'App 4 AriaLabel',
    minWidth: 80,
    maxWidth: 100,
    data: {
      render: 'authorizationToggle',
    },
  },
};


const buttons = {
  [BUTTONS.APPROVE]: {
    name: BUTTONS.APPROVE,
    ariaLabel: 'Authorize all applications for a given user',
    minWidth: 60,
    maxWidth: 60,
    notSortable: true,
    data: {
      render: 'approvalButton',
    },
  },
  [BUTTONS.DENY]: {
    name: BUTTONS.DENY,
    ariaLabel: 'Deny all applications for a given user',
    minWidth: 60,
    maxWidth: 60,
    notSortable: true,
    data: {
      render: 'denyButton',
    },
  },
};

export const currentFieldsApi = [
  AUTH.ID,
  AUTH.SID,
  ...APP_LIST,
];

const currentFields = [
  AUTH.FULL_NAME,
  ...APP_LIST,
  BUTTONS.APPROVE,
  BUTTONS.DENY,
];

const previousFields = [
  AUTH.FULL_NAME,
  ...APP_LIST,
  AUTH.LAST_APPROVED,
];

export const currentColumns = mapToColumns({ ...authorization, ...buttons }, currentFields);
export const previousColumns = mapToColumns(authorization, previousFields);


const reportFields = [
  AUTH.FULL_NAME,
  ...APP_LIST,
  AUTH.MANAGER_NAME,
  AUTH.LAST_APPROVED,
];

export const reportColumns = {
  [REPORT.APPROVED]: mapToColumns(authorization, reportFields),
  [REPORT.DENIED]: mapToColumns(authorization, reportFields),
  [REPORT.PENDING]: mapToColumns(authorization, reportFields),
  [REPORT.NO_MANAGER]: mapToColumns(authorization, reportFields),
};
