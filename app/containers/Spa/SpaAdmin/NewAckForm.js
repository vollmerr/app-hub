import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'react-final-form';

import { FormSection, FormButtons } from '../../../components/Form';
import theme from '../../../utils/theme';

import validate from './validate';


export const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
`;


// min-width = xs breakpoint - 2 * 15px margin (Content) - 2 * 15px padding (Form) - 15px margin (Form)
export const FieldSection = styled.div`
  flex: 100%;
  padding-right:15px;
  @media (min-width: ${theme.breakpoints.md}px) {
    flex: 50%;
  }
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


const style = {
  padding: theme.hub.padding + theme.app.commandBarHeight,
};


/**
 * Form for new acknowledgments, available only to admins
 */
export class NewAckForm extends React.PureComponent {
  renderForm = ({
    reset,
    pristine,
    submitting,
    handleSubmit,
  }) => {
    const {
      title,
      fields,
      sections,
    } = this.props;

    const formProps = {
      onSubmit: handleSubmit,
      ...style,
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <FormSection {...formProps}>
        <h3>{title}</h3>

        <Fields>
          {mapSection(fields, sections.left)}
          {mapSection(fields, sections.right)}
        </Fields>

        <FormButtons {...buttonProps} />
      </FormSection>
    );
  }

  render() {
    const { onSubmit } = this.props;

    const formProps = {
      onSubmit,
      validate,
      render: this.renderForm,
    };

    return <Form {...formProps} />;
  }
}


const { func, string, object } = PropTypes;

NewAckForm.propTypes = {
  title: string.isRequired,
  fields: object.isRequired,
  sections: object.isRequired,
  onSubmit: func.isRequired,
};


export default NewAckForm;
