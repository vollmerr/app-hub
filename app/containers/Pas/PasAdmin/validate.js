import { isNull } from 'utils/validate';

import * as C from '../constants';


// cross field validation for form
const validate = (vals) => {
  // go though all values

  let error;
  const errors = {};
  error = isNull(vals[C.MANAGE.EMPLOYEE_ID]);
  // for each app
  if (error) {
    errors[C.MANAGE.EMPLOYEE_ID] = error;
  }
  error = isNull(vals[C.MANAGE.MANAGER_ID]);
  // for each app
  if (error) {
    errors[C.MANAGE.MANAGER_ID] = error;
  }

  return errors;
};

export default validate;
