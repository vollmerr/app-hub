import { isNull } from 'utils/validate';

// TODO CONSTS
const apps = {
  app1: {},
  app2: {},
  app3: {},
  app4: {},
};

// cross field validation for form
const validate = (vals) => {
  const errors = {};
  // go though all values
  Object.keys(vals).forEach((k) => {
    errors[k] = {};
    let value;
    const values = {};
    // for each app
    Object.keys(apps).forEach((app) => {
      value = isNull(vals[k][app]);
      // if it has an error add
      if (value) {
        values[app] = value;
      }
    });
    // if all errors leave alone (means row hasnt been touched)
    if (Object.keys(values).length !== Object.keys(apps).length) {
      errors[k] = values;
    }
  });

  return errors;
};

export default validate;
