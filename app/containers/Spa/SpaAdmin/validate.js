import { daysToMs } from '../../../utils/date';

import { ACK } from '../constants';


// cross field validation for form
const validate = (vals) => {
  const errors = {};
  // check end date after start
  if (vals[ACK.START_DATE] && vals[ACK.END_DATE]) {
    if (new Date(vals[ACK.END_DATE]) - new Date(vals[ACK.START_DATE]) < daysToMs(14)) {
      errors[ACK.END_DATE] = '"End Date" must be at least 14 days after "Start Date"';
    }

    if (new Date(vals[ACK.START_DATE]) > new Date(vals[ACK.END_DATE])) {
      errors[ACK.END_DATE] = '"End Date" must be after "Start Date"';
    }
  }
  // check if name but no attachment
  if (vals[ACK.FILE_NAME] && !vals[ACK.FILE_CONTENT]) {
    errors[ACK.FILE_CONTENT] = 'An "Attachment" is required if an "Attachment Name" is provided';
  }
  // check if no name but attachment
  if (!vals[ACK.FILE_NAME] && vals[ACK.FILE_CONTENT]) {
    errors[ACK.FILE_NAME] = 'An "Attachment Name" is required if an "Attachment" is provided';
  }

  return errors;
};


export default validate;
