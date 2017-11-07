import PropTypes from 'prop-types';

const { string, bool, shape, func, arrayOf } = PropTypes;

export const metaDataProp = shape({
  title: string,
  desc: string,
  keywords: string,
});

export const routeProp = shape({
  key: string,
  href: string,
  path: string,
  name: string,
});
export const routesProp = arrayOf(routeProp);

// REDUX-FORM
export const inputProp = (value) => shape({
  value,
  onChange: func,
  onBlur: func,
  onFocus: func,
});

export const metaProp = shape({
  error: string,
  touched: bool,
});

export const optionProp = shape({
  key: string,
  text: string,
});
export const optionsProp = arrayOf(optionProp);

