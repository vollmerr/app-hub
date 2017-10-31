/* eslint-disable */
import React from 'react';
import { toJS } from 'immutable'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { isEmptyText } from 'utils/validate';

import { FieldText, FieldSelect, FieldDate } from 'components/Form';

const validate = (values) => {
  const errors = {};

  if (true) {
    errors.firstName = "yup...";
  }

  return errors;
};


export class DemoForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const onSubmit = (vals) => alert(JSON.stringify(vals.toJS(), null, 2));

    // if (error) {
    //   return <ErrorMessage error={error} to={'/demo'} />;
    // }

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

      {/* <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component={'input'}
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
            />{' '}
            Male
          </label>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div> */}
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
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
