import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from 'hocs/toJS';
import { doneLoading, downloadFile } from 'utils/request';
import { ACK } from 'containers/Spa/constants';
import appPage from 'containers/App-Container/appPage';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';

import * as selectors from 'containers/Spa/selectors';
import { getUserDataRequest, readAckRequest } from 'containers/Spa/actions';
import { homeColumns } from 'containers/Spa/data';

import AckModal from './AckModal';

const halfHeight = {
  vh: 50,
  margin: -2,
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
    const { userIsCached, onGetUserDataRequest } = this.props;

    if (!userIsCached) {
      onGetUserDataRequest();
    }
  }

  /**
   * Handles downloading a file for reading
   */
  handleDownloadFile = () => {
    const name = this.state[ACK.FILE_NAME];
    const content = this.state[ACK.FILE_CONTENT];
    downloadFile(content, name);
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
  handleSubmitAck = async () => {
    const { onReadAckRequest } = this.props;
    const { selectedItem } = this.state;

    await onReadAckRequest(selectedItem);
    await doneLoading(this, this.handleCloseModal);
  }

  /**
   * Handles opening the modal / resetting its state
   */
  handleOpenModal = () => {
    const { selectedItem } = this.state;

    // if there is no file attached, same as already having downloaded it (hasRead)
    const hasRead = !(
      selectedItem[ACK.FILE_NAME] &&
      selectedItem[ACK.FILE_CONTENT]
    );

    this.setState({
      hasRead,
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
    const { enums, userPendingList, userPreviousList, Loading } = this.props;
    const { selectedItem, hasRead, hideModal } = this.state;

    if (Loading) {
      return Loading;
    }

    const pendingAckProps = {
      enums,
      items: userPendingList,
      columns: homeColumns.pending,
      title: 'Pending Acknowledgment',
      empty: {
        message: 'No Acknowledgments Pending Approval',
      },
      selection: this.selectionActive,
    };
    const previousAckProps = {
      enums,
      items: userPreviousList,
      columns: homeColumns.previous,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      selection: this.selectionPrev,
    };

    /* istanbul ignore next */
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


const { object, node, func, bool, array } = PropTypes;

SpaHome.propTypes = {
  enums: object.isRequired,
  userIsCached: bool.isRequired,
  userPendingList: array.isRequired,
  userPreviousList: array.isRequired,
  onGetUserDataRequest: func.isRequired,
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  enums: selectors.getEnums(),
  userIsCached: selectors.getUserIsCached(),
  userPendingList: selectors.getUserPendingList(),
  userPreviousList: selectors.getUserPreviousList(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetUserDataRequest: () => dispatch(getUserDataRequest()),
  onReadAckRequest: (item) => dispatch(readAckRequest(item)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  appPage,
  toJS,
)(SpaHome);
