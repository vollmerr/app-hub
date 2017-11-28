import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
import { makeSelectPendingAcks, makeSelectPreviousAcks } from 'containers/Spa/selectors';
import { newAckRequest, disableAckRequest } from 'containers/Spa/actions';
import { adminColumns } from 'containers/Spa/mapped';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';
import { ACK, STATUS } from 'containers/Spa/constants';

import AdminNav from './AdminNav';
import NewAckForm from './NewAckForm';
import DisableModal from './DisableModal';
import Report from './Report';

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
      hideReport: true,
      selectedItem: {},
    };

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleSelectActive),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleSelectPrevious),
    });
  }

  //
  // NEW ACKNOWLEDGMENTS
  //

  /**
   * Handles opening the form for creating a new acknowledgment
   */
  handleShowNew = () => {
    this.setState({ hideNewAck: false });
  }

  /**
   * Handles hiding the new acknowledgment form
   */
  handleHideNew = () => {
    this.setState({ hideNewAck: true });
  }

  /**
   * Handles submitting the new acknowledgment form to api
   */
  handleSubmitNew = (values) => {
    const { onNewAckRequest } = this.props;

    onNewAckRequest(values);
  }

  //
  // DISABLE ACKNOWLEDGMENTS
  //

  /**
   * Handles disabling an exisiting acknowledgment
   */
  handleShowDisable = () => {
    this.setState({ hideDisable: false });
  }

  /**
   * Handles canceling when disabling an acknowledgment
   */
  handleHideDisable = () => {
    this.setState({ hideDisable: true });
  }

  /**
   * Handles Submiting when disabling an acknowledgment
   */
  handleSubmitDisable = () => {
    const { onDisableAckRequest } = this.props;
    const { selectedItem } = this.state;

    this.handleHideDisable();
    onDisableAckRequest(selectedItem);
  }

  //
  // REPORTING FOR ACKNOWLEDGMENTS
  //

  /**
   * Handles showing the report screen
   */
  handleShowReport = () => {
    this.setState({ hideReport: false });
  }

  /**
   * Handles hiding the report screen
   */
  handleHideReport = () => {
    this.setState({ hideReport: true });
  }

  //
  // NAV FUNCS
  //

  /**
   * Generates the items for the admin navigation menu
   *
   * @return {array} items    - items to use as buttons
   */
  navItems = () => {
    const { hideNewAck, hideReport, selectedItem } = this.state;
    const items = [];

    if (hideNewAck && hideReport) {
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
    } else {
      // creating new acknowledgment, add `Back` button
      items.push(
        {
          key: 'back',
          name: 'Back',
          icon: 'navBack',
          ariaLabel: 'Back to Admin Page',
          onClick: this.handleBack,
        },
      );
      // showing report with current ack, add `Disable` button
      if (!hideReport && selectedItem[ACK.STATUS] === STATUS.ACTIVE) {
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
    }

    return items;
  }

  /**
   * Callback for selecting an item from the active list
   */
  handleSelectActive = () => {
    this.handleShowReport();
  }

  /**
   * Callback for selecting an item from the previous list
   */
  handleSelectPrevious = () => {
    this.handleShowReport();
  }

  /**
   * Handles closing any screens / going back to the admin page
   */
  handleBack = () => {
    this.handleHideNew();
    this.handleHideReport();
  }

  /**
   * Renders the content based off state (show lists / report / new form)
   *
   * @return {JSX}            - content to be rendered
   */
  renderContent = () => {
    const { activeAcks, previousAcks } = this.props;
    const { selectedItem, hideDisable, hideNewAck, hideReport } = this.state;

    // render form for new acknowledgments
    if (!hideNewAck) {
      const newAckProps = {
        onSubmit: this.handleSubmitNew,
      };

      return <NewAckForm {...newAckProps} />;
    }
    // render reporting
    if (!hideReport && selectedItem[ACK.ID]) {
      const modalProps = {
        hidden: hideDisable,
        item: selectedItem,
        onClose: this.handleHideDisable,
        onSubmit: this.handleSubmitDisable,
      };

      return (
        <div>
          <Report item={selectedItem} />
          <DisableModal {...modalProps} />
        </div>
      );
    }
    // render lists of active and precious acknowledgments
    const activeProps = {
      items: activeAcks.toJS(),
      columns: adminColumns,
      title: 'Active Acknowledgments',
      empty: {
        message: 'No Active Acknowledgments',
        onClick: this.handleShowNew,
        buttonText: 'Create New',
        buttonIcon: 'plus',
      },
      selection: this.selectionActive,
      selectionMode: SelectionMode.none,
    };

    const previousProps = {
      items: previousAcks.toJS(),
      columns: adminColumns,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      selection: this.selectionPrev,
      selectionMode: SelectionMode.none,
    };

    return (
      <div>
        <ListSection {...halfHeight}>
          <List {...activeProps} />
        </ListSection>

        <ListSection {...halfHeight}>
          <List {...previousProps} />
        </ListSection>
      </div>
    );
  }

  render() {
    return (
      <div>
        <AdminNav
          isSearchBoxVisible={false}
          items={this.navItems()}
        />
        {this.renderContent()}
      </div>
    );
  }
}


const { object, func } = PropTypes;

SpaAdmin.propTypes = {
  activeAcks: object.isRequired,
  previousAcks: object.isRequired,
  onNewAckRequest: func.isRequired,
  onDisableAckRequest: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeAcks: makeSelectPendingAcks(),
  previousAcks: makeSelectPreviousAcks(),
});

export const mapDispatchToProps = (dispatch) => ({
  onNewAckRequest: (vals) => dispatch(newAckRequest(vals)),
  onDisableAckRequest: (item) => dispatch(disableAckRequest(item)),
});

const withAppPage = appPage(SpaAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
