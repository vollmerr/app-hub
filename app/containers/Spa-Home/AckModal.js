import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { FieldChecks } from 'components/Form';
import { ACK } from 'containers/Spa/constants';

/**
 * Modal for reading and acknowledging a policy
 */
export class AckModal extends React.PureComponent {
  handleClose = () => {
    const { reset, onClose } = this.props;
    // reset the form when closing then call the close passed
    // for some reason will not work if called in parent...
    reset();
    onClose();
  }

  render() {
    const {
      item,
      onSubmit,
      onRead,
      hasAck,
      hasRead,
      hideModal,
      handleSubmit,
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
      disabled: hasRead && !hasAck,
    };

    const cancelButtonProps = {
      onClick: this.handleClose,
      text: 'Cancel',
    };

    return (
      <Dialog {...dialogProps}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldChecks {...checkboxProps} />

          <DialogFooter>
            <PrimaryButton {...primaryButtonProps} />
            <DefaultButton {...cancelButtonProps} />
          </DialogFooter>
        </form>
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
  reset: func.isRequired,
  onSubmit: func.isRequired,
  onRead: func.isRequired,
  onClose: func.isRequired,
  hasAck: bool,
  hasRead: bool.isRequired,
  hideModal: bool.isRequired,
  handleSubmit: func.isRequired,
};

export default reduxForm({
  form: 'spaHome',
})(AckModal);
