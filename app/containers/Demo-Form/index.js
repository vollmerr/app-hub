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

const validate = (values) => {
  const errors = {};

  if (true) {
    errors.firstName = "yup...";
  }

  return errors;
};

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 15px 0;
`;

const Col = styled.div`
  flex: 30%;
  min-width: ${theme.breakpoints.xs}px;
  padding: 15px;
  margin: 5px;
  background: ${theme.white};
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
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Col>
            <h3>Text</h3>
            <FieldText
              label={'Example Text'}
              name={'text'}
              placeholder={'Placeholder...'}
            />

            <FieldText
              required
              label={'Example Required Text'}
              name={'textRequired'}
              placeholder={'Placeholder...'}
            />

            <FieldText
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
          </Col>

          <Col>
            <h3>Select / Dropdown</h3>
            <FieldSelect
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
              options={
                [
                  { key: 'N/A', text: 'Does Not Apply' },
                  { key: 'Under', text: 'Under' },
                  { key: 'Over', text: 'Over' },
                ]
              }
              label={'Example Required Select'}
              name={'selectRequired'}
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
        </Col>

        <Col>
        <h3>Date Picker</h3>
          <FieldDate
            label={'Example Date'}
            name={'date'}
            placeholder={'Placeholder...'}
          />

          <FieldDate
            required
            label={'Example Required Date'}
            name={'dateRequired'}
            placeholder={'Placeholder...'}
          />

          <FieldDate
            required
            disabled
            label={'Example Disabled Date'}
            name={'dateDisabled'}
            placeholder={'Placeholder...'}
          />
        </Col>

        <Col>
          <h3>Radio Buttons</h3>
          <FieldRadios
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
            options={
              [
                { key: 'N/A', text: 'Does Not Apply' },
                { key: 'Under', text: 'Under' },
                { key: 'Over', text: 'Over' },
              ]
            }
            label={'Example Required Radios'}
            name={'radiosRequired'}
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
        </Col>

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
