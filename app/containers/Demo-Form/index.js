/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'immutable'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

import { isEmptyText } from 'utils/validate';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import {
  FieldText,
  FieldSelect,
  FieldDate,
  FieldRadios,
} from 'components/Form';

const validate = (values) => {
  const errors = {};

  if (true) {
    errors.firstName = "yup...";
  }

  return errors;
};


const Buttons = styled.div`
  margin: 25px 0;
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <FieldText
          required
          label={'Example Text'}
          name={'text'}
          placeholder={'Placeholder...'}
        />

        <FieldText
          required
          multiline
          label={'Example Textarea'}
          name={'textArea'}
          placeholder={'Placeholder...'}
          onChange={(val, x) => console.log(val, x)}
        />

        <FieldText
          required
          disabled
          label={'Example Disabled Text'}
          name={'textDisabled'}
          placeholder={'Placeholder...'}
        />

        <FieldSelect
          required
          options={
            [
              { key: 'N/A', text: 'Does Not Apply' },
              { key: 'Under', text: 'Under' },
              { key: 'Over', text: 'Over' },
            ]
          }
          label={'Example Select'}
          name={'select'}
          placeholder={'Placeholder...'}
          onChange={() => console.log('changin..')}
          onBlur={() => console.log('blurring...')}
        />

        <FieldSelect
          required
          disabled
          options={
            [
              { key: 'N/A', text: 'Does Not Apply' },
              { key: 'Under', text: 'Under' },
              { key: 'Over', text: 'Over' },
            ]
          }
          label={'Example Disabled Select'}
          name={'selectDisabled'}
          placeholder={'Placeholder...'}
        />

        <FieldDate
          required
          label={'Example Date'}
          name={'date'}
          placeholder={'Placeholder...'}
        />

        <FieldDate
          required
          disabled
          label={'Example Disabled Date'}
          name={'dateDisabled'}
          placeholder={'Placeholder...'}
        />

        <FieldRadios
          required
          options={
            [
              { key: 'N/A', text: 'Does Not Apply' },
              { key: 'Under', text: 'Under' },
              { key: 'Over', text: 'Over' },
            ]
          }
          label={'Example Radios'}
          name={'radios'}
        />

        <FieldRadios
          required
          disabled
          options={
            [
              { key: 'N/A', text: 'Does Not Apply' },
              { key: 'Under', text: 'Under' },
              { key: 'Over', text: 'Over' },
            ]
          }
          label={'Example Disabled Radios'}
          name={'radiosDisabled'}
        />

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

    </form>
    );
  }
}

DemoForm.propTypes = {
  // onExampleDataRequest: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  // exampleData: PropTypes.object,
  // app: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // demoHome: makeSelectDemoHome(),
  // exampleData: makeSelectExampleData(),
  // user: makeSelectUser(),
  // app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    // onExampleDataRequest: () => dispatch(exampleDataRequest()),
  };
}

const withForm = reduxForm({ form: 'demo' });
// const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withForm,
  // withConnect,
)(DemoForm);
