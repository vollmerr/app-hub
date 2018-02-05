import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Form } from 'react-final-form';

import { FieldText } from '../../../components/Form';

import { ACK } from '../constants';


export const Warning = styled.p`
  font-weight: bold;
`;


/**
 * Modal for entering a messgae to email recipients
 */
export class EmailModal extends React.PureComponent {
  renderForm = ({ handleSubmit }) => {
    const {
      onClose,
      onSubmit,
    } = this.props;

    const { recipients } = this.props;

    const messageProps = {
      multiline: true,
      required: true,
      label: 'Email Message',
      name: 'message',
      placeholder: 'Enter email message...',
    };

    const primaryButtonProps = {
      onClick: onSubmit,
      text: 'Send',
    };

    const cancelButtonProps = {
      onClick: onClose,
      text: 'Cancel',
    };

    const recipientCount = recipients.length;
    const warningText = `WARNING: This email will be sent to ${recipientCount} people.`;


    return (
      <form onSubmit={handleSubmit} noValidate>
        <FieldText {...messageProps} />

        {
          recipientCount > 10 &&
          <Warning>{warningText}</Warning>
        }

        <DialogFooter>
          <PrimaryButton {...primaryButtonProps} />
          <DefaultButton {...cancelButtonProps} />
        </DialogFooter>
      </form>
    );
  }

  render() {
    const {
      item,
      hidden,
      onClose,
      onSubmit,
    } = this.props;

    const dialogProps = {
      hidden,
      onDismiss: onClose,
      dialogContentProps: {
        type: DialogType.largeHeader,
        title: item[ACK.TITLE],
        subText: 'Send an email to all pending recipients for this policy.',
      },
    };

    const formProps = {
      onSubmit,
      render: this.renderForm,
    };

    return (
      <Dialog {...dialogProps}>
        <Form {...formProps} />
      </Dialog>
    );
  }
}


const { bool, func, string, shape, any } = PropTypes;

EmailModal.propTypes = {
  item: shape({
    name: string,
    details: string,
  }),
  recipients: any,
  onSubmit: func,
  onClose: func,
  hidden: bool,
};


export default EmailModal;
