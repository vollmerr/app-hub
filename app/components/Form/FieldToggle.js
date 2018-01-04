import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { metaProp, inputProp } from 'utils/propTypes';
import { isNull } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';


const StyledToggle = styled(Toggle) `
  /* Is Requried */
  ${(props) => props.required && !props.disabled && css`
    > label::after {
      content: " *";
      color: ${theme.redDark};
      padding-right: 12px;
    }
  `}
  /* Required with Null state / neither toggled nor untoggled */
  ${(props) => props.warning && isNull(props.checked) && css`
    button {
      background: ${theme.warning};
      border-color: ${theme.yellow};
    }
  `}
  /* Null state / neither toggled nor untoggled */
  ${(props) => isNull(props.checked) && css`
    button + label {
      visibility: hidden;
    }

    button {
      > * {
        visibility: hidden;
      }
    }
  `}
  /* Has Error */
  ${(props) => props.errorMessage && css`
    button {
      background: ${theme.error};
      border-color: ${theme.redDark};
    }
  `}
`;


export class FieldToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.getChecked(this.props.input.value),
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input, meta } = nextProps;
    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';
    const checked = this.getChecked(input.value);

    this.setState({ checked });
    // update error if given one
    if (errorMessage !== this.state.errorMessage) {
      this.setState({ errorMessage }, this.forceUpdate);
    }
  }

  getChecked = (value) => {
    if (isNull(value)) {
      return this.props.isNullable ? undefined : 0;
    }
    return Number(value);
  }

  handleChange = (value) => {
    const { input } = this.props;
    const checked = this.getChecked(value);

    input.onChange(checked);
    this.setState({ checked });
  }

  render() {
    const {
      input,
      ...props
    } = this.props;

    const { checked, errorMessage } = this.state;

    const toggleProps = {
      ...props,
      checked,
      errorMessage,
      onChanged: this.handleChange,
    };

    return (
      <StyledToggle {...toggleProps} />
    );
  }
}


const { number, bool } = PropTypes;

FieldToggle.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp(number).isRequired,
  isNullable: bool,
};

export default Field(FieldToggle, isNull);
