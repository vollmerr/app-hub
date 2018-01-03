import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { metaProp, inputProp } from 'utils/propTypes';
import { isNull } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';


const TriToggle = styled(Toggle) `
  ${(props) => props.required && css`
    label::after {
      content: " *";
      color: ${theme.redDark};
      padding-right: 12px;
    }
  `}

  ${(props) => props.errorMessage && css`
    button {
      border-color: ${theme.redDark};
    }
  `}

  ${(props) => isNull(props.checked) && css`
    button {
      background: transparent;
      border-color: ${theme.neutralTertiary};

      > * {
        visibility: hidden;
      }
    }
  `}
`;


export class FieldToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.input.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input } = nextProps;

    if (isNaN(input.value)) {
      this.setState({ checked: undefined });
    }
  }

  handleChange = (value) => {
    const { input } = this.props;

    input.onChange(Number(value));
    this.setState({ checked: Boolean(value) });
  }

  render() {
    const {
      meta,
      input,
      ...props
    } = this.props;

    const { checked } = this.state;

    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';

    const toggleProps = {
      ...props,
      checked,
      errorMessage,
      onChanged: this.handleChange,
    };

    return (
      <TriToggle {...toggleProps} />
    );
  }
}


const { number } = PropTypes;

FieldToggle.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp(number).isRequired,
};

export default Field(FieldToggle, isNull);
