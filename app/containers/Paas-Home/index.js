import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Form } from 'react-final-form';
// import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { StyledForm, FormButtons, FieldToggle } from 'components/Form';
import { getAuthorizations, getAuthorizationList, selectById } from 'containers/Paas/selectors';
import { AUTH, APPROVAL, APPS } from 'containers/Paas/constants';
import { homeColumns, homeFieldsApi } from 'containers/Paas/data';
import * as actions from 'containers/Paas/actions';

import FormList from './FormList';
import validate from './validate';


const listHeight = {
  margin: 120, // space for buttom buttons
};


export class PaasHome extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      changedValues: {},
      columns: this.buildColumns(homeColumns),
    };
    this.form = {};
  }

  componentDidMount() {
    this.initalizeForm();
  }

  buildColumns = (columns) => (
    columns.map((col) => ({
      ...col,
      onRender: this.renderColumn(col),
    }))
  )

  initalizeForm = async () => {
    const { onGetManagerDataRequest } = this.props;
    // TODO: CACHING....
    await onGetManagerDataRequest();
    await doneLoading(this);
    const initialValues = selectById(this.props.authorizations).toJS();
    this.setState({ initialValues });
  }

  handleAuthorizeAll = (sid) => () => {
    const { batch, change } = this.form;
    batch(() => {
      Object.values(APPS).forEach((app) => {
        change(`${sid}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  handleDenyAll = (sid) => () => {
    const { batch, change } = this.form;
    batch(() => {
      Object.values(APPS).forEach((app) => {
        change(`${sid}[${app}]`, APPROVAL.DENY);
      });
    });
  }

  handleSubmit = (values) => {
    const { onUpdateUsersRequest } = this.props;
    const { initialValues } = this.state;
    const apiValues = [];

    Object.keys(values).forEach((k) => {
      if (!isEqual(initialValues[k], values[k])) {
        apiValues.push(pick(values[k], homeFieldsApi));
      }
    });

    onUpdateUsersRequest(apiValues);
  }

  renderColumn = (column) => {
    if (column.data && column.data.render) {
      const onRenders = {
        authorizationToggle: (item) => {
          const toggleProps = {
            name: `${item.sid}[${column.key}]`,
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
          <DefaultButton
            onClick={this.handleAuthorizeAll(item[AUTH.SID])}
            iconProps={{ iconName: 'approve' }}
          />
        ),
        denyButton: (item) => (
          <DefaultButton
            onClick={this.handleDenyAll(item[AUTH.SID])}
            iconProps={{ iconName: 'deny' }}
          />
        ),
      };
      return onRenders[column.data.render];
    }
    return undefined;
  }

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

PaasHome.propTypes = {
  onGetManagerDataRequest: func.isRequired,
  onUpdateUsersRequest: func.isRequired,
  authorizationList: object.isRequired,
  authorizations: object.isRequired,
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  authorizationList: getAuthorizationList(),
  authorizations: getAuthorizations(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
  onUpdateUsersRequest: (users) => dispatch(actions.updateUsersRequest(users)),
});

const withAppPage = appPage(PaasHome);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(withAppPage);
