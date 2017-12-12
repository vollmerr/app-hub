import { ACK } from 'containers/Spa/constants';

// cross field validation for form
const validate = (vals) => {
  const errors = {};
  // check end date after start
  if (vals.get(ACK.DATE_START) && vals.get(ACK.DATE_END)) {
    if (new Date(vals.get(ACK.DATE_START)) > new Date(vals.get(ACK.DATE_END))) {
      errors[ACK.DATE_END] = '"End Date" must be after "Start Date"';
    }
  }
  // check if name but no attachment
  if (vals.get(ACK.FILE_NAME) && !vals.get(ACK.FILE_CONTENT)) {
    errors[ACK.FILE_CONTENT] = 'An "Attachment" is required if an "Attachment Name" is provided';
  }
  // check if no name but attachment
  if (!vals.get(ACK.FILE_NAME) && vals.get(ACK.FILE_CONTENT)) {
    errors[ACK.FILE_NAME] = 'An "Attachment Name" is required if an "Attachment" is provided';
  }
  return errors;
};

export default validate;
