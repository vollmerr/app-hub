import React from 'react';
import PropTypes from 'prop-types';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import styled from 'styled-components';

import { metaProp, inputProp } from '../../utils/propTypes';
import { isEmptyText } from '../../utils/validate';
import theme from '../../utils/theme';

import Field from './Field';
import FieldError from './FieldError';


export const Radios = styled(ChoiceGroup) `
  .ms-ChoiceField {
    margin: 0;
  }

  .ms-ChoiceField-field::before {
    ${(props) => props.errorMessage && `border-color: ${theme.redDark};`}
  }
`;


export class FieldRadios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: this.props.input.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;
    // when redux form resets, reset the selectedKey to none
    if (!input.value) {
      this.setState({ selectedKey: null });
    }
  }

  handleChange = (event, option) => {
    const { input } = this.props;
    const key = option.key;

    this.setState({ selectedKey: key });
    input.onChange(key);
  }

  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { selectedKey } = this.state;

    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      selectedKey,
      errorMessage,
      onChange: this.handleChange,
    };

    return (
      <div>
        <Radios {...fieldProps} />
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </div>
    );
  }
}


const { string } = PropTypes;

FieldRadios.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp(string).isRequired,
};

export default Field(FieldRadios, isEmptyText);
