import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxField } from 'redux-form/immutable';


function Field(WrappedComponent, requiredFunc = null) {
  return class WrappedField extends React.PureComponent {
    static propTypes = {
      required: PropTypes.bool,
      disabled: PropTypes.bool,
      validate: PropTypes.array,
    };

    static defaultProps = {
      required: false,
      disabled: false,
      validate: [],
    }

    render() {
      const {
        required,
        disabled,
        validate,
        ...props
      } = this.props;

      let toValidate = [];
      if (!disabled) {
        toValidate = [...validate];

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
        component: WrappedComponent,
      };

      return (
        <ReduxField {...fieldProps} />
      );
    }
  };
}

export default Field;
