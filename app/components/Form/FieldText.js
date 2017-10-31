import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { isEmptyText } from 'utils/validate';

import Field from './Field';


export class FieldText extends React.Component {
  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { touched, error } = meta;
    const { onChange, ...inputProps } = input;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      ...inputProps,
      onChanged: onChange,
      errorMessage,
    };

    return (
      <TextField {...fieldProps} />
    );
  }
}

FieldText.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};

export default Field(FieldText, isEmptyText);
