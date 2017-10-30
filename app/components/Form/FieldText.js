import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { isEmptyText } from 'utils/validate';
import { mapOnBlur, mapOnFocus, mapOnChange } from 'utils/reduxForm';

import Field from './Field';


export class FieldText extends React.Component {
  render() {
    const {
      meta,
      input,
      onBlur,
      onFocus,
      onChange,
      ...props
    } = this.props;

    const { touched, error } = meta;
    const { value } = input;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      value,
      errorMessage,
      onBlur: mapOnBlur(onBlur, input),
      onFocus: mapOnFocus(onFocus, input),
      onChanged: mapOnChange(onChange, input),
    };

    return (
      <TextField {...fieldProps} />
    );
  }
}

FieldText.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};

export default Field(FieldText, isEmptyText);
