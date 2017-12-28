import { COL_TYPES } from 'containers/AppHub/constants';
import { ACK, RECIPIENT, REPORT } from 'containers/Spa/constants';
import { mapToColumns } from 'utils/data';
import { isFutureDate } from 'utils/validate';

import {
  FieldText,
  FieldDate,
  FieldChecks,
  FieldFile,
} from 'components/Form';


export const acknowledgment = {
  [ACK.ID]: {
    label: 'ID',
    name: ACK.ID,
    ariaLabel: 'ID of the acknowledgment',
    minWidth: 20,
    maxWidth: 40,
  },
  [ACK.TITLE]: {
    label: 'Title',
    required: true,
    name: ACK.TITLE,
    placeholder: 'Enter acknowledgment title',
    ariaLabel: 'Title of the acknowledgment',
    component: FieldText,
  },
  [ACK.STATUS]: {
    label: 'Status',
    name: ACK.STATUS,
    ariaLabel: 'Status of the acknowledgment',
    maxWidth: 100,
  },
  [ACK.START_DATE]: {
    label: 'Start Date',
    required: true,
    name: ACK.START_DATE,
    placeholder: 'Select the start date',
    ariaLabel: 'Date the acknowledgment takes effect',
    component: FieldDate,
    validate: [isFutureDate],
    maxWidth: 100,
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [ACK.END_DATE]: {
    label: 'End Date',
    required: true,
    name: ACK.END_DATE,
    placeholder: 'Select the end date',
    ariaLabel: 'Date the acknowledgment expires',
    component: FieldDate,
    validate: [isFutureDate],
    maxWidth: 100,
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [ACK.CREATOR_GROUP]: {
    label: 'Creator Group',
    name: ACK.CREATOR_GROUP,
    ariaLabel: 'AD group that created the acknowledgment',
  },
  [ACK.TARGET_GROUPS]: {
    label: 'Target Group(s)',
    required: true,
    name: ACK.TARGET_GROUPS,
    ariaLabel: 'AD groups that must acknowledge the policy',
    component: FieldChecks,
    options: [],
  },
  [ACK.DETAILS]: {
    label: 'Description',
    required: true,
    multiline: true,
    name: ACK.DETAILS,
    placeholder: 'Enter acknowledgment description',
    ariaLabel: 'Description of the acknowledgment',
    component: FieldText,
  },
  [ACK.STATEMENT]: {
    label: 'Acknowledgment Statement',
    required: true,
    name: ACK.STATEMENT,
    placeholder: 'Enter the acknowledgment statement',
    ariaLabel: 'Statement that will be placed under the details of the acknowledgment',
    component: FieldText,
  },
  [ACK.FILE_NAME]: {
    label: 'Attachment Name',
    required: false,
    name: ACK.FILE_NAME,
    placeholder: 'Enter attachment name',
    ariaLabel: 'Name of the file that must be read before acknowledging',
    component: FieldText,
  },
  [ACK.FILE_CONTENT]: {
    label: 'Attachment',
    required: false,
    name: ACK.FILE_CONTENT,
    placeholder: 'Attach a File',
    ariaLabel: 'Attach the file that must be read before acknowledging',
    component: FieldFile,
  },
};


export const recipient = {
  [RECIPIENT.ID]: {
    label: 'ID',
    name: RECIPIENT.ID,
    ariaLabel: 'ID of the Recipient',
    maxWidth: 100,
  },
  [RECIPIENT.SID]: {
    label: 'SID',
    name: RECIPIENT.SID,
    ariaLabel: 'SID of the recipient',
    maxWidth: 100,
  },
  [RECIPIENT.SAM]: {
    label: 'SAM',
    name: RECIPIENT.SAM,
    ariaLabel: 'SAM account of the recipient',
    maxWidth: 100,
  },
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
  [RECIPIENT.EMAIL]: {
    label: 'Email',
    name: RECIPIENT.EMAIL,
    ariaLabel: 'Email of the recipient',
  },
  [RECIPIENT.MANAGER_SID]: {
    label: 'Manager SID',
    name: RECIPIENT.MANAGER_SID,
    ariaLabel: 'SID of the recipients manager',
  },
  [RECIPIENT.MANAGER_NAME]: {
    label: 'Manager',
    name: RECIPIENT.MANAGER_NAME,
    ariaLabel: 'Full name of the recipients manager',
  },
  [RECIPIENT.ACK_ID]: {
    label: 'Acknowledgment ID',
    name: RECIPIENT.ACK_DATE,
    ariaLabel: 'ID of the acknowledgment',
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
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [RECIPIENT.SECOND_REMINDER_DATE]: {
    label: 'Second Reminder Date',
    name: RECIPIENT.SECOND_REMINDER_DATE,
    ariaLabel: 'Date of recipients second acknowledgment reminder',
    data: {
      type: COL_TYPES.DATE,
    },
  },
  [RECIPIENT.FINAL_REMINDER_DATE]: {
    label: 'Final Reminder Date',
    name: RECIPIENT.FINAL_REMINDER_DATE,
    ariaLabel: 'Date of recipients final acknowledgment reminder',
    data: {
      type: COL_TYPES.DATE,
    },
  },
};


// FORMS

export const newAckForm = {
  title: 'New Policy Acknowledgment',
  sections: {
    left: [
      ACK.TITLE,
      ACK.START_DATE,
      ACK.END_DATE,
      ACK.TARGET_GROUPS,
    ],
    right: [
      ACK.STATEMENT,
      ACK.DETAILS,
      ACK.FILE_NAME,
      ACK.FILE_CONTENT,
    ],
  },
};


// COLUMNS

const fields = {
  ...recipient,
  ...acknowledgment, // ACK ID WILL OVERRIDE RECIPIENT
};

const homeFields = [
  ACK.ID,
  ACK.TITLE,
  ACK.STATUS,
  ACK.START_DATE,
  ACK.END_DATE,
  RECIPIENT.ACK_DATE,
  ACK.FILE_NAME,
];
const homeExcludes = [
  RECIPIENT.ACK_DATE,
];

const adminFields = [
  ACK.ID,
  ACK.TITLE,
  ACK.STATUS,
  ACK.START_DATE,
  ACK.END_DATE,
  ACK.FILE_NAME,
];

const reportFields = [
  RECIPIENT.FIRST_NAME,
  RECIPIENT.LAST_NAME,
  RECIPIENT.EMAIL,
  RECIPIENT.MANAGER_NAME,
  RECIPIENT.ACK_DATE,
];
const reportExcludes = [
  RECIPIENT.ACK_DATE,
];

export const homeColumns = {
  pending: mapToColumns(fields, homeFields, homeExcludes),
  previous: mapToColumns(fields, homeFields),
};

export const adminColumns = mapToColumns(fields, adminFields);

export const reportColumns = {
  [REPORT.PENDING]: mapToColumns(fields, reportFields, reportExcludes),
  [REPORT.PREVIOUS]: mapToColumns(fields, reportFields),
};
