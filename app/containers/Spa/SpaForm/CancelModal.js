import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { ACK } from '../constants';


export const Warning = styled.p`
  font-weight: bold;
`;


/**
 * Modal for canceling an acknowledgment.
 */
class CancelModal extends React.PureComponent {
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

    const warningText = `WARNING: There is no going back! Are you sure you want to cancel ${item[ACK.TITLE]}?`;

    return (
      <Dialog {...dialogProps}>
        <Warning>{warningText}</Warning>
        <DialogFooter>
          <PrimaryButton {...primaryButtonProps} />
          <DefaultButton {...cancelButtonProps} />
        </DialogFooter>
      </Dialog>
    );
  }
}


const { bool, func, string, shape } = PropTypes;

CancelModal.propTypes = {
  item: shape({
    name: string,
    details: string,
  }),
  onSubmit: func,
  onClose: func,
  hidden: bool,
};


export default CancelModal;
