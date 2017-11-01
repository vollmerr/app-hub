/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'immutable'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';
import { isEmptyText } from 'utils/validate';

import {
  FieldText,
  FieldSelect,
  FieldDate,
  FieldRadios,
} from 'components/Form';

import Section from './Section';
import fields from './fields';
import validate from './validate';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px;
  padding: 25px;
  background: ${theme.white};

  * {
    transition: none;
  }
`;


export class DemoForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const onSubmit = (vals) => alert(JSON.stringify(vals.toJS(), null, 2));

    return (
      // pass custom onSubmit to redux-forms handleSubmit. Use noValidate to turn off html5 validation
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {
          // go through each section in the form in order specified
          fields.allSections.map((sectionName) => (
            // when mapping/looping a unique 'key' is required by react.
            // look up the section by name and pass all its values to 'Section'
            <Section key={sectionName} {...fields.bySection[sectionName]} />
          ))
        }

        <Buttons>
          <DefaultButton
            primary
            type={'submit'}
            disabled={pristine || submitting}
            text={'Submit'}
          />
          <DefaultButton
            disabled={pristine || submitting}
            text={'Clear'}
            onClick={reset}
          />
        </Buttons>
      </Form>
    );
  }
}

DemoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const withForm = reduxForm({
  form: 'demo', // name of form (in redux store as 'form.demo')
  validate, // form wide validation (such as if this field is filled out this one must also be)
});

export default compose(
  withForm,
)(DemoForm);
