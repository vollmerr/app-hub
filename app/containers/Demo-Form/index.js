/* eslint-disable */
import React from 'react';
import { toJS } from 'immutable'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { isEmptyText } from 'utils/validate';

import { FieldText } from 'components/Form';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

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
          label={'First Name'}
          name="firstName"
          placeholder="First Name Placeholder"
        />

      <div>
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
      </div>
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
