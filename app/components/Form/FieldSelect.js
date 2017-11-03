import React from 'react';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import styled from 'styled-components';

import { metaProp, inputProp } from 'utils/propTypes';
import { isEmptyText } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';


export const Select = styled(ComboBox)`
  .ms-ComboBox {
    margin: 0;
    box-sizing: border-box;

    ${(props) => !props.disabled &&
      `&:hover {
        border-color: ${theme.neutralPrimary};
      }`
    };
  }

  label {
    color: ${theme.neutralPrimary}
  }

  * {
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  }
`;


export class FieldSelect extends React.Component {
  handleChange = (option) => {
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
    const { value, onFocus } = input;
    const errorMessage = touched && error ? error : '';

    const fieldProps = {
      ...props,
      onFocus,
      errorMessage,
      selectedKey: value,
      onChanged: this.handleChange,
    };

    return (
      <Select {...fieldProps} />
    );
  }
}

FieldSelect.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp.isRequired,
};

export default Field(FieldSelect, isEmptyText);
