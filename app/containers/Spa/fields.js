import { ACK } from 'containers/Spa/constants';

import {
  FieldText,
  FieldDate,
  FieldChecks,
  FieldFile,
} from 'components/Form';


// Other lists lookup from this list
const spaFields = {
  [ACK.TITLE]: {
    label: 'Title',
    required: true,
    name: ACK.TITLE,
    placeholder: 'Enter acknowledgment title',
    ariaLabel: 'Title of the acknowledgment',
    component: FieldText,
  },
  [ACK.DATE_START]: {
    label: 'Start Date',
    required: true,
    name: ACK.DATE_START,
    placeholder: 'Select the start date',
    ariaLabel: 'Date the acknowledgment takes effect',
    component: FieldDate,
  },
  [ACK.DATE_END]: {
    label: 'Start Date',
    required: true,
    name: ACK.DATE_END,
    placeholder: 'Select the end date',
    ariaLabel: 'Date the acknowledgment expires',
    component: FieldDate,
  },
  [ACK.TARGET_GROUPS]: {
    label: 'Target Group(s)',
    required: true,
    name: ACK.TARGET_GROUPS,
    ariaLabel: 'AD groups that must acknowledge the policy',
    component: FieldChecks,
    options: [
      { key: 'group1', text: 'Group 1' },
      { key: 'group2', text: 'Group 2' },
      { key: 'group3', text: 'Group 3' },
    ],
  },
  [ACK.STATEMENT]: {
    label: 'Statement',
    required: true,
    name: ACK.STATEMENT,
    placeholder: 'Enter the acknowledgment statement',
    ariaLabel: 'Statement that will be placed under the details of the acknowledgment',
    component: FieldText,
  },
  [ACK.DETAILS]: {
    label: 'Details',
    required: true,
    multiline: true,
    name: ACK.DETAILS,
    placeholder: 'Enter acknowledgment details',
    ariaLabel: 'Details of the acknowledgment',
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


// NEW ACKNOWLEGDMENTS FORM
export const newAckForm = {
  title: 'New Policy Acknowledgment',
  sections: {
    left: [
      ACK.TITLE,
      ACK.DATE_START,
      ACK.DATE_END,
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

export default spaFields;
