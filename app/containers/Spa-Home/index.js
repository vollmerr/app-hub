import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import { doneLoading, downloadFile } from 'utils/request';
import { ACK, TARGET_GROUPS, STATUS_CODES } from 'containers/Spa/constants';
import appPage from 'containers/App-Container/appPage';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';

import { getUserPendingAcks, getUserPreviousAcks, getUserCached } from 'containers/Spa/selectors';
import { getUserDataRequest, readAckRequest } from 'containers/Spa/actions';
import { homeColumns } from 'containers/Spa/data';

import AckModal from './AckModal';

const halfHeight = {
  vh: 50,
  margin: -2,
};

// TODO: PULL ENUMS FROM API!
const enums = {
  [ACK.TARGET_GROUPS]: TARGET_GROUPS,
  [ACK.STATUS]: STATUS_CODES,
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
    const { userPendingAcks, userPreviousAcks, Loading, formValues } = this.props;
    const { selectedItem, hasRead, hideModal } = this.state;

    if (Loading) {
      return Loading;
    }

    const pendingAckProps = {
      enums,
      items: userPendingAcks.toJS(),
      columns: homeColumns.pending,
      title: 'Pending Acknowledgment',
      empty: {
        message: 'No Acknowledgments Pending Approval',
      },
      selection: this.selectionActive,
      selectionMode: SelectionMode.none,
    };
    const previousAckProps = {
      enums,
      items: userPreviousAcks.toJS(),
      columns: homeColumns.previous,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      selection: this.selectionPrev,
      selectionMode: SelectionMode.none,
    };

    /* istanbul ignore next */
    const modalProps = {
      hasRead,
      hasAck: Boolean(formValues && formValues.get('hasAck').size),
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
  formValues: object,
};

const mapStateToProps = createStructuredSelector({
  userCached: getUserCached(),
  userPendingAcks: getUserPendingAcks(),
  userPreviousAcks: getUserPreviousAcks(),
  formValues: getFormValues('spaHome'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetUserDataRequest: () => dispatch(getUserDataRequest()),
  onReadAckRequest: (item) => dispatch(readAckRequest(item)),
});

const withAppPage = appPage(SpaHome);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
