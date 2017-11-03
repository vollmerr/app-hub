import React from 'react';
import PropTypes from 'prop-types';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import styled from 'styled-components';

import { metaProp, inputProp } from 'utils/propTypes';
import { isEmptyText } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';
import FieldError from './FieldError';


export const Radios = styled(ChoiceGroup)`
  .ms-ChoiceField {
    margin: 0;
  }

  .ms-ChoiceField-field::before {
    ${(props) => props.errorMessage && `border-color: ${theme.redDark};`}
  }
`;


export class FieldRadios extends React.Component {
  handleChange = (event, option) => {
    const { input } = this.props;
    input.onChange(option.key);
  }

  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { touched, error } = meta;
    const { value } = input;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      errorMessage,
      selectedKey: value,
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
