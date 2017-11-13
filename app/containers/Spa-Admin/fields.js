import {
  FieldText,
  // FieldSelect,
  // FieldDate,
  // FieldRadios,
  // FieldChecks,
  FieldFile,
} from 'components/Form';

import {
  FIELD_ACK_NAME,
  FIELD_ACK_FILE,
} from './constants';

const title = 'New Policy Acknowledgment';
const byName = {
  [FIELD_ACK_NAME]: {
    label: 'Name',
    required: true,
    name: FIELD_ACK_NAME,
    placeholder: 'Enter acknowledgment name...',
    component: FieldText,
  },
  [FIELD_ACK_FILE]: {
    label: 'Attachment',
    required: false,
    name: FIELD_ACK_FILE,
    placeholder: 'Attach a File...',
    component: FieldFile,
  },
};
const allNames = Object.keys(byName);

export default {
  title,
  byName,
  allNames,
};
