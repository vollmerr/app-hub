/**
 * cross field / non standard validation goes here
 */
const validate = (values, state) => {
  const errors = {};

  // values are an immutable object, must use .get
  if (values.get('textArea')) {
    // set error on 'textDefault'
    errors.textDefault = 'This error is showing because you entered text in the `textArea` field (see validate.js)';
    // touch 'textDefault' so it will render the error (if already touched does not matter)
    state.touch('textDefault');
  }

  return errors;
};

export default validate;
