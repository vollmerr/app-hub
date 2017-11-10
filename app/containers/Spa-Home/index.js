import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import { makeSelectPendingAcks, makeSelectPreviousAcks } from 'containers/Spa/selectors';
import List from 'components/List';

import AckModal from './AckModal';
import AckSection from './AckSection';

const columns = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
  },
  {
    key: 'status',
    name: 'Status',
    fieldName: 'status',
  },
  {
    key: 'startDate',
    name: 'Start Date',
    fieldName: 'startDate',
  },
  {
    key: 'endDate',
    name: 'End Date',
    fieldName: 'endDate',
  },
];


/**
 * Home page of SPA
 *
 * Contains lists of user acknowledgments, seperated
 * into those that require action, those that do not.
 */
export class SpaHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasRead: false,
      hideModal: true,
      selectedItem: {},
    };
  }

  /**
   * Handles downloading a file for reading
   */
  handleDownloadFile = () => {
    // console.log('SpaHome.handleDownloadFile - downloading file.......');
  }

  /**
   * Handles marking that the policy has been read
   */
  handleRead = () => {
    this.setState({
      hasRead: true,
    });
    this.handleDownloadFile();
  }

  /**
   * Handles marking that the policy has been acknowledged
   */
  handleAck = () => {
    // console.log('SpaHome.handleAck - doing API stuffs...');
    this.handleCloseModal();
  }

  /**
   * Handles opening the modal / resetting its state
   */
  handleOpenModal = (item) => {
    this.setState({
      hasRead: false,
      hideModal: false,
      selectedItem: item,
    });
  }

  /**
   * Handles closing the modal
   */
  handleCloseModal = () => {
    this.setState({
      hideModal: true,
    });
  }

  render() {
    const { pendingAcks, previousAcks } = this.props;
    const { selectedItem, hasRead, hideModal } = this.state;

    const pendingAckProps = {
      items: pendingAcks,
      columns,
      title: 'Pending Acknowledgment',
      emptyMessage: 'No Acknowledgments Pending Approval',
      selectionMode: SelectionMode.none,
      onActiveItemChanged: this.handleOpenModal,
    };

    const previousAckProps = {
      items: previousAcks,
      columns,
      title: 'Previous Acknowledgments',
      emptyMessage: 'No Previous Acknowledgments',
      selectionMode: SelectionMode.none,
      onActiveItemChanged: this.handleDownloadFile,
    };

    const modalProps = {
      hasRead,
      hideModal,
      item: selectedItem,
      onClose: this.handleCloseModal,
      onRead: this.handleRead,
      onAck: this.handleAck,
    };

    return (
      <div>
        <AckSection>
          <List {...pendingAckProps} />
        </AckSection>

        <AckSection>
          <List {...previousAckProps} />
        </AckSection>

        <AckModal {...modalProps} />
      </div>
    );
  }
}


const { shape, arrayOf, string } = PropTypes;

SpaHome.propTypes = {
  pendingAcks: arrayOf(
    shape({
      name: string,
      status: string,
      startDate: string,
      endDate: string,
      dateRead: string,
    }),
  ),
  previousAcks: arrayOf(
    shape({
      name: string,
      status: string,
      startDate: string,
      endDate: string,
      dateRead: string,
    }),
  ),
};

const mapStateToProps = createStructuredSelector({
  pendingAcks: makeSelectPendingAcks(),
  previousAcks: makeSelectPreviousAcks(),
});

const mapDispatchToProps = () => ({});

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
