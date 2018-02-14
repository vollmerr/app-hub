import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from '../../../hocs/toJS';
import { downloadFile } from '../../../utils/data';
import { shouldFetch } from '../../../utils/api';
import Loading from '../../../components/Loading';
import List, { handleSelectItem } from '../../../components/List';

import * as hubSelectors from '../../AppHub/selectors';

import { homeColumns } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import AckModal from './AckModal';


const style = {
  count: 2,
};


/**
 * Home page of SPA
 *
 * Contains lists of user acknowledgments, seperated
 * into those that require action, those that do not.
 */
export class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  async componentDidMount() {
    const { user, onGetUserDataRequest } = this.props;
    // only load user data if not cached
    if (shouldFetch(user.lastFetched)) {
      await onGetUserDataRequest();
    }
    this.setState({ loading: false }); // eslint-disable-line
  }

  /**
   * Handles downloading a file for reading
   */
  handleDownloadFile = () => {
    const name = this.state.selectedItem[C.ACK.FILE_NAME];
    const content = this.state.selectedItem[C.ACK.FILE_CONTENT];
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
    this.handleCloseModal();
  }

  /**
   * Handles opening the modal / resetting its state
   */
  handleOpenModal = () => {
    const { selectedItem } = this.state;

    // if there is no file attached, same as already having downloaded it (hasRead)
    const hasRead = !(
      selectedItem[C.ACK.FILE_NAME] &&
      selectedItem[C.ACK.FILE_CONTENT]
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
    const { enums, userPendingItems, userPreviousItems, app } = this.props;
    const { loading, selectedItem, hasRead, hideModal } = this.state;

    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
        to: '/',
      };
      return <Loading {...loadingProps} />;
    }

    const pendingAckProps = {
      enums,
      style,
      items: userPendingItems,
      columns: homeColumns.pending,
      title: 'Pending Acknowledgments',
      empty: {
        message: 'No Acknowledgments Pending Approval',
      },
      selection: this.selectionActive,
    };

    const previousAckProps = {
      enums,
      style,
      items: userPreviousItems,
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
        <List {...pendingAckProps} />
        <List {...previousAckProps} />
        <AckModal {...modalProps} />
      </div>
    );
  }
}


const { object, func, array } = PropTypes;

Home.propTypes = {
  app: object.isRequired,
  user: object.isRequired, // eslint-disable-line
  enums: object.isRequired,
  userPendingItems: array.isRequired,
  userPreviousItems: array.isRequired,
  onGetUserDataRequest: func.isRequired, // eslint-disable-line
  onReadAckRequest: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  user: selectors.getUser,
  enums: selectors.getEnums,
  userPendingItems: selectors.getUserItems('recipientsPending'),
  userPreviousItems: selectors.getUserItems('recipientsPrevious'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetUserDataRequest: () => dispatch(actions.getUserDataRequest()),
  onReadAckRequest: (item) => dispatch(actions.readAckRequest(item)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(Home);
