/**
 * Mapping of names and data to structures
 * such as form fields, columns, etc
 */
import * as KEYS from 'containers/Spa/constants';

import {
  FieldText,
  FieldDate,
  FieldChecks,
  FieldFile,
} from 'components/Form';


/**
 * Maps a object to the format Office-UI-Fabric-React
 * TODO: SHAPE OF INPUT/OUPT COMENT
 *
 * @param {object} obj    - object to map
 */
function mapToColumns(obj) {
  return Object.values(obj).map((value) => ({
    key: value.name,
    name: value.label,
    fieldName: value.name,
  }));
}


// ALL VALUES FOR SPA
// Other lists lookup from this list
const all = {
  [KEYS.ACK.TITLE]: {
    label: 'Title',
    required: true,
    name: KEYS.ACK.TITLE,
    placeholder: 'Enter acknowledgment name',
    component: FieldText,
  },
  [KEYS.ACK.DATE_START]: {
    label: 'Start Date',
    required: true,
    name: KEYS.ACK.DATE_START,
    placeholder: 'Select the start date',
    component: FieldDate,
  },
  [KEYS.ACK.DATE_END]: {
    label: 'Start Date',
    required: true,
    name: KEYS.ACK.DATE_END,
    placeholder: 'Select the end date',
    component: FieldDate,
  },
  [KEYS.ACK.GROUP_TARGET]: {
    label: 'Target Group(s)',
    required: true,
    name: KEYS.ACK.GROUP_TARGET,
    component: FieldChecks,
    options: [
      { key: 'group1', text: 'Group 1' },
      { key: 'group2', text: 'Group 2' },
      { key: 'group3', text: 'Group 3' },
    ],
  },
  [KEYS.ACK.STATEMENT]: {
    label: 'Statement',
    required: true,
    name: KEYS.ACK.STATEMENT,
    placeholder: 'Enter the acknowledgment statement',
    component: FieldText,
  },
  [KEYS.ACK.DETAILS]: {
    label: 'Details',
    required: true,
    multiline: true,
    name: KEYS.ACK.DETAILS,
    placeholder: 'Enter acknowledgment details',
    component: FieldText,
  },
  [KEYS.ACK.FILE_NAME]: {
    label: 'Attachment Name',
    required: false,
    name: KEYS.ACK.FILE_NAME,
    placeholder: 'Enter attachment name',
    component: FieldText,
  },
  [KEYS.ACK.FILE_CONTENT]: {
    label: 'Attachment',
    required: false,
    name: KEYS.ACK.FILE_CONTENT,
    placeholder: 'Attach a File',
    component: FieldFile,
  },
};


// NEW ACKNOWLEGDMENTS FORM
export const newAckForm = {
  title: 'New Policy Acknowledgment',
  sections: {
    left: [
      KEYS.ACK.TITLE,
      KEYS.ACK.DATE_START,
      KEYS.ACK.DATE_END,
      KEYS.ACK.GROUP_TARGET,
    ],
    right: [
      KEYS.ACK.STATEMENT,
      KEYS.ACK.DETAILS,
      KEYS.ACK.FILE_NAME,
      KEYS.ACK.FILE_CONTENT,
    ],
  },
};

// Columns for admin page lists
export const adminColumns = mapToColumns(all);

export default all;
