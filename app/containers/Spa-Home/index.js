import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';

import { getUserPendingAcks, getUserPreviousAcks, getUserCached } from 'containers/Spa/selectors';
import { getUserDataRequest } from 'containers/Spa/actions';
import { userPendingColumns, userPreviousColumns } from 'containers/Spa/columns';

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

  componentDidMount() {
    const { userCached, onGetUserDataRequest } = this.props;

    if (!userCached) {
      onGetUserDataRequest();
    }
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
  handleSubmitAck = () => {
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
    const { userPendingAcks, userPreviousAcks, Loading } = this.props;
    const { selectedItem, hasRead, hideModal } = this.state;

    if (Loading) {
      return Loading;
    }

    const pendingAckProps = {
      items: userPendingAcks.toJS(),
      columns: userPendingColumns,
      title: 'Pending Acknowledgment',
      empty: {
        message: 'No Acknowledgments Pending Approval',
      },
      selection: this.selectionActive,
      selectionMode: SelectionMode.none,
    };
    const previousAckProps = {
      items: userPreviousAcks.toJS(),
      columns: userPreviousColumns,
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
      onSubmit: this.handleSubmitAck,
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


const { object, node, func, bool } = PropTypes;

SpaHome.propTypes = {
  userCached: bool.isRequired,
  userPendingAcks: object.isRequired,
  userPreviousAcks: object.isRequired,
  onGetUserDataRequest: func.isRequired,
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  userCached: getUserCached(),
  userPendingAcks: getUserPendingAcks(),
  userPreviousAcks: getUserPreviousAcks(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetUserDataRequest: () => dispatch(getUserDataRequest()),
});

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
