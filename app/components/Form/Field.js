import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxField } from 'redux-form/immutable';

const { bool, string, arrayOf, func } = PropTypes;


function Field(WrappedComponent, requiredFunc = null) {
  return class WrappedField extends React.PureComponent {
    static propTypes = {
      required: bool,
      disabled: bool,
      validate: arrayOf(func),
      placeholder: string,
    };

    static defaultProps = {
      required: false,
      disabled: false,
      validate: [],
      placeholder: '',
    };

    render() {
      const {
        required,
        disabled,
        validate,
        placeholder,
        ...props
      } = this.props;

      let toValidate = [];
      let newPlaceholder;
      if (!disabled) {
        toValidate = [...validate];
        newPlaceholder = placeholder;

        if (required) {
          toValidate.push(requiredFunc);
        }
      }

      const isRequired = required && !disabled;

      const fieldProps = {
        ...props,
        disabled,
        required: isRequired,
        validate: toValidate,
        placeholder: newPlaceholder,
        component: WrappedComponent,
      };

      return (
        <ReduxField {...fieldProps} />
      );
    }
  };
}

export default Field;
