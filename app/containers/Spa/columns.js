import { COL_TYPES } from 'containers/AppHub/constants';
import { ACK, RECIPIENT, REPORT } from 'containers/Spa/constants';

import spaFields from './fields';


/**
 * Maps a object to the format Office-UI-Fabric-React DetailsList`s expect
 *
 * @param {object} obj    - object to map
 * @param {array} include - keys to include, if empty includes all
 * @param {array} exclude - keys to exclude
 *
 * @return {object}       - mapped object to use in List
 */
export function mapToColumns(obj, include = [], exclude = []) {
  const keys = include.length ?
    Object.keys(obj).filter((key) => include.includes(key)) :
    Object.keys(obj);

  return keys
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      key: obj[key].name,
      name: obj[key].label,
      fieldName: obj[key].name,
      isResizable: true,
      ariaLabel: obj[key].ariaLabel,
      minWidth: obj[key].minWidth || 100,
      maxWidth: obj[key].maxWidth || 200,
      data: obj[key].data || {},
    }));
}

// columns for report page
export const recipients = {
  [RECIPIENT.FIRST_NAME]: {
    label: 'First Name',
    name: RECIPIENT.FIRST_NAME,
    ariaLabel: 'First name of the recipient',
    maxWidth: 100,
  },
  [RECIPIENT.LAST_NAME]: {
    label: 'Last Name',
    name: RECIPIENT.LAST_NAME,
    ariaLabel: 'Last name of the recipient',
    maxWidth: 100,
  },
  [RECIPIENT.SAM]: {
    label: 'Sam Account',
    name: RECIPIENT.SAM,
    ariaLabel: 'Sam account of the recipient',
    maxWidth: 100,
  },
  [RECIPIENT.EMAIL]: {
    label: 'Email',
    name: RECIPIENT.EMAIL,
    ariaLabel: 'Email of the recipient',
    minWidth: 100,
  },
  [RECIPIENT.MANAGER_NAME]: {
    label: 'Manager',
    name: RECIPIENT.MANAGER_NAME,
    ariaLabel: 'Full name of the recipients manager',
    minWidth: 100,
  },
  [RECIPIENT.ACK_DATE]: {
    label: 'Acknowledgment Date',
    name: RECIPIENT.ACK_DATE,
    ariaLabel: 'Date the recipient acknowledged the policy',
    minWidth: 150,
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [RECIPIENT.FIRST_REMINDER_DATE]: {
    label: 'First Reminder Date',
    name: RECIPIENT.FIRST_REMINDER_DATE,
    ariaLabel: 'Date of recipients first acknowledgment reminder',
    minWidth: 100,
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [RECIPIENT.SECOND_REMINDER_DATE]: {
    label: 'Second Reminder Date',
    name: RECIPIENT.SECOND_REMINDER_DATE,
    ariaLabel: 'Date of recipients second acknowledgment reminder',
    minWidth: 100,
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [RECIPIENT.FINAL_REMINDER_DATE]: {
    label: 'Final Reminder Date',
    name: RECIPIENT.FINAL_REMINDER_DATE,
    ariaLabel: 'Date of recipients final acknowledgment reminder',
    minWidth: 100,
    data: {
      type: COL_TYPES.DATE,
    },
  },
};

const reportFields = [
  RECIPIENT.FIRST_NAME,
  RECIPIENT.LAST_NAME,
  RECIPIENT.EMAIL,
  RECIPIENT.MANAGER_NAME,
  RECIPIENT.ACK_DATE,
];
export const reportColumns = {
  [REPORT.PENDING]: mapToColumns(recipients, reportFields, [RECIPIENT.ACK_DATE]),
  [REPORT.PREVIOUS]: mapToColumns(recipients, reportFields),
};

// Columns for admin lists
const adminExcludes = [ACK.STATEMENT, ACK.DETAILS, ACK.FILE_CONTENT];
export const adminColumns = mapToColumns(spaFields, [], adminExcludes);
// columns for user lists
const userPendingIncludes = [ACK.ID, ACK.TITLE, ACK.START_DATE, ACK.END_DATE, ACK.FILE_NAME];
export const userPendingColumns = mapToColumns(spaFields, userPendingIncludes);

const userPrevious = {
  ...spaFields,
  ...recipients,
};

const userPreviousIncludes = [...userPendingIncludes, RECIPIENT.ACK_DATE, ACK.FILE_NAME];
export const userPreviousColumns = mapToColumns(userPrevious, userPreviousIncludes);
