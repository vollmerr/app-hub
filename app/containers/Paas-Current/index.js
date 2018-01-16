import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';
// import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { StyledForm, FormButtons, FieldToggle } from 'components/Form';
import { AUTH, APPROVAL, APPS } from 'containers/Paas/constants';
import { currentColumns, currentFieldsApi } from 'containers/Paas/data';
import * as selectors from 'containers/Paas/selectors';
import * as actions from 'containers/Paas/actions';

import FormList from './FormList';
import validate from './validate';
import { ApproveButton, DenyButton } from './Buttons';


const listHeight = {
  margin: 120, // space for buttom buttons
};


export class PaasCurrent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      changedValues: {},
      columns: this.buildColumns(currentColumns),
    };
    this.form = {};
  }

  async componentDidMount() {
    const { onGetManagerDataRequest } = this.props;
    // TODO: CACHING....
    await onGetManagerDataRequest();
    this.initalizeForm();
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
   * Initalizez the form with values
   * Clicking 'Reset' will revert back to this state
   */
  initalizeForm = async () => {
    await doneLoading(this);
    const initialValues = this.props.authorizations.toJS();
    this.setState({ initialValues });
  }

  /**
   * Handles updating the form to authroize all apps for user by id
   *
   * @param {string} id   - id of user to deny all
   */
  handleAuthorizeAll = (id) => () => {
    const { batch } = this.form;
    batch(() => {
      this.changeAllApps(id, APPROVAL.APPROVE);
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
      this.changeAllApps(id, APPROVAL.DENY);
    });
  }

  /**
   * Changes all apps for a user
   */
  changeAllApps = (id, type) => {
    const { change } = this.form;
    Object.values(APPS).forEach((app) => {
      change(`${id}[${app}]`, type);
    });
  }

  /**
   * Handles submitting a request to the api with form values
   *
   * @param {object} values   - form values
   */
  handleSubmit = async (values) => {
    const { onUpdateUsersRequest } = this.props;
    const { initialValues } = this.state;
    const users = [];

    Object.keys(values).forEach((k) => {
      if (!isEqual(initialValues[k], values[k])) {
        users.push(pick(values[k], currentFieldsApi));
      }
    });

    await onUpdateUsersRequest(users);
    this.initalizeForm();
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
            name: `${item[AUTH.ID]}[${column.key}]`,
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
            onClick={this.handleAuthorizeAll(item[AUTH.ID])}
            iconProps={{ iconName: 'approve' }}
          />
        ),
        denyButton: (item) => (
          <DenyButton
            text={'All'}
            onClick={this.handleDenyAll(item[AUTH.ID])}
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
    const { authorizationList } = this.props;
    const { columns } = this.state;

    const listProps = {
      columns,
      items: authorizationList.toJS(),
      title: 'Current Staff Authorizations',
      sortBy: [AUTH.FULL_NAME],
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    // set change to react-final-forms to allow updates later (TODO: HOW TO DO BETTER???)
    this.form.change = change;
    this.form.batch = batch;

    return (
      <StyledForm onSubmit={handleSubmit}>
        {/* <MessageBar
          messageBarType={MessageBarType.severeWarning}
        >
          Warning - There are one or more authornizatrions neeeded
        </MessageBar> */}

        <FormList {...listHeight}>
          <List {...listProps} />
        </FormList>

        <FormButtons {...buttonProps} />
      </StyledForm>
    );
  }

  render() {
    const { Loading } = this.props;
    const { initialValues } = this.state;

    if (Loading) {
      return Loading;
    }

    const formProps = {
      validate,
      initialValues,
      render: this.renderForm,
      onSubmit: this.handleSubmit,
      subscription: { submitting: true, pristine: true },
    };

    return (
      <Form {...formProps} />
    );
  }
}


const { object, node, func } = PropTypes;

PaasCurrent.propTypes = {
  onGetManagerDataRequest: func.isRequired, // eslint-disable-line
  onUpdateUsersRequest: func.isRequired,
  authorizationList: object.isRequired,
  authorizations: object.isRequired, // eslint-disable-line
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  authorizationList: selectors.getManagerAuthsList('currentIds'),
  authorizations: selectors.getManagerAuths('currentIds'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
  onUpdateUsersRequest: (users) => dispatch(actions.updateUsersRequest(users)),
});

const withAppPage = appPage(PaasCurrent);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(withAppPage);
