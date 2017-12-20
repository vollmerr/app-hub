import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styled from 'styled-components';

import appPage from 'containers/App-Container/appPage';
import { Form, FormButtons } from 'components/Form';
import theme from 'utils/theme';

import validate from './validate';


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


function mapSection(fields, section) {
  return (
    <FieldSection>
      {
        section.map((name) => {
          const { component: C, ...props } = fields[name];

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
    const {
      title,
      fields,
      sections,
      handleSubmit,
      pristine,
      reset,
      submitting,
      onSubmit,
    } = this.props;

    return (
      // pass custom onSubmit to redux-forms handleSubmit.
      <Form onSubmit={handleSubmit(onSubmit)} margin={theme.app.subNavHeight}>
        <h3>{title}</h3>

        <Fields>
          {mapSection(fields, sections.left)}
          {mapSection(fields, sections.right)}
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


const { func, bool, string, object } = PropTypes;

NewAckForm.propTypes = {
  title: string.isRequired,
  fields: object.isRequired,
  sections: object.isRequired,
  handleSubmit: func.isRequired,
  reset: func.isRequired,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  onSubmit: func.isRequired,
};

const withAppPage = appPage(NewAckForm);

export default reduxForm({
  form: 'spaAdmin',
  validate,
})(withAppPage);
