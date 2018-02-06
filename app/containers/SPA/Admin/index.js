import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

import List, { handleSelectItem } from '../../../components/List';
import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';
import Loading from '../../../components/Loading';
import { shouldFetch } from '../../../utils/api';

import * as hubSelectors from '../../AppHub/selectors';

import { adminColumns, acknowledgment, newAckForm } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import NewAckForm from './NewAckForm';


const style = {
  count: 2,
  padding: theme.hub.padding + theme.app.commandBarHeight,
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
      selectedItem: {},
      fields: acknowledgment,
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
    setCommandBar(this.getCommands());
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

  // items to display in command bar by default
  getCommands = () => ({
    items: [{
      key: 'new',
      name: 'New',
      icon: 'plus',
      ariaLabel: 'Add New Acknowledgment',
      onClick: this.handleShowNew,
    }],
  })

  // items to display in command bar on new acknowledgment form
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

  // NEW ACKNOWLEDGMENT FORM

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
    this.props.setCommandBar(this.getCommands());
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
  admin: object.isRequired, // eslint-disable-line
  adminActiveItems: array.isRequired,
  adminPreviousItems: array.isRequired,
  groups: object.isRequired,
  enums: object.isRequired,
  onGetAdminDataRequest: func.isRequired, // eslint-disable-line
  onGetGroupsRequest: func.isRequired, // eslint-disable-line
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
