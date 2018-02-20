import { types, mapToColumns } from '../../utils/data';
import { isFutureDate } from '../../utils/validate'; // TODO: joi

import {
  FieldText,
  FieldDate,
  FieldChecks,
  FieldFile,
  FieldRadios,
} from '../../components/Form';

import * as C from './constants';


export const acknowledgment = {
  [C.ACK.ID]: {
    label: 'ID',
    name: C.ACK.ID,
    ariaLabel: 'ID of the acknowledgment',
    minWidth: 20,
    maxWidth: 40,
  },
  [C.ACK.TITLE]: {
    label: 'Title',
    required: true,
    name: C.ACK.TITLE,
    placeholder: 'Enter acknowledgment title',
    ariaLabel: 'Title of the acknowledgment',
    component: FieldText,
  },
  [C.ACK.STATUS]: {
    label: 'Status',
    name: C.ACK.STATUS,
    ariaLabel: 'Status of the acknowledgment',
    maxWidth: 100,
  },
  [C.ACK.START_DATE]: {
    label: 'Start Date',
    required: true,
    name: C.ACK.START_DATE,
    placeholder: 'Select the start date',
    ariaLabel: 'Date the acknowledgment takes effect',
    component: FieldDate,
    validate: [isFutureDate],
    maxWidth: 100,
    data: {
      type: types.date,
    },
  },
  [C.ACK.END_DATE]: {
    label: 'End Date',
    required: true,
    name: C.ACK.END_DATE,
    placeholder: 'Select the end date',
    ariaLabel: 'Date the acknowledgment expires',
    component: FieldDate,
    validate: [isFutureDate],
    maxWidth: 100,
    data: {
      type: types.date,
    },
  },
  [C.ACK.CREATOR_GROUP]: {
    label: 'Creator Group',
    required: true,
    name: C.ACK.CREATOR_GROUP,
    ariaLabel: 'AD group that created the acknowledgment',
    component: FieldRadios,
    options: [],
  },
  [C.ACK.TARGET_GROUPS]: {
    label: 'Target Group(s)',
    required: true,
    name: C.ACK.TARGET_GROUPS,
    ariaLabel: 'AD groups that must acknowledge the policy',
    component: FieldChecks,
    options: [],
  },
  [C.ACK.DETAILS]: {
    label: 'Description',
    required: true,
    multiline: true,
    name: C.ACK.DETAILS,
    placeholder: 'Enter acknowledgment description',
    ariaLabel: 'Description of the acknowledgment',
    component: FieldText,
  },
  [C.ACK.STATEMENT]: {
    label: 'Acknowledgment Statement',
    required: true,
    name: C.ACK.STATEMENT,
    placeholder: 'Enter the acknowledgment statement',
    ariaLabel: 'Statement that will be placed under the details of the acknowledgment',
    component: FieldText,
  },
  [C.ACK.FILE_NAME]: {
    label: 'Attachment Name',
    required: false,
    name: C.ACK.FILE_NAME,
    placeholder: 'Enter attachment name',
    ariaLabel: 'Name of the file that must be read before acknowledging',
    component: FieldText,
  },
  [C.ACK.FILE_CONTENT]: {
    label: 'Attachment',
    required: false,
    name: C.ACK.FILE_CONTENT,
    placeholder: 'Attach a File',
    ariaLabel: 'Attach the file that must be read before acknowledging',
    component: FieldFile,
  },
};


