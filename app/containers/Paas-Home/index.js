import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
// import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { Form, FormButtons, FieldToggle } from 'components/Form';
import { getAuthorizations, getAuthorizationList, selectById, selectAllIds } from 'containers/Paas/selectors';
import { APPROVAL } from 'containers/Paas/constants';
import * as actions from 'containers/Paas/actions';

import FormList from './FormList';
import validate from './validate';


const renderToggle = (item, index, column) => {
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
};

const columns = [
  { key: 'firstName', fieldName: 'firstName', name: 'First Name' },
  { key: 'lastName', fieldName: 'lastName', name: 'Last Name' },
  { key: 'app1', fieldName: 'app1', name: 'App 1', requried: true, onRender: renderToggle },
  { key: 'app2', fieldName: 'app2', name: 'App 2', onRender: renderToggle },
  { key: 'app3', fieldName: 'app3', name: 'App 3', onRender: renderToggle },
  { key: 'app4', fieldName: 'app4', name: 'App 4', onRender: renderToggle },
];

const onSubmit = (vals) => console.log('submitting: ', vals.toJS());
const apps = ['app1', 'app2', 'app3', 'app4']; // TODO: API CALL.........
const listHeight = {
  margin: 120, // space for buttom buttons
};

export class PaasHome extends React.PureComponent {
  async componentDidMount() {
    const { initialize, onGetManagerDataRequest } = this.props;
    // TODO: CACHING....
    await onGetManagerDataRequest();
    await doneLoading(this);
    initialize(selectById(this.props.authorizations));
  }

  handleAuthorizeNew = () => {
    const { change, authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => { // TODO: TRACK NEW IDS???/
      apps.forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  handleAuthorizeAll = () => {
    const { change, authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => {
      apps.forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  render() {
    const {
      authorizationList,
      handleSubmit,
      pristine,
      reset,
      submitting,
      Loading,
    } = this.props;

    if (Loading) {
      return Loading;
    }

    // const messageProps = {
    //   messageBarType: MessageBarType.warning,
    //   children: `There are ${2} employees that require authorizations. Select 'Yes' or 'No' for each application.`,
    // };

    const listProps = {
      items: authorizationList.toJS(),
      columns,
      title: 'Access Authorizations',
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <MessageBar {...messageProps} /> */}

        <FormList {...listHeight}>
          <List {...listProps} />
        </FormList>

        <FormButtons {...buttonProps}>
          <DefaultButton
            primary
            split
            text={'Authorize All New'}
            onClick={this.handleAuthorizeNew}
            iconProps={{ iconName: 'approve' }}
            menuProps={{
              items: [
                {
                  key: 'authorizeAll',
                  name: 'Authorize All',
                  icon: 'approve',
                  onClick: this.handleAuthorizeAll,
                },
                {
                  key: 'denyNew',
                  name: 'Deny All New',
                  icon: 'deny',
                },
                {
                  key: 'denyAll',
                  name: 'Deny All',
                  icon: 'deny',
                },
              ],
            }}
          />
        </FormButtons>
      </Form>
    );
  }
}


const { object, node, bool, func } = PropTypes;

PaasHome.propTypes = {
  authorizationList: object.isRequired,
  authorizations: object.isRequired,
  Loading: node,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  change: func.isRequired,
  handleSubmit: func.isRequired,
  initialize: func.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  authorizationList: getAuthorizationList(),
  authorizations: getAuthorizations(),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
});

const withForm = reduxForm({
  form: 'paas',
  validate,
});

const withAppPage = appPage(PaasHome);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withForm,
  withConnect,
)(withAppPage);
