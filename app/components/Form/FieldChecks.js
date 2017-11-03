import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import styled from 'styled-components';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { metaProp, inputProp, optionsProp } from 'utils/propTypes';
import { isEmptyChecks } from 'utils/validate';
import theme from 'utils/theme';

import Field from './Field';
import FieldError from './FieldError';


export const Check = styled(Checkbox)`
  margin: 5px 0;

  .ms-Checkbox-checkbox {
    ${(props) => props.errorMessage && `border-color: ${theme.redDark};`}
  }
`;


export class FieldChecks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { input, options } = nextProps;
    // when redux form resets, reset the options to not checked
    if (!input.value) {
      const newOptions = options.map((option) => ({ ...option, checked: false }));
      this.setState({ options: newOptions });
    }
  }

  handleChange = (event, isChecked, key) => {
    const { input } = this.props;
    const { options } = this.state;
    const newOptions = [...options];
    // set the selected checkbox to checked (or not checked if false)
    newOptions.find((option) => option.key === key).checked = isChecked;
    // get just keys that are checked for redux store
    const checked = newOptions
      .filter((option) => option.checked)
      .map((option) => option.key);
    // update in redux store and state
    input.onChange(checked);
    this.setState({ options: newOptions });
  }

  render() {
    const {
      meta,
      input,
      label,
      required,
      ...props
    } = this.props;

    const { options } = this.state;

    const { touched, error } = meta;
    const errorMessage = touched && error ? error : '';

    const labelProps = {
      label,
      required,
    };

    const checkBoxProps = {
      ...props,
      errorMessage,
    };

    return (
      <div>
        {label && <Label {...labelProps}>{label}</Label>}
        {
          options.map((option) => (
            <Check
              {...option}
              {...checkBoxProps}
              label={option.text}
              onChange={(event, checked) => this.handleChange(event, checked, option.key)}
            />
          ))
        }
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </div>
    );
  }
}


const { bool, string } = PropTypes;

FieldChecks.propTypes = {
  meta: metaProp.isRequired,
  input: inputProp.isRequired,
  label: string,
  required: bool,
  options: optionsProp.isRequired,
};

export default Field(FieldChecks, isEmptyChecks);
