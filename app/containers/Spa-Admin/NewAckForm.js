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

import appPage from 'containers/App-Container/appPage';
import theme from 'utils/theme';

import fields from './fields';


const Form = styled.form`
  min-height: calc(100vh - ${theme.hub.headerHeight} - ${theme.app.subNavHeight} - 30px);
  padding: 15px;
  margin: 15px 0;
  background: ${theme.white};
`;


const Buttons = styled.div`
  padding-top: 15px;

  * {
    transition: none;
  }
`;


export class NewAckForm extends React.PureComponent {
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
        <h3>{fields.title}</h3>
        {
          // go through each section in the form in order specified
          fields.allNames.map((name) => {
            const { component: C, ...props } = fields.byName[name];

            return (
              <C {...props} key={name} />
            );
          })
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


// const { func, bool, string } = PropTypes;

// DemoForm.propTypes = {
//   handleSubmit: func.isRequired,
//   reset: func.isRequired,
//   pristine: bool.isRequired,
//   submitting: bool.isRequired,
// };

const withForm = reduxForm({
  form: 'spaAdmin',
});

const withAppPage = appPage(NewAckForm);

export default compose(
  withForm,
)(withAppPage);
