import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { metaProp, inputProp } from '../../utils/propTypes';
import { isNull } from '../../utils/validate';
import theme from '../../utils/theme';

import Field from './Field';


export const StyledToggle = styled(Toggle) `
  /* read only, keep original styling... (set disabled to make not change and readOnly for style) */
  ${(props) => props.readOnly && css`
    .ms-Toggle-background {
      background: ${props.checked ? theme.themePrimary : theme.white};
    }

    .ms-Toggle-thumb {
      background: ${props.checked ? theme.white : theme.neutralPrimary};
      border-color: ${props.checked ? 'transparent' : theme.neutralPrimary};
    }

    .ms-Label {
      color: ${theme.neutralPrimary};
    }
  `}
  /* Is Requried */
  ${(props) => props.required && !props.disabled && css`
    > .ms-Label::after {
      content: " *";
      color: ${theme.redDark};
      padding-right: 12px;
    }
  `}
  /* Required with Null state / neither toggled nor untoggled */
  ${(props) => props.warning && isNull(props.checked) && css`
    .ms-Toggle-background {
      background: ${theme.warning};
      border-color: ${theme.yellow};
    }
  `}
  /* Null state / neither toggled nor untoggled */
  ${(props) => isNull(props.checked) && css`
    .ms-Toggle-background + .ms-Label {
      visibility: hidden;
    }

    .ms-Toggle-background {
      > * {
        visibility: hidden;
      }
    }
  `}
  /* Has Error */
  ${(props) => props.errorMessage && css`
    .ms-Toggle-background {
      background: ${theme.error};
      border-color: ${theme.redDark};
    }
  `}
`;


export class FieldToggle extends React.Component {
  static format = (value) => isNaN(Number(value)) || isNull(value) ? undefined : Number(value);

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
    // update local checked value
    this.setState({ checked });
    // update error if given one
    if (errorMessage !== this.state.errorMessage) {
      this.setState({ errorMessage }, this.forceUpdate);
    }
  }

  /**
   * Gets the checked value, changes null/undefned values
   * to 0 if not nullable
   *
   * @param {number|bool} value     - value of if toggle is checked
   *
   * @return {number}               - number representation of if checked
   */
  getChecked = (value) => {
    // defaults for null value
    if (isNull(value)) {
      return this.props.isNullable ? undefined : 0;
    }
    return Number(value);
  }

  /**
   * Handles if the toggle value has changed
   * Updates redux form
   *
   * @param {bool} value    - value of if toggle is checked
   */
  handleChange = (value) => {
    const { input } = this.props;
    const checked = this.getChecked(value);
    input.onChange(checked);
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
