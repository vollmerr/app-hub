import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';


/**
 * Modal for confirming that a acknowledgment should be disabled
 */
class DisableModal extends React.PureComponent {
  render() {
    const {
      item,
      hidden,
      onClose,
      onConfirm,
    } = this.props;

    const { name, details } = item;

    const dialogProps = {
      hidden,
      onDismiss: onClose,
      dialogContentProps: {
        type: DialogType.normal,
        title: name,
        subText: details,
      },
    };

    const primaryButtonProps = {
      onClick: onConfirm,
      text: 'Confirm',
    };

    const cancelButtonProps = {
      onClick: onClose,
      text: 'Cancel',
    };

    return (
      <Dialog {...dialogProps}>
        <p>Are you sure you want to disable ... etc</p>
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
  onConfirm: func,
  onClose: func,
  hidden: bool,
};

export default DisableModal;
