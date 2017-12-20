import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import { ACK, RECIPIENT, EMAIL } from 'containers/Spa/constants';
import { FieldRadios, FieldText } from 'components/Form';


export const Warning = styled.p`
  font-weight: bold;
`;


/**
 * Modal for entering a messgae to email recipients
 */
export class EmailModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: EMAIL.PENDING,
      recipients: {
        [EMAIL.ALL]: [],
        [EMAIL.PENDING]: [],
        [EMAIL.PREVIOUS]: [],
      },
    };
  }

  componentDidMount() {
    if (this.props.recipients.length) {
      this.mapData();
    }
  }

  componentDidUpdate(prevProps) {
    const { recipients } = this.props;
    // need to wait until recipients gets populated
    if (recipients.length !== prevProps.recipients.length) {
      // then map the data
      this.mapData();
    }
  }

  mapData() {
    const { recipients } = this.props;
    const pending = [];
    const previous = [];

    recipients.forEach((recipient) => {
      if (recipient[RECIPIENT.ACK_DATE]) {
        previous.push(recipient);
      } else {
        pending.push(recipient);
      }
    });

    this.setState({
      recipients: {
        [EMAIL.ALL]: recipients,
        [EMAIL.PENDING]: pending,
        [EMAIL.PREVIOUS]: previous,
      },
    });
  }

  handleSelectKey = (event, selectedKey) => {
    this.setState({ selectedKey });
  }

  render() {
    const {
      item,
      hidden,
      onClose,
      onSubmit,
      handleSubmit,
    } = this.props;

    const { selectedKey, recipients } = this.state;

    const dialogProps = {
      hidden,
      onDismiss: onClose,
      dialogContentProps: {
        type: DialogType.largeHeader,
        title: item[ACK.TITLE],
        subText: 'Send an email to the following recipients',
      },
    };

    const recipientsProps = {
      name: 'recipients',
      label: 'Recipients',
      options: [
        { key: EMAIL.ALL, text: 'All Recipients' },
        { key: EMAIL.PENDING, text: 'Pending Acknowledment' },
        { key: EMAIL.PREVIOUS, text: 'Previously Acknowledged' },
      ],
      onChange: this.handleSelectKey,
    };

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

    const recipientCount = recipients[selectedKey].length;
    const warningText = `WARNING: This email will be sent to ${recipientCount} people.`;

    return (
      <Dialog {...dialogProps}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldRadios {...recipientsProps} />
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
  handleSubmit: func.isRequired,
};

export default reduxForm({
  form: 'spaAdmin',
  initialValues: {
    recipients: EMAIL.PENDING,
  },
})(EmailModal);
