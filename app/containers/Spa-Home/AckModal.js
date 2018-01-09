import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Form } from 'react-final-form';

import { FieldChecks } from 'components/Form';
import { ACK } from 'containers/Spa/constants';
import { isEmptyChecks } from 'utils/validate';


export const FieldChecksTop = styled(FieldChecks) `
  .ms-Checkbox-checkbox {
    margin-top: 4px;
    align-self: flex-start;
  }
`;


/**
 * Modal for reading and acknowledging a policy
 */
export class AckModal extends React.PureComponent {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  }

  renderForm = ({ handleSubmit, values }) => {
    const {
      item,
      onSubmit,
      onRead,
      hasRead,
    } = this.props;

    const checkboxProps = {
      name: 'hasAck',
      disabled: !hasRead,
      options: [
        { key: 'ack', text: item[ACK.STATEMENT] },
      ],
    };

    const primaryButtonProps = {
      onClick: hasRead ? onSubmit : onRead,
      text: hasRead ? 'Submit' : 'Download',
      disabled: hasRead && isEmptyChecks(values.hasAck),
    };

    const cancelButtonProps = {
      onClick: this.handleClose,
      text: 'Cancel',
    };

    return (
      <form onSubmit={handleSubmit} noValidate>
        <FieldChecksTop {...checkboxProps} />

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
      hasRead,
      onSubmit,
      hideModal,
    } = this.props;

    const dialogProps = {
      hidden: hideModal,
      onDismiss: this.handleClose,
      dialogContentProps: {
        type: DialogType.largeHeader,
        title: item[ACK.TITLE],
        subText: item[ACK.DETAILS],
      },
    };

    const formProps = {
      hasRead,
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


const { bool, func, string, shape } = PropTypes;

AckModal.propTypes = {
  item: shape({
    name: string,
    details: string,
  }).isRequired,
  onSubmit: func.isRequired,
  onRead: func.isRequired,
  onClose: func.isRequired,
  hasRead: bool.isRequired,
  hideModal: bool.isRequired,
};

export default AckModal;
