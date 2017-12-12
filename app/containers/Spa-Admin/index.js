import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';

import {
  getAdminCached,
  getRecipients,
  getGroups,
  getAdminAllIds,
  getAdminActiveAcks,
  getAdminPreviousAcks,
  selectByAckId,
  selectIdExists,
} from 'containers/Spa/selectors';

import {
  getAdminDataRequest,
  getGroupsRequest,
  getAckRecipientsRequest,
  newAckRequest,
  disableAckRequest,
} from 'containers/Spa/actions';

import spaFields, { newAckForm } from 'containers/Spa/fields';
import { adminColumns } from 'containers/Spa/columns';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';
import { ACK, STATUS, RECIPIENT, GROUP } from 'containers/Spa/constants';
import SpaReport from 'containers/Spa-Report';

import AdminNav from './AdminNav';
import NewAckForm from './NewAckForm';
import DisableModal from './DisableModal';


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
      fields: spaFields,
    };

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleSelectActive),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleSelectPrevious),
    });
  }

  componentDidMount() {
    const { adminCached, onGetAdminDataRequest, onGetGroupsRequest } = this.props;
    // load the data for admin if not cached (list of their acks)
    if (!adminCached) {
      onGetAdminDataRequest();
      onGetGroupsRequest();
    }
  }

  //
  // NEW ACKNOWLEDGMENTS
  //

  /**
   * Handles opening the form for creating a new acknowledgment
   */
  handleShowNew = () => {
    const { groups } = this.props;
    // map to { key, text } options as FieldSelect expects
    const options = groups.get('targetIds').map((sid) => ({
      key: String(sid),
      text: groups.getIn(['byId', String(sid), GROUP.NAME]),
    })).toJS();
    // set target group options to ones pulled in from API (mapped above)
    const fields = { ...this.state.fields };
    fields[ACK.TARGET_GROUPS].options = options;
    fields[ACK.DATE_START].minDate = new Date();
    fields[ACK.DATE_END].minDate = new Date();
    // update fields then show the form
    this.setState({ fields }, () => this.setState({ hideNewAck: false }));
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
    this.handleHideNew();
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

    onDisableAckRequest(selectedItem);
    // set item to be disabled then hide the modal
    this.setState({ selectedItem: { ...selectedItem, [ACK.STATUS]: STATUS.DISABLED } });
    this.handleHideDisable();
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

  /**
   * Handles hiding the report screen
   */
  handleDownload = () => {
    // TODO: download...
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
      // showing report
      if (!hideReport) {
        // add `Download` report button
        items.push(
          {
            key: 'download',
            name: 'Download',
            icon: 'down',
            ariaLabel: 'Download Report',
            onClick: this.handleDownload,
          },
        );
        // active acknowledgment
        if (selectedItem[ACK.STATUS] === STATUS.ACTIVE) {
          // add `Disable` button
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
    }

    return items;
  }

  /**
   * Handles selecting an item from a list
   */
  handleSelectItem = (item) => {
    const { onGetAckRecipientsRequest, adminAllIds } = this.props;
    // call api if no entry for recipients stored
    if (!selectIdExists(adminAllIds, item[ACK.ID])) {
      // console.log('onGetAckRecipientsRequest')
      onGetAckRecipientsRequest(item);
    }
    this.handleShowReport();
  }

  /**
   * Callback for selecting an item from the active list
   */
  handleSelectActive = (item) => {
    this.handleSelectItem(item);
  }

  /**
   * Callback for selecting an item from the previous list
   */
  handleSelectPrevious = (item) => {
    this.handleSelectItem(item);
  }

  /**
   * Handles closing any screens / going back to the admin page
   */
  handleBack = () => {
    this.handleHideNew();
    this.handleHideReport();
  }

  //
  // RENDERING FUNCS
  //

  /**
   * Renders the content based off state (show lists / report / new form)
   *
   * @return {JSX}            - content to be rendered
   */
  renderContent = () => {
    const { adminActiveAcks, adminPreviousAcks, Loading, recipients } = this.props;
    const { selectedItem, hideDisable, hideNewAck, hideReport, fields } = this.state;

    if (Loading) {
      return Loading;
    }

    // render form for new acknowledgments
    if (!hideNewAck) {
      const newAckProps = {
        fields,
        title: newAckForm.title,
        sections: newAckForm.sections,
        onSubmit: this.handleSubmitNew,
      };

      return <NewAckForm {...newAckProps} />;
    }
    // render reporting
    if (!hideReport && selectedItem[ACK.ID]) {
      const data = selectByAckId(recipients, selectedItem[ACK.ID]);

      const reportProps = {
        selectedItem,
        data: data.toList().toJS(),
        dataKey: RECIPIENT.ACK_DATE,
      };

      const modalProps = {
        hidden: hideDisable,
        item: selectedItem,
        onClose: this.handleHideDisable,
        onSubmit: this.handleSubmitDisable,
      };

      return (
        <div>
          <SpaReport {...reportProps} />
          <DisableModal {...modalProps} />
        </div>
      );
    }
    // render lists of active and precious acknowledgments
    const activeProps = {
      items: adminActiveAcks.toJS(),
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
      items: adminPreviousAcks.toJS(),
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


const { object, func, node, bool } = PropTypes;

SpaAdmin.propTypes = {
  adminCached: bool.isRequired,
  recipients: object.isRequired,
  groups: object.isRequired,
  adminAllIds: object.isRequired,
  adminActiveAcks: object.isRequired,
  adminPreviousAcks: object.isRequired,
  onGetAdminDataRequest: func.isRequired,
  onGetGroupsRequest: func.isRequired,
  onGetAckRecipientsRequest: func.isRequired,
  onNewAckRequest: func.isRequired,
  onDisableAckRequest: func.isRequired,
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  adminCached: getAdminCached(),
  recipients: getRecipients(),
  groups: getGroups(),
  adminActiveAcks: getAdminActiveAcks(),
  adminPreviousAcks: getAdminPreviousAcks(),
  adminAllIds: getAdminAllIds(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAdminDataRequest: () => dispatch(getAdminDataRequest()),
  onGetGroupsRequest: () => dispatch(getGroupsRequest()),
  onGetAckRecipientsRequest: (item) => dispatch(getAckRecipientsRequest(item)),
  onNewAckRequest: (vals) => dispatch(newAckRequest(vals)),
  onDisableAckRequest: (item) => dispatch(disableAckRequest(item)),
});

const withAppPage = appPage(SpaAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(withAppPage);
