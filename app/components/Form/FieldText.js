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

  handleChange = () => {
    const { input } = this.props;
    this.setState({ value: input.value || '' });
  }

  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { value } = this.state;

    const { onChange } = input;
    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      value,
      errorMessage,
      onBeforeChange: onChange,
      onChanged: this.handleChange,
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
