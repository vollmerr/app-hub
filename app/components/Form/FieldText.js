import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { metaProp, inputProp } from 'utils/propTypes';
import { isEmptyText } from 'utils/validate';

import Field from './Field';


export class FieldText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.input.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    const value = input.value || '';
    this.setState({ value });
  }

  handleChange = (value) => {
    const { input } = this.props;

    input.onChange(value);
    this.setState({ value: input.value || '' });
  }

  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { value } = this.state;

    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      value,
      errorMessage,
      onBeforeChange: this.handleChange,
    };

    return (
      <TextField {...fieldProps} />
    );
  }
}


const { string } = PropTypes;

FieldText.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp(string).isRequired,
};

export default Field(FieldText, isEmptyText);