export const recipient = {
  [C.RECIPIENT.ID]: {
    label: 'ID',
    name: C.RECIPIENT.ID,
    ariaLabel: 'ID of the Recipient',
    maxWidth: 100,
  },
  [C.RECIPIENT.SID]: {
    label: 'SID',
    name: C.RECIPIENT.SID,
    ariaLabel: 'SID of the recipient',
    maxWidth: 100,
  },
  [C.RECIPIENT.SAM]: {
    label: 'SAM',
    name: C.RECIPIENT.SAM,
    ariaLabel: 'SAM account of the recipient',
    maxWidth: 100,
  },
  [C.RECIPIENT.FIRST_NAME]: {
    label: 'First Name',
    name: C.RECIPIENT.FIRST_NAME,
    ariaLabel: 'First name of the recipient',
    maxWidth: 100,
  },
  [C.RECIPIENT.LAST_NAME]: {
    label: 'Last Name',
    name: C.RECIPIENT.LAST_NAME,
    ariaLabel: 'Last name of the recipient',
    maxWidth: 100,
  },
  [C.RECIPIENT.EMAIL]: {
    label: 'Email',
    name: C.RECIPIENT.EMAIL,
    ariaLabel: 'Email of the recipient',
  },
  [C.RECIPIENT.MANAGER_SID]: {
    label: 'Manager SID',
    name: C.RECIPIENT.MANAGER_SID,
    ariaLabel: 'SID of the recipients manager',
  },
  [C.RECIPIENT.MANAGER_NAME]: {
    label: 'Manager',
    name: C.RECIPIENT.MANAGER_NAME,
    ariaLabel: 'Full name of the recipients manager',
  },
  [C.RECIPIENT.ACK_ID]: {
    label: 'Acknowledgment ID',
    name: C.RECIPIENT.ACK_DATE,
    ariaLabel: 'ID of the acknowledgment',
  },
  [C.RECIPIENT.ACK_DATE]: {
    label: 'Acknowledgment Date',
    name: C.RECIPIENT.ACK_DATE,
    ariaLabel: 'Date the recipient acknowledged the policy',
    minWidth: 150,
    data: {
      type: types.date,
    },
  },
  [C.RECIPIENT.FIRST_REMINDER_DATE]: {
    label: 'First Reminder Date',
    name: C.RECIPIENT.FIRST_REMINDER_DATE,
    ariaLabel: 'Date of recipients first acknowledgment reminder',
    data: {
      type: types.date,
    },
  },
  [C.RECIPIENT.SECOND_REMINDER_DATE]: {
    label: 'Second Reminder Date',
    name: C.RECIPIENT.SECOND_REMINDER_DATE,
    ariaLabel: 'Date of recipients second acknowledgment reminder',
    data: {
      type: types.date,
    },
  },
  [C.RECIPIENT.FINAL_REMINDER_DATE]: {
    label: 'Final Reminder Date',
    name: C.RECIPIENT.FINAL_REMINDER_DATE,
    ariaLabel: 'Date of recipients final acknowledgment reminder',
    data: {
      type: types.date,
    },
  },
};


// FORM
export const formFields = {
  left: [
    C.ACK.TITLE,
    C.ACK.START_DATE,
    C.ACK.END_DATE,
    C.ACK.CREATOR_GROUP,
    C.ACK.TARGET_GROUPS,
  ],
  right: [
    C.ACK.STATEMENT,
    C.ACK.DETAILS,
    C.ACK.FILE_NAME,
    C.ACK.FILE_CONTENT,
  ],
};


// COLUMNS
const fields = {
  ...recipient,
  ...acknowledgment, // ACK ID WILL OVERRIDE RECIPIENT
};

const homeFields = [
  // C.ACK.ID,
  C.ACK.TITLE,
  C.ACK.STATUS,
  C.ACK.START_DATE,
  C.ACK.END_DATE,
  C.RECIPIENT.ACK_DATE,
  C.ACK.FILE_NAME,
];
const homeExcludes = [
  C.RECIPIENT.ACK_DATE,
];

const adminFields = [
  // C.ACK.ID,
  C.ACK.TITLE,
  C.ACK.STATUS,
  C.ACK.START_DATE,
  C.ACK.END_DATE,
  C.ACK.FILE_NAME,
];

const reportFields = [
  C.RECIPIENT.FIRST_NAME,
  C.RECIPIENT.LAST_NAME,
  C.RECIPIENT.EMAIL,
  C.RECIPIENT.MANAGER_NAME,
  C.RECIPIENT.ACK_DATE,
];
const reportPendingExcludes = [
  C.RECIPIENT.ACK_DATE,
];

export const homeColumns = {
  pending: mapToColumns(fields, homeFields, homeExcludes),
  previous: mapToColumns(fields, homeFields),
};

export const adminColumns = mapToColumns(fields, adminFields);

export const reportColumns = {
  [C.REPORT.PENDING]: mapToColumns(fields, reportFields, reportPendingExcludes),
  [C.REPORT.PREVIOUS]: mapToColumns(fields, reportFields),
};

// CSV FILES
const adminCsvFields = [
  C.RECIPIENT.FIRST_NAME,
  C.RECIPIENT.LAST_NAME,
  C.RECIPIENT.EMAIL,
  C.RECIPIENT.MANAGER_NAME,
  C.RECIPIENT.ACK_DATE,
  C.RECIPIENT.FIRST_REMINDER_DATE,
  C.RECIPIENT.SECOND_REMINDER_DATE,
  C.RECIPIENT.FINAL_REMINDER_DATE,
];

export const adminCsv = {
  fields: adminCsvFields,
  fieldNames: adminCsvFields.map((x) => recipient[x].label),
};
