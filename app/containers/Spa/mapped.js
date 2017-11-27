/**
 * Mapping of names and data to structures
 * such as form fields, columns, etc
 */
import { ACK } from 'containers/Spa/constants';

import {
  FieldText,
  FieldDate,
  FieldChecks,
  FieldFile,
} from 'components/Form';


/**
 * Maps a object to the format Office-UI-Fabric-React
 *
 * @param {object} obj    - object to map
 * @param {array} include - keys to include, if empty includes all
 * @param {array} exclude - keys to exclude
 *
 * @return {object}       - mapped object to use in List
 */
function mapToColumns(obj, include = [], exclude = []) {
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
      minWidth: 100,
      maxWidth: 400,
    }));
}


// ALL VALUES FOR SPA
// Other lists lookup from this list
const all = {
  [ACK.TITLE]: {
    label: 'Title',
    required: true,
    name: ACK.TITLE,
    placeholder: 'Enter acknowledgment name',
    component: FieldText,
  },
  [ACK.DATE_START]: {
    label: 'Start Date',
    required: true,
    name: ACK.DATE_START,
    placeholder: 'Select the start date',
    component: FieldDate,
  },
  [ACK.DATE_END]: {
    label: 'Start Date',
    required: true,
    name: ACK.DATE_END,
    placeholder: 'Select the end date',
    component: FieldDate,
  },
  [ACK.GROUP_TARGET]: {
    label: 'Target Group(s)',
    required: true,
    name: ACK.GROUP_TARGET,
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
    component: FieldText,
  },
  [ACK.DETAILS]: {
    label: 'Details',
    required: true,
    multiline: true,
    name: ACK.DETAILS,
    placeholder: 'Enter acknowledgment details',
    component: FieldText,
  },
  [ACK.FILE_NAME]: {
    label: 'Attachment Name',
    required: false,
    name: ACK.FILE_NAME,
    placeholder: 'Enter attachment name',
    component: FieldText,
  },
  [ACK.FILE_CONTENT]: {
    label: 'Attachment',
    required: false,
    name: ACK.FILE_CONTENT,
    placeholder: 'Attach a File',
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
      ACK.GROUP_TARGET,
    ],
    right: [
      ACK.STATEMENT,
      ACK.DETAILS,
      ACK.FILE_NAME,
      ACK.FILE_CONTENT,
    ],
  },
};

// Columns for admin page lists
const adminExcludes = [ACK.STATEMENT, ACK.DETAILS, ACK.FILE_CONTENT];
export const adminColumns = mapToColumns(all, [], adminExcludes);
// columns for home page
const homePendingIncludes = [ACK.TITLE, ACK.DATE_START, ACK.DATE_END];
export const homePendingColumns = mapToColumns(all, homePendingIncludes);
const homePreviousIncludes = [...homePendingIncludes];
export const homePreviousColumns = mapToColumns(all, homePreviousIncludes);

export default all;
