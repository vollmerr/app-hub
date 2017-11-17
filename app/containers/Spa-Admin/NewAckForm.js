import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import appPage from 'containers/App-Container/appPage';
import { Form, FormButtons } from 'components/Form';
import theme from 'utils/theme';

import fields from './fields';


/**
 * Form for new acknowledgments, available only to admins
 */
export class NewAckForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    /* istanbul ignore next: TODO: submit to api... */
    const onSubmit = (vals) => alert(JSON.stringify(vals.toJS(), null, 2));

    return (
      // pass custom onSubmit to redux-forms handleSubmit.
      <Form onSubmit={handleSubmit(onSubmit)} margin={theme.app.subNavHeight}>
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

        <FormButtons>
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
        </FormButtons>
      </Form>
    );
  }
}


const { func, bool } = PropTypes;

NewAckForm.propTypes = {
  handleSubmit: func.isRequired,
  reset: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
};

const withForm = reduxForm({
  form: 'spaAdmin',
});

const withAppPage = appPage(NewAckForm);

export default compose(
  withForm,
)(withAppPage);
