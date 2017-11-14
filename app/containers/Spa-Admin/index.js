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

const halfHeight = {
  vh: 50,
  margin: 18, // section margin (15) + 3 due to being in div (margin outside div)
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
      hideDisable: true,
      hideNewAck: true,
      selectedItem: {},
    };
    this.selection = new Selection({
      onSelectionChanged: () => this.handleSelectItem(),
    });
  }

  //
  // HELPER FUNCS
  //

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
          onClick: this.handleShowNew,
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
            onClick: this.handleShowDisable,
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
          onClick: this.handleHideNew,
        },
      );
    }

    return items;
  }

  /**
   * Handles selecting an item from the list
   */
  handleSelectItem = () => {
    const count = this.selection.getSelectedCount();

    let item = {};
    if (count) {
      item = this.selection.getSelection()[0];
    }

    this.setState({ selectedItem: item });
  }

  //
  // NEW ACKNOWLEDGMENTS
  //

  /**
   * Handles opening the form for creating a new acknowledgment
   */
  handleShowNew = () => {
    /* istanbul ignore next */ console.log('new ack...');  // eslint-disable-line
    this.setState({ hideNewAck: false });
  }

  /**
   * Handles hiding the new acknowledgment form
   */
  handleHideNew = () => {
    /* istanbul ignore next */ console.log('hiding new ack...');  // eslint-disable-line
    this.setState({ hideNewAck: true });
  }

  /**
   * Handles submitting the new acknowledgment form to api
   */
  handleSubmitNew = () => {
    /* istanbul ignore next */ console.log('submitting new ack to api...'); // eslint-disable-line
  }

  //
  // DISABLE ACKNOWLEDGMENTS
  //

  /**
   * Handles disabling an exisiting acknowledgment
   */
  handleShowDisable = () => {
    /* istanbul ignore next */ console.log('disabling...');  // eslint-disable-line
    this.setState({ hideDisable: false });
  }

  /**
   * Handles canceling when disabling an acknowledgment
   */
  handleHideDisable = () => {
    /* istanbul ignore next */ console.log('canceling disabling...');  // eslint-disable-line
    this.setState({ hideDisable: true });
  }

  /**
   * Handles confirming when disabling an acknowledgment
   */
  handleConfirmDisable = () => {
    /* istanbul ignore next */ console.log('confirming disabling...');  // eslint-disable-line
    this.handleHideDisable();
  }

  render() {
    const { pendingAcks } = this.props;
    const { selectedItem, hideDisable, hideNewAck } = this.state;

    const activeProps = {
      items: pendingAcks,
      columns,
      title: 'Active Acknowledgments',
      empty: {
        message: 'No Active Acknowledgments',
        onClick: this.handleShowNew,
        buttonText: 'Create New',
        buttonIcon: 'plus',
      },
      selection: this.selection,
      selectionMode: SelectionMode.single,
    };

    const previousProps = {
      items: pendingAcks,
      columns,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      // selection: this.selection,
      // selectionMode: SelectionMode.single,
    };

    const modalProps = {
      hidden: hideDisable,
      item: selectedItem,
      onClose: this.handleHideDisable,
      onConfirm: this.handleConfirmDisable,
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
            <div>
              <ListSection {...halfHeight}>
                <List {...activeProps} />
              </ListSection>

              <ListSection {...halfHeight}>
                <List {...previousProps} />
              </ListSection>

              <DisableModal {...modalProps} />
            </div> :
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
