import {
  FieldText,
  FieldSelect,
  FieldDate,
  FieldRadios,
  FieldChecks,
  FieldFile,
} from 'components/Form';

const FIELD_ACK_NAME = 'name';

export default {
  title: 'New Policy Acknowledgment',
  byName: {
    [FIELD_ACK_NAME]: {
      label: 'Name',
      required: true,
      name: FIELD_ACK_NAME,
      placeholder: 'Enter acknowledgment name...',
      component: FieldText,
    },
  },
  allNames: [FIELD_ACK_NAME],
};
