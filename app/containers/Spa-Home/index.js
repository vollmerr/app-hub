import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import ListSection from 'components/List/ListSection';
import { makeSelectPendingAcks, makeSelectPreviousAcks } from 'containers/Spa/selectors';
import List, { handleSelectItem } from 'components/List';
import { homePendingColumns, homePreviousColumns } from 'containers/Spa/mapped';

import AckModal from './AckModal';

const halfHeight = {
  vh: 50,
};


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

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleOpenModal),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleDownloadFile),
    });
  }

  /**
   * Handles downloading a file for reading
   */
  handleDownloadFile = () => {
    // TODO
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
    this.handleCloseModal();
  }

  /**
   * Handles opening the modal / resetting its state
   */
  handleOpenModal = () => {
    this.setState({
      hasRead: false,
      hideModal: false,
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
      items: pendingAcks.toJS(),
      columns: homePendingColumns,
      title: 'Pending Acknowledgment',
      empty: {
        message: 'No Acknowledgments Pending Approval',
      },
      selection: this.selectionActive,
      selectionMode: SelectionMode.none,
    };

    const previousAckProps = {
      items: previousAcks.toJS(),
      columns: homePreviousColumns,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      selection: this.selectionPrev,
      selectionMode: SelectionMode.none,
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
        <ListSection {...halfHeight}>
          <List {...pendingAckProps} />
        </ListSection>

        <ListSection {...halfHeight}>
          <List {...previousAckProps} />
        </ListSection>

        <AckModal {...modalProps} />
      </div>
    );
  }
}


const { object } = PropTypes;

SpaHome.propTypes = {
  pendingAcks: object.isRequired,
  previousAcks: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pendingAcks: makeSelectPendingAcks(),
  previousAcks: makeSelectPreviousAcks(),
});

const mapDispatchToProps = () => ({});

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
