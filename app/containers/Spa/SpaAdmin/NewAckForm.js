// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Form } from 'react-final-form';
// import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// import { FormSection, FormButtons } from '../../../components/Form';
// import theme from '../../../utils/theme';

// import validate from './validate';


// export const Title = styled.h3`
//   margin: 0;
// `;


// export const Fields = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin: ${theme.hub.padding}px -${theme.hub.padding}px 0 0;
// `;


// export const FieldSection = styled.div`
//   flex: 100%;
//   padding-right: ${theme.hub.padding}px;
//   @media (min-width: ${theme.breakpoints.md}px) {
//     flex: 50%;
//   }
// `;


// function mapSection(fields, section) {
//   return (
//     <FieldSection>
//       {
//         section.map((name) => {
//           const { component: C, ...props } = fields[name];

//           return (
//             <C {...props} key={name} />
//           );
//         })
//       }
//     </FieldSection>
//   );
// }


// const style = {
//   padding: theme.hub.padding + theme.app.commandBarHeight,
// };


// /**
//  * Form for new acknowledgments, available only to admins
//  */
// export class NewAckForm extends React.PureComponent {
//   renderForm = ({
//     reset,
//     valid,
//     values,
//     pristine,
//     submitting,
//     handleSubmit,
//   }) => {
//     const {
//       title,
//       fields,
//       sections,
//       onSave,
//     } = this.props;

//     const formProps = {
//       onSubmit: handleSubmit,
//       ...style,
//     };

//     const buttonProps = {
//       reset,
//       disabled: pristine || submitting,
//     };

//     const saveButtonProps = {
//       text: 'Save Draft',
//       type: 'submit',
//       onClick: valid ? onSave(values) : handleSubmit,
//       disabled: pristine || submitting,
//     };

//     return (
//       <FormSection {...formProps}>
//         <Title>{title}</Title>

//         <Fields>
//           {mapSection(fields, sections.left)}
//           {mapSection(fields, sections.right)}
//         </Fields>

//         <FormButtons {...buttonProps}>
//           <DefaultButton {...saveButtonProps} />
//         </FormButtons>
//       </FormSection>
//     );
//   }

//   render() {
//     const { onSubmit, initialValues } = this.props;

//     const formProps = {
//       onSubmit,
//       validate,
//       initialValues,
//       render: this.renderForm,
//     };

//     return <Form {...formProps} />;
//   }
// }


// const { func, string, object } = PropTypes;

// NewAckForm.propTypes = {
//   title: string.isRequired,
//   fields: object.isRequired,
//   sections: object.isRequired,
//   onSubmit: func.isRequired,
//   onSave: func.isRequired,
//   initialValues: object,
// };


// export default NewAckForm;
