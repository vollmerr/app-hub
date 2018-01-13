import { types, mapToColumns } from 'utils/data';

import { AUTH, APPS, BUTTONS } from './constants';


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
    maxWidth: 250,
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
    label: 'Last Approved',
    name: AUTH.LAST_APPROVED,
    ariaLabel: 'Date the Authorization was last approved',
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
    maxWidth: 150,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_2]: {
    label: 'App 2 Name',
    name: APPS.APP_2,
    ariaLabel: 'App 2 AriaLabel',
    minWidth: 80,
    maxWidth: 150,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_3]: {
    label: 'App 3 Name',
    name: APPS.APP_3,
    ariaLabel: 'App 3 AriaLabel',
    minWidth: 80,
    maxWidth: 150,
    data: {
      render: 'authorizationToggle',
    },
  },
  [APPS.APP_4]: {
    label: 'App 4 Name',
    name: APPS.APP_4,
    ariaLabel: 'App 4 AriaLabel',
    minWidth: 80,
    maxWidth: 150,
    data: {
      render: 'authorizationToggle',
    },
  },
  [BUTTONS.APPROVE]: {
    label: 'Authorize All',
    name: BUTTONS.APPROVE,
    ariaLabel: 'Authorizes all applications for a given user',
    minWidth: 80,
    maxWidth: 80,
    notSortable: true,
    data: {
      render: 'approvalButton',
    },
  },
  [BUTTONS.DENY]: {
    label: 'Deny All',
    name: BUTTONS.DENY,
    ariaLabel: 'Denies all applications for a given user',
    minWidth: 80,
    maxWidth: 80,
    notSortable: true,
    data: {
      render: 'denyButton',
    },
  },
};


export const homeFieldsApi = [
  AUTH.SID,
  APPS.APP_1,
  APPS.APP_2,
  APPS.APP_3,
  APPS.APP_4,
];

const homeFields = [
  AUTH.FULL_NAME,
  APPS.APP_1,
  APPS.APP_2,
  APPS.APP_3,
  APPS.APP_4,
  BUTTONS.APPROVE,
  BUTTONS.DENY,
];

export const homeColumns = mapToColumns(authorization, homeFields);
