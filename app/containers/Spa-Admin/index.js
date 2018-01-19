import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import json2csv from 'json2csv';

import * as selectors from 'containers/Spa/selectors';
import * as actions from 'containers/Spa/actions';

import toJS from 'hocs/toJS';
import { formatList } from 'utils/data';
import { formattedDate } from 'utils/date';
import { doneLoading, downloadFile } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import { acknowledgment, recipient, newAckForm, adminColumns, adminCsv } from 'containers/Spa/data';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';
import { ACK, STATUS, RECIPIENT, GROUP } from 'containers/Spa/constants';
import SpaReport from 'containers/Spa-Report';

import AdminNav from './AdminNav';
import NewAckForm from './NewAckForm';
import DisableModal from './DisableModal';
import EmailModal from './EmailModal';


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
      hideNewAck: true,
      hideReport: true,
      hideDisable: true,
      hideEmail: true,
      selectedItem: {},
      fields: acknowledgment,
      formattedData: [],
    };

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleSelectActive),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleSelectPrevious),
    });
  }

  componentDidMount() {
    const { adminIsCached, onGetAdminDataRequest, onGetGroupsRequest } = this.props;
    // load the data for admin if not cached (list of their acks)
    if (!adminIsCached) {
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
    const { targetGroupIds, groupsById } = this.props;
    // map to { key, text } options as FieldSelect expects
    const options = targetGroupIds.map((id) => ({
      key: id,
      text: groupsById[id][GROUP.NAME],
    }));
    // set target group options to ones pulled in from API (mapped above)
    const fields = { ...this.state.fields };
    fields[ACK.TARGET_GROUPS].options = options;
    fields[ACK.START_DATE].minDate = new Date();
    fields[ACK.END_DATE].minDate = new Date();
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

    this.handleHideNew();
    onNewAckRequest(values);
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
    this.setState({ hideReport: true, formattedData: [] });
  }

  /**
   * Handles downloading the report as a csv
   */
  handleDownload = () => {
    const { selectedItem } = this.state;
    const csv = json2csv({ data: this.state.formattedData, newLine: '\r\n', ...adminCsv });
    const name = `${selectedItem[ACK.TITLE]} Report ${formattedDate(new Date())}.csv`;
    const type = 'data:text/csv;charset=utf-8;';

    downloadFile(csv, name, type);
  }

  //
  // DISABLE ACKNOWLEDGMENTS
  //

  /**
   * Handles displaying the disable acknowledgment modal
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
  handleSubmitDisable = async () => {
    const { onDisableAckRequest } = this.props;
    const { selectedItem } = this.state;
    const status = selectedItem[ACK.STATUS] === STATUS.PENDING ? STATUS.CANCELED : STATUS.DISABLED;
    // must hide the modal before api call to avoid flicker
    this.handleHideDisable();
    await onDisableAckRequest(selectedItem);
    // when done loading set item to be disabled or canceled
    await doneLoading(this);
    this.setState({ selectedItem: { ...selectedItem, [ACK.STATUS]: status } });
  }

  //
  // EMAIL RECIPIENTS
  //

  /**
   * Handles displaying the email recipients modal
   */
  handleShowEmail = () => {
    this.setState({ hideEmail: false });
  }

  /**
   * Handles canceling when emailing recipients
   */
  handleHideEmail = () => {
    this.setState({ hideEmail: true });
  }

  /**
   * Handles Submiting when emailing recipients
   */
  handleSubmitEmail = async () => {
    // const { onDisableAckRequest } = this.props;
    // const { selectedItem } = this.state;
    // // must hide the modal before api call to avoid flicker
    // this.handleHideDisable();
    // await onDisableAckRequest(selectedItem);
    // // when done loading set item to be disabledl
    // await doneLoading(this, () => {
    //   this.setState({ selectedItem: { ...selectedItem, [ACK.STATUS]: STATUS.DISABLED } });
    // });
  }

  //
  // NAV FUNCS
  //

  /**
   * Generates the items for the admin navigation menu
   *
   * @return {array} items    - items to use as buttons
   */
  navList = () => {
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
      // creating new acknowledgment or showing report, add `Back` button
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
        // not in pending status
        if (selectedItem[ACK.STATUS] !== STATUS.PENDING) {
          // add `Download` report button
          items.push(
            {
              key: 'download',
              name: 'Download',
              icon: 'download',
              ariaLabel: 'Download Report',
              onClick: this.handleDownload,
            },
          );
        }
        // pending status
        if (selectedItem[ACK.STATUS] === STATUS.PENDING) {
          // add `Cancel` button
          items.push(
            {
              key: 'cancel',
              name: 'Cancel',
              icon: 'Clear',
              ariaLabel: 'Cancel Pending Acknowledgment',
              onClick: this.handleShowDisable,
            }
          );
        } else if (selectedItem[ACK.STATUS] === STATUS.ACTIVE) {
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
          // add `Email` button
          items.push(
            {
              key: 'email',
              name: 'Email',
              icon: 'email', // TODO: ICON
              ariaLabel: 'Email acknowledgment recipients',
              onClick: this.handleShowEmail,
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
  handleSelectItem = async (item) => {
    const { onGetAckRecipientsRequest, adminCachedIds, enums } = this.props;
    // display the report (need to do before loading api so no flicker)
    this.handleShowReport();
    // call api if no entry for recipients stored
    if (!adminCachedIds.includes(item[ACK.ID])) {
      await onGetAckRecipientsRequest(item);
    }
    // when done loading build data for report (all recipients of acknowledgment into an array)
    await doneLoading(this);
    const id = this.state.selectedItem[ACK.ID];
    const data = Object.values(this.props.recipientsById).filter((x) => x[RECIPIENT.ACK_ID] === id);
    const formattedData = formatList(data, recipient, enums);
    this.setState({ formattedData });
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
    this.handleHideDisable();
    this.handleHideEmail();
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
    const {
      enums,
      Loading,
      adminActiveItems,
      adminPreviousItems,
    } = this.props;

    const {
      fields,
      hideDisable,
      hideEmail,
      hideNewAck,
      hideReport,
      selectedItem,
      formattedData,
     } = this.state;

    // if we got a loading compoennt just render that
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
    if (!hideReport) {
      const reportProps = {
        enums,
        selectedItem,
        data: formattedData,
        dataKey: RECIPIENT.ACK_DATE,
      };

      const disableProps = {
        type: selectedItem[ACK.STATUS] === STATUS.PENDING ? 'cancel' : 'disable',
        hidden: hideDisable,
        item: selectedItem,
        onClose: this.handleHideDisable,
        onSubmit: this.handleSubmitDisable,
      };

      const emailProps = {
        hidden: hideEmail,
        item: selectedItem,
        recipients: formattedData,
        onClose: this.handleHideEmail,
        onSubmit: this.handleSubmitEmail,
      };

      return (
        <div>
          <SpaReport {...reportProps} />
          <DisableModal {...disableProps} />
          <EmailModal {...emailProps} />
        </div>
      );
    }

    // render lists of active and precious acknowledgments
    const activeProps = {
      enums,
      items: adminActiveItems,
      columns: adminColumns,
      title: 'Active Acknowledgments',
      empty: {
        message: 'No Active Acknowledgments',
        onClick: this.handleShowNew,
        buttonText: 'Create New',
        buttonIcon: 'plus',
      },
      selection: this.selectionActive,
    };

    const previousProps = {
      enums,
      items: adminPreviousItems,
      columns: adminColumns,
      title: 'Previous Acknowledgments',
      empty: {
        message: 'No Previous Acknowledgments',
      },
      selection: this.selectionPrev,
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
          items={this.navList()}
        />
        {this.renderContent()}
      </div>
    );
  }
}


const { object, func, node, bool, array } = PropTypes;

SpaAdmin.propTypes = {
  enums: object.isRequired,
  adminIsCached: bool.isRequired,
  recipientsById: object.isRequired,
  groupsById: object.isRequired,
  targetGroupIds: array.isRequired,
  adminActiveItems: array.isRequired,
  adminPreviousItems: array.isRequired,
  adminCachedIds: array.isRequired,
  onGetAdminDataRequest: func.isRequired,
  onGetGroupsRequest: func.isRequired,
  onGetAckRecipientsRequest: func.isRequired,
  onNewAckRequest: func.isRequired,
  onDisableAckRequest: func.isRequired,
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  enums: selectors.getEnums(),
  adminIsCached: selectors.getAdminIsCached(),
  recipientsById: selectors.getRecipientsById(),
  groupsById: selectors.getGroupsById(),
  targetGroupIds: selectors.getTargetGroupIds(),
  adminActiveItems: selectors.getAdminActiveItems(),
  adminPreviousItems: selectors.getAdminPreviousItems(),
  adminCachedIds: selectors.getAdminCachedIds(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAdminDataRequest: () => dispatch(actions.getAdminDataRequest()),
  onGetGroupsRequest: () => dispatch(actions.getGroupsRequest()),
  onGetAckRecipientsRequest: (item) => dispatch(actions.getAckRecipientsRequest(item)),
  onNewAckRequest: (vals) => dispatch(actions.newAckRequest(vals)),
  onDisableAckRequest: (item) => dispatch(actions.disableAckRequest(item)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  appPage,
  toJS,
)(SpaAdmin);
