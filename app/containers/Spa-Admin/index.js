import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import ListSection from 'components/List/ListSection';
import { makeSelectPendingAcks } from 'containers/Spa/selectors';
import List from 'components/List';

import AdminNav from './AdminNav';
import NewAckForm from './NewAckForm';
import DisableModal from './DisableModal';

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

const fullHeight = {
  margin: 70, // height of nav (40) + section margin (15*2)
};

/**
 * Admin page of SPA
 *
 * Contains list of acknowledgments with the ability
 * to add new and disable existing.
 */
export class SpaAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideModal: true,
      hideNewAck: true,
      selectedItem: {},
    };
    this.selection = new Selection({
      onSelectionChanged: () => this.handleSelectItem(),
    });
  }

  /**
   * Generates the items for the admin navigation menu
   */
  navItems = () => {
    const { selectedItem, hideNewAck } = this.state;
    const items = [];

    if (hideNewAck) {
      // add `New` button
      items.push(
        {
          key: 'new',
          name: 'New',
          icon: 'plus',
          ariaLabel: 'Add New Acknowledgment',
          onClick: this.handleNew,
        },
      );

      // item selected, add `Disable` button
      if (selectedItem.id) {
        items.push(
          {
            key: 'disable',
            name: 'Disable',
            icon: 'Clear',
            ariaLabel: 'Disable Exisiting Acknowledgment',
            onClick: this.handleDisable,
          }
        );
      }
    } else {
      // creating new acknowledgment, add `Back` button
      items.push(
        {
          key: 'back',
          name: 'Back',
          icon: 'navBack',
          ariaLabel: 'Back to Admin Page',
          onClick: this.handleNewHide,
        },
      );
    }

    return items;
  }

  /**
   * Handles opening the form for creating a new acknowledgment
   */
  handleNew = () => {
    console.log('new ack...');
    this.setState({ hideNewAck: false });
  }

  /**
   * Handles hiding the new acknowledgment form
   */
  handleNewHide = () => {
    console.log('hiding new ack...');
    this.setState({ hideNewAck: true });
  }

  /**
   * Handles disabling an exisiting acknowledgment
   */
  handleDisable = () => {
    console.log('disabling...');
    this.setState({ hideModal: false });
  }

  /**
   * Handles confirming when disabling an acknowledgment
   */
  handleDisableConfirm = () => {
    console.log('confirming disabling...');
    this.handleDisableHide();
  }

  /**
   * Handles canceling when disabling an acknowledgment
   */
  handleDisableHide = () => {
    console.log('canceling disabling...');
    this.setState({ hideModal: true });
  }

  /**
   * Handles selecting an items from the list
   */
  handleSelectItem = () => {
    const count = this.selection.getSelectedCount();

    let item = {};
    if (count) {
      item = this.selection.getSelection()[0];
    }

    console.log('items selected: ', item);
    this.setState({ selectedItem: item });
  }

  // /**
  //  * Handles opening the modal for new
  //  */
  // handleOpenModal = (item) => {
  //   this.setState({
  //     hideModal: false,
  //     selectedItem: item,
  //   });
  // }

  // /**
  //  * Handles closing the modal
  //  */
  // handleCloseModal = () => {
  //   this.setState({
  //     hideModal: true,
  //   });
  // }

  render() {
    const { pendingAcks } = this.props;
    const { selectedItem, hideModal, hideNewAck } = this.state;

    const pendingAckProps = {
      items: [],
      columns,
      title: 'Acknowledgments',
      empty: {
        message: 'No Acknowledgments',
        onClick: this.handleNew,
        buttonText: 'Create New',
        buttonIcon: 'plus',
      },
      selection: this.selection,
      selectionMode: SelectionMode.single,
    };

    const modalProps = {
      hideModal,
      item: selectedItem,
      onClose: this.handleDisableHide,
      onConfirm: this.handleDisableConfirm,
    };

    const newAckProps = {};

    return (
      <div>
        <AdminNav
          isSearchBoxVisible={false}
          items={this.navItems()}
        />

        {
          hideNewAck ?
            <ListSection {...fullHeight}>
              <List {...pendingAckProps} />
              <DisableModal {...modalProps} />
            </ListSection> :
            <NewAckForm {...newAckProps} />
        }
      </div>
    );
  }
}


const { shape, arrayOf, string } = PropTypes;

SpaAdmin.propTypes = {
  pendingAcks: arrayOf(
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
  // previousAcks: makeSelectPreviousAcks(),
});

const mapDispatchToProps = () => ({});

const withAppPage = appPage(SpaAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
