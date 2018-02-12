import { isNull } from 'utils/validate';

import * as C from '../constants';


// cross field validation for form
const validate = (vals) => {
  const allErrors = {};
  // go though all values
  Object.keys(vals).forEach((sid) => {
    let error;
    const errors = {};
    // for each app
    C.APP_LIST.forEach((app) => {
      error = isNull(vals[sid][app]);
      // if it has an error add
      if (error) {
        errors[app] = error;
      }
    });
    // add if have errors and have touched (if eq number of apps means not touched..)
    if (Object.keys(errors).length && (Object.keys(errors).length !== Object.values(C.APPS).length)) {
      allErrors[sid] = errors;
    }
  });

  return allErrors;
};

export default validate;
