import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReactField } from 'react-final-form';
import styled from 'styled-components';


const { bool, string, arrayOf, func } = PropTypes;

export const composeValidators = (...validators) => (value) => (
  validators.reduce((error, validator) => error || validator(value), undefined)
);

export const format = (component) => (value) => (
  component.format ? component.format(value) : value || ''
);


export const StyledField = styled(ReactField)`
  ${(props) => props.hidden && 'display: none;'}
`;


function Field(WrappedComponent, requiredFunc = null) {
  return class WrappedField extends React.PureComponent {
    static propTypes = {
      required: bool,
      disabled: bool,
      validate: arrayOf(func),
      placeholder: string,
      ariaLabel: string,
    };

    static defaultProps = {
      required: false,
      disabled: false,
      validate: [],
      placeholder: '',
      ariaLabel: '',
    };

    render() {
      const {
        required,
        disabled,
        validate,
        placeholder,
        ariaLabel,
        ...props
      } = this.props;

      let toValidate = [];
      let newPlaceholder;
      if (!disabled) {
        toValidate = [...validate];
        newPlaceholder = placeholder;

        if (required && requiredFunc) {
          toValidate.push(requiredFunc);
        }
      }

      const isRequired = required && !disabled;

      const fieldProps = {
        ...props,
        disabled,
        required: isRequired,
        validate: composeValidators(...toValidate),
        placeholder: newPlaceholder,
        'aria-label': ariaLabel,
        component: WrappedComponent,
        format: format(WrappedComponent),
      };

      return (
        <StyledField {...fieldProps} />
      );
    }
  };
}

export default Field;
