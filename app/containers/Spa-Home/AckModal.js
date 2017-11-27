import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { ACK } from 'containers/Spa/constants';

/**
 * Modal for reading and acknowledging a policy
 */
class AckModal extends React.PureComponent {
  render() {
    const {
      item,
      onAck,
      onRead,
      onClose,
      hasRead,
      hideModal,
    } = this.props;

    const dialogProps = {
      hidden: hideModal,
      onDismiss: onClose,
      dialogContentProps: {
        type: DialogType.largeHeader,
        title: item[ACK.TITLE],
        subText: item[ACK.DETAILS],
      },
    };

    const primaryButtonProps = {
      onClick: hasRead ? onAck : onRead,
      text: hasRead ? 'Confirm' : 'Read',
    };

    const cancelButtonProps = {
      onClick: onClose,
      text: 'Cancel',
    };

    return (
      <Dialog {...dialogProps}>
        <p>{item[ACK.STATEMENT]}</p>
        <DialogFooter>
          <PrimaryButton {...primaryButtonProps} />
          <DefaultButton {...cancelButtonProps} />
        </DialogFooter>
      </Dialog>
    );
  }
}


const { bool, func, string, shape } = PropTypes;

AckModal.propTypes = {
  item: shape({
    name: string,
    details: string,
  }),
  onAck: func,
  onRead: func,
  onClose: func,
  hasRead: bool,
  hideModal: bool,
};

export default AckModal;
