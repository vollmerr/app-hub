import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styled from 'styled-components';

import mapped, { newAckForm } from 'containers/Spa/mapped';
import appPage from 'containers/App-Container/appPage';
import { Form, FormButtons } from 'components/Form';
import theme from 'utils/theme';


const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
`;

// min-width = xs breakpoint - 2 * 15px margin (Content) - 2 * 15px padding (Form) - 15px margin (Form)
const FieldSection = styled.div`
  flex: 50%;
  padding-right: 15px;
  min-width: calc(${theme.breakpoints.xs}px - 75px);
`;


function mapSection(section) {
  return (
    <FieldSection>
      {
        section.map((name) => {
          const { component: C, ...props } = mapped[name];

          return (
            <C {...props} key={name} />
          );
        })
      }
    </FieldSection>
  );
}


/**
 * Form for new acknowledgments, available only to admins
 */
export class NewAckForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, onSubmit } = this.props;

    return (
      // pass custom onSubmit to redux-forms handleSubmit.
      <Form onSubmit={handleSubmit(onSubmit)} margin={theme.app.subNavHeight}>
        <h3>{newAckForm.title}</h3>

        <Fields>
          {mapSection(newAckForm.sections.left)}
          {mapSection(newAckForm.sections.right)}
        </Fields>

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
  onSubmit: func.isRequired,
};

const withForm = reduxForm({
  form: 'spaAdmin',
});

const withAppPage = appPage(NewAckForm);

export default compose(
  withForm,
)(withAppPage);
