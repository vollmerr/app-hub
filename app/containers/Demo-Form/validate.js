/**
 * cross field / non standard validation goes here
 */
const validate = (values) => {
  const errors = {};
  // values are an immutable object, must use .get
  if (values.textArea) {
    // set error on 'textDefault'
    errors.textDefault = 'This error is showing because you entered text in the `textArea` field (see validate.js)';
  }

  return errors;
};

export default validate;
