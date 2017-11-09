import React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

export class AckModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasRead: false,
    };
  }

  handleReading = () => this.setState({ hasRead: true });

  handleSubmit = () => {
    const { onClose } = this.props;
    this.setState({ hasRead: false });
    alert('handling submit...');
    onClose();
  }

  render() {
    const {
      item,
      onAck,
      onRead,
      onClose,
      hasRead,
      hideModal,
    } = this.props;

    const { name, details } = item;

    const dialogProps = {
      hidden: hideModal,
      onDismiss: onClose,
      dialogContentProps: {
        type: DialogType.largeHeader,
        title: name,
        subText: details,
      },
    };

    const primaryButtonProps = {
      onClick: hasRead ? onAck : onRead,
      text: hasRead ? 'Confirm' : 'Read',
    };

    return (
      <Dialog {...dialogProps}>
        <p>Please read and acknowledge ... etc</p>
        <DialogFooter>
          <PrimaryButton {...primaryButtonProps} />
          <DefaultButton onClick={onClose} text={'Cancel'} />
        </DialogFooter>
      </Dialog>
    );
  }
}

export default AckModal;
