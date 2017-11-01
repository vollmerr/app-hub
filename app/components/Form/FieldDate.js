import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import styled from 'styled-components';

import { isEmptyDate } from 'utils/validate';

import Field from './Field';

/**
 * Fix componentWillReceiveProps instead of completely rewritting...
 * - fix error displaying before selecting component / when moutned
 * - remove hard set error message / allow passing one in
 * - remove check for updating formattedDate (was false if '' value thus leaving value when 'reset')
 *
 * CHECK FOR UPDATES / IF PROBLEM FIXED:
 * https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/DatePicker/DatePicker.tsx
 */
/* istanbul ignore next */
DatePicker.prototype.componentWillReceiveProps = function (nextProps) { // eslint-disable-line
  const { formatDate, value, errorMessage } = nextProps;

  this.setState({
    errorMessage,
  });

  this.setState({
    selectedDate: value || new Date(),
    formattedDate: (formatDate && value) ? formatDate(value) : '',
  });
};

/**
 * Fix _validateTextInput instead of completely rewritting...
 * - fix error displaying when clearing values
 * - remove hard set error message / allow passing one in
 * - remove allowTextInput logic as not used
 *
 * CHECK FOR UPDATES / IF PROBLEM FIXED:
 * https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/DatePicker/DatePicker.tsx
 */
/* istanbul ignore next */
DatePicker.prototype._validateTextInput = function() { // eslint-disable-line
  const { isRequired, errorMessage } = this.props;
  const { formattedDate, isDatePickerShown } = this.state;
  // Do validation only if DatePicker's popup is dismissed
  if (isDatePickerShown) {
    return;
  }

  // Check when DatePicker is a required field but has NO input value
  if (isRequired && !formattedDate) {
    this.setState({
      errorMessage,
    });
  }
};


export const Picker = styled(DatePicker)`
  ${(props) => props.disabled && '.ms-Icon { display: none; }'}
`;

export class FieldDate extends React.Component {
  handleChange = (date) => {
    const { input } = this.props;
    input.onChange(date);
  }

  render() {
    const {
      meta,
      input,
      required,
      ...props
    } = this.props;

    const { touched, error } = meta;
    const { value } = input;
    const errorMessage = touched && error ? error : null;

    const fieldProps = {
      ...props,
      value,
      errorMessage,
      isRequired: required,
      highlightCurrentMonth: true,
      onSelectDate: this.handleChange,
    };

    return (
      <Picker {...fieldProps} />
    );
  }
}

FieldDate.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  required: PropTypes.bool,
};

export default Field(FieldDate, isEmptyDate);
