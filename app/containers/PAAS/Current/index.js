import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';
// // import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import toJS from '../../../hocs/toJS';
import theme from '../../../utils/theme';
import { shouldFetch } from '../../../utils/api';
import Loading from '../../../components/Loading';
import List from '../../../components/List';
import { FormSection, FormButtons, FieldToggle } from '../../../components/Form';

import * as hubSelectors from '../../AppHub/selectors';

import validate from './validate';
import { currentColumns, currentFieldsApi } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';


export const FormList = styled(List) `
  box-shadow: none;
  margin: 0;
  padding: 0;
`;


export const ApproveButton = styled(ActionButton) `
  height: 30px;
  i {
    color: ${theme.green};
  }
`;


export const DenyButton = styled(ActionButton) `
  height: 30px;
  i {
    color: ${theme.red};
  }
`;


export class Current extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      initialValues: {},
      changedValues: {},
      columns: this.buildColumns(currentColumns),
    };
    this.form = {};
  }

  async componentDidMount() {
    const { manager, onGetManagerDataRequest } = this.props;
    // only load user data if not cached
    if (shouldFetch(manager.lastFetched)) {
      await onGetManagerDataRequest();
    }
    this.setState({ loading: false }); // eslint-disable-line
  }

  /**
   * Binds columns with a custom render function
   *
   * @param {array} columns   - column objects to bind to
   *
   * @return {array}          - columns with onRender bound
   */
  buildColumns = (columns) => (
    columns.map((col) => ({
      ...col,
      onRender: this.renderColumn(col),
    }))
  )

  /**
   * Handles updating the form to authroize all apps for user by id
   *
   * @param {string} id   - id of user to deny all
   */
  handleAuthorizeAll = (id) => () => {
    const { batch } = this.form;
    batch(() => {
      this.changeAllApps(id, C.APPROVAL.APPROVE);
    });
  }

  /**
   * Handles updating the form to deny all apps for user by id
   *
   * @param {string} id   - id of user to deny all
   */
  handleDenyAll = (id) => () => {
    const { batch } = this.form;
    batch(() => {
      this.changeAllApps(id, C.APPROVAL.DENY);
    });
  }

  /**
   * Changes all apps for a user
   */
  changeAllApps = (id, type) => {
    const { change } = this.form;
    Object.values(C.APPS).forEach((app) => {
      change(`${id}[${app}]`, type);
    });
  }

  /**
   * Handles submitting a request to the api with form values
   *
   * @param {object} values   - form values
   */
  handleSubmit = async (values) => {
    const { onUpdateUsersRequest, managerById } = this.props;
    const users = [];
    let user;

    Object.keys(values).forEach((k) => {
      if (!isEqual(managerById[k], values[k])) {
        user = pick(values[k], currentFieldsApi);
        // convert app values to strings (api expects)
        Object.keys(user).forEach((n) => {
          if (C.APP_LIST.includes(n)) {
            user[n] = `${user[n]}`;
          }
        });
        users.push(user);
      }
    });

    await onUpdateUsersRequest(users);
  }

  /**
   * Renders a List column in a custom format
   * based off data.render prop
   *
   * @param {object} column   - column to render
   *
   * @return {JSX}            - custom rendering of column
   */
  renderColumn = (column) => {
    if (column.data && column.data.render) {
      const onRenders = {
        authorizationToggle: (item) => {
          const toggleProps = {
            name: `${item[C.AUTH.ID]}[${column.key}]`,
            onText: 'Yes',
            offText: 'No',
            isNullable: true,
            warning: true,
          };

          return (
            <FieldToggle {...toggleProps} />
          );
        },
        approvalButton: (item) => (
          <ApproveButton
            text={'All'}
            onClick={this.handleAuthorizeAll(item[C.AUTH.ID])}
            iconProps={{ iconName: 'approve' }}
          />
        ),
        denyButton: (item) => (
          <DenyButton
            text={'All'}
            onClick={this.handleDenyAll(item[C.AUTH.ID])}
            iconProps={{ iconName: 'deny' }}
          />
        ),
      };
      return onRenders[column.data.render];
    }
    return undefined;
  }

  /**
   * Renders the form
   */
  renderForm = ({ handleSubmit, reset, submitting, pristine, change, batch }) => {
    const { managerItems } = this.props;
    const { columns } = this.state;

    const listProps = {
      columns,
      items: managerItems,
      title: 'Current Staff Authorizations',
      sortBy: [C.AUTH.FULL_NAME],
      style: { padding: theme.form.buttonsHeight + (2 * theme.hub.padding) },
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    // set change to react-final-forms to allow updates later (TODO: HOW TO DO BETTER???)
    this.form.change = change;
    this.form.batch = batch;

    return (
      <FormSection onSubmit={handleSubmit}>
        {/* <MessageBar
            messageBarType={MessageBarType.severeWarning}
          >
            Warning - There are one or more authornizatrions neeeded
          </MessageBar> */}
        <FormList {...listProps} />
        <FormButtons {...buttonProps} />
      </FormSection>
    );
  }

  render() {
    const { app, managerById } = this.props;
    const { loading } = this.state;

    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
      };
      return <Loading {...loadingProps} />;
    }

    const formProps = {
      validate,
      initialValues: managerById,
      render: this.renderForm,
      onSubmit: this.handleSubmit,
      subscription: { submitting: true, pristine: true },
    };

    return (
      <Form {...formProps} />
    );
  }
}


const { object, func, array } = PropTypes;

Current.propTypes = {
  app: object.isRequired,
  manager: object.isRequired, // eslint-disable-line
  managerItems: array.isRequired,
  managerById: object.isRequired,
  onGetManagerDataRequest: func.isRequired, // eslint-disable-line
  onUpdateUsersRequest: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  manager: selectors.getManager,
  managerItems: selectors.getManagerItems('current'),
  managerById: selectors.getManagerById('current'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
  onUpdateUsersRequest: (users) => dispatch(actions.updateUsersRequest(users)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(Current);
