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

import LoadCommandBar from '../../App/LoadCommandBar';
import * as hubSelectors from '../../AppHub/selectors';

import { adminColumns, acknowledgment } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';


const style = {
  count: 2,
  padding: theme.hub.padding + theme.app.commandBarHeight,
};


/**
 * Admin page of Spa
 *
 * Contains list of acknowledgments with the ability
 * to add new and disable existing.
 */
export class SpaAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // hideNewAck: true,
      selectedItem: {},
      fields: acknowledgment,
      initialValues: {},
    };

    this.selectionActive = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionActive, this.handleSelectItem),
    });
    this.selectionPrev = new Selection({
      onSelectionChanged: () => handleSelectItem(this, this.selectionPrev, this.handleSelectItem),
    });
  }

  async componentDidMount() {
    // const { admin, onGetAdminDataRequest, onGetGroupsRequest } = this.props;
    const { admin, onGetAdminDataRequest } = this.props;
    // only load admin data if, not cached
    if (shouldFetch(admin.lastFetched)) {
      await onGetAdminDataRequest();
    }
    this.setState({ loading: false }); // eslint-disable-line
  }

  // COMMAND BAR

  // items to display in command bar by default
  getCommands = () => ({
    items: [{
      key: 'new',
      name: 'New',
      icon: 'plus',
      ariaLabel: 'Add New Acknowledgment',
      onClick: this.newFormRedirect,
    }],
  })

  newFormRedirect = () => {
    const { history } = this.props;
    history.push('/spa/form/new');
  }

  /**
   * Handles selecting an item from a list
   */
  handleSelectItem = (item) => {
    const { history } = this.props;
    let page = 'report';
    const formStatus = [C.STATUS.DRAFT, C.STATUS.PENDING, C.STATUS.CANCELED];
    // if draft, pending, or canceled
    if (item[C.ACK.STATUS] in formStatus) {
      page = 'form';
    }
    // open the page...
    history.push(`/spa/${page}/${item[C.ACK.ID]}`);
  }

  render() {
    const { app, adminActiveItems, adminPreviousItems, enums, setCommandBar } = this.props;
    // const { loading, fields, hideNewAck, initialValues } = this.state;
    const { loading } = this.state;
    const isLoading = app.loading || loading;
    // LOADING
    if (isLoading || app.error) {
      const loadingProps = {
        loading: isLoading,
        error: app.error,
        to: app.home.path,
      };
      return <Loading {...loadingProps} />;
    }
    // ACTIVE / PREVIOUS LISTS
    const activeProps = {
      enums,
      style,
      items: adminActiveItems,
      columns: adminColumns,
      title: 'Active Policies',
      empty: {
        message: 'No Active Policies',
        onClick: this.newFormRedirect,
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
      title: 'Previous Policies',
      empty: {
        message: 'No Previous Policies',
      },
      selection: this.selectionPrev,
    };

    const commandBarProps = {
      setCommandBar,
      commandBar: this.getCommands(),
      disabled: isLoading || app.error,
    };

    return (
      <div>
        <List {...activeProps} />
        <List {...previousProps} />

        <LoadCommandBar {...commandBarProps} />
      </div>
    );
  }
}


const { object, func, array } = PropTypes;

SpaAdmin.propTypes = {
  setCommandBar: func.isRequired,
  app: object.isRequired,
  admin: object.isRequired, // eslint-disable-line
  adminActiveItems: array.isRequired,
  adminPreviousItems: array.isRequired,
  enums: object.isRequired,
  onGetAdminDataRequest: func.isRequired, // eslint-disable-line
  history: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  admin: selectors.getAdmin,
  adminActiveItems: selectors.geAdminItems('acksActive'),
  adminPreviousItems: selectors.geAdminItems('acksPrevious'),
  enums: selectors.getEnums,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetAdminDataRequest: () => dispatch(actions.getAdminDataRequest()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(SpaAdmin);
