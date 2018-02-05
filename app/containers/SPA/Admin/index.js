import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
// import json2csv from 'json2csv';

// import * as selectors from 'containers/Spa/selectors';

// import { formattedDate } from 'utils/date';
// import { doneLoading, downloadFile } from 'utils/request';
// import { acknowledgment, recipient, newAckForm, adminColumns, adminCsv } from 'containers/Spa/data';
import List, { handleSelectItem } from 'components/List';

import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';
import Loading from '../../../components/Loading';
import { shouldFetch } from '../../../utils/api';
// import { formatList } from '../../../utils/data';

import * as hubSelectors from '../../AppHub/selectors';

// import Report from '../Report';
import { adminColumns, acknowledgment, newAckForm } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

// import AdminNav from './AdminNav';
import NewAckForm from './NewAckForm';
// import DisableModal from './DisableModal';
// import EmailModal from './EmailModal';


const style = {
  count: 2,
  padding: theme.hub.padding + theme.app.subNavHeight,
};


/**
 * Admin page of SPA
 *
 * Contains list of acknowledgments with the ability
 * to add new and disable existing.
 */
export class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hideNewAck: true,
      // hideReport: true,
      // hideDisable: true,
      // hideEmail: true,
      selectedItem: {},
      fields: acknowledgment,
      // formattedData: [],
    };

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleSelectItem),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleSelectItem),
    });
  }

  async componentDidMount() {
    const { admin, onGetAdminDataRequest, onGetGroupsRequest, setCommandBar } = this.props;
    // set the command bar props
    setCommandBar(this.getDefaultCommands(true));
    // only load admin data if not cached
    if (shouldFetch(admin.lastFetched)) {
      await Promise.all([
        onGetAdminDataRequest(),
        onGetGroupsRequest(),
      ]);
    }
    this.setState({ loading: false }); // eslint-disable-line
  }

  componentWillUnmount() {
    this.props.setCommandBar(false);
  }

  // COMMAND BAR

  getDefaultCommands = () => ({
    items: [{
      key: 'new',
      name: 'New',
      icon: 'plus',
      ariaLabel: 'Add New Acknowledgment',
      onClick: this.handleShowNew,
    }],
  })

  getNewCommands = () => ({
    items: [
      {
        key: 'back',
        name: 'Back',
        icon: 'navBack',
        ariaLabel: 'Back to Admin Page',
        onClick: this.handleHideNew,
      },
    ],
  })

  // NEW ACKNOWLEDGMENT FORM VISIBILITY

  /**
   * Handles opening the form for creating a new acknowledgment
   */
  handleShowNew = async () => {
    const { groups } = this.props;
    // map to { key, text } options as FieldSelect expects
    const options = groups.targetIds.map((id) => ({
      key: id,
      text: groups.byId[id][C.GROUP.NAME],
    }));
    // set target group options to ones pulled in from API (mapped above)
    const fields = { ...this.state.fields };
    fields[C.ACK.TARGET_GROUPS].options = options;
    fields[C.ACK.START_DATE].minDate = new Date();
    fields[C.ACK.END_DATE].minDate = new Date();
    // update fields then show the form
    await this.setState({ fields });
    this.props.setCommandBar(this.getNewCommands());
    this.setState({ hideNewAck: false });
  }

  /**
   * Handles hiding the new acknowledgment form
   */
  handleHideNew = () => {
    this.props.setCommandBar(this.getDefaultCommands());
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

  /**
   * Handles selecting an item from a list
   */
  handleSelectItem = (item) => {
    const { history } = this.props;
    history.push(`/spa/report/${item[C.ACK.ID]}`);
  }

  render() {
    const { app, adminActiveItems, adminPreviousItems, enums } = this.props;
    const { loading, fields, hideNewAck } = this.state;
    // LOADING
    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
      };
      return <Loading {...loadingProps} />;
    }
    // NEW ACK FORM VISIBLE
    if (!hideNewAck) {
      const newAckProps = {
        fields,
        title: newAckForm.title,
        sections: newAckForm.sections,
        onSubmit: this.handleSubmitNew,
      };

      return <NewAckForm {...newAckProps} />;
    }
    // ACTIVE / PREVIOUS LISTS
    const activeProps = {
      enums,
      style,
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
      style,
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
        <List {...activeProps} />
        <List {...previousProps} />
      </div>
    );
  }
}


const { object, func, array } = PropTypes;

Admin.propTypes = {
  setCommandBar: func.isRequired,
  app: object.isRequired,
  admin: object.isRequired,
  // groupsById: object.isRequired,
  // targetGroupIds: array.isRequired,
  adminActiveItems: array.isRequired,
  adminPreviousItems: array.isRequired,
  groups: object.isRequired,
  enums: object.isRequired,
  onGetAdminDataRequest: func.isRequired,
  onGetGroupsRequest: func.isRequired,
  onNewAckRequest: func.isRequired,
  history: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  admin: selectors.getAdmin,
  adminActiveItems: selectors.geAdminItems('acksActive'),
  adminPreviousItems: selectors.geAdminItems('acksPrevious'),
  groups: selectors.getGroups,
  enums: selectors.getEnums,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAdminDataRequest: () => dispatch(actions.getAdminDataRequest()),
  onGetGroupsRequest: () => dispatch(actions.getGroupsRequest()),
  onNewAckRequest: (vals) => dispatch(actions.newAckRequest(vals)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(Admin);
