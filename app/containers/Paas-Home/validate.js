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

  vals.forEach((v, k) => {
    errors[k] = {};
    Object.keys(apps).forEach((app) => {
      errors[k][app] = isNull(vals.getIn([k, app]));
    });
  });

  return errors;
};

export default validate;
