import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { ACK } from 'containers/Spa/constants';

/**
 * Modal for confirming that a acknowledgment should be disabled
 */
class DisableModal extends React.PureComponent {
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
        type: DialogType.normal,
        title: item[ACK.TITLE],
        subText: item[ACK.DETAILS],
      },
    };

    const primaryButtonProps = {
      onClick: onSubmit,
      text: 'Confirm',
    };

    const cancelButtonProps = {
      onClick: onClose,
      text: 'Cancel',
    };

    const warningText = `Are you sure you want to disable ${item[ACK.TITLE]}?`;

    return (
      <Dialog {...dialogProps}>
        <p>{warningText}</p>
        <DialogFooter>
          <PrimaryButton {...primaryButtonProps} />
          <DefaultButton {...cancelButtonProps} />
        </DialogFooter>
      </Dialog>
    );
  }
}


const { bool, func, string, shape } = PropTypes;

DisableModal.propTypes = {
  item: shape({
    name: string,
    details: string,
  }),
  onSubmit: func,
  onClose: func,
  hidden: bool,
};

export default DisableModal;
