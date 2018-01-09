import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Form } from 'react-final-form';

import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { StyledForm, FormButtons, FieldToggle } from 'components/Form';
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

const onSubmit = (vals) => console.log('submitting: ', vals);
const apps = ['app1', 'app2', 'app3', 'app4']; // TODO: API CALL.........
const listHeight = {
  margin: 120, // space for buttom buttons
};

export class PaasHome extends React.PureComponent {
  state = { initialize: {} }

  componentDidMount() {
    this.initalizeForm();
  }

  initalizeForm = async () => {
    const { onGetManagerDataRequest } = this.props;
    // TODO: CACHING....
    await onGetManagerDataRequest();
    await doneLoading(this);
    this.setState({ initialize: selectById(this.props.authorizations) });
  }

  handleAuthorizeNew = (change) => () => {
    const { authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => { // TODO: TRACK NEW IDS???/
      apps.forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  handleAuthorizeAll = (change) => () => {
    const { authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => {
      apps.forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  renderForm = ({ handleSubmit, reset, submitting, pristine, change }) => {
    const { authorizationList } = this.props;

    const listProps = {
      items: authorizationList.toJS(),
      columns,
      title: 'Access Authorizations',
    };

    return (
      <StyledForm onSubmit={handleSubmit}>

        <FormList {...listHeight}>
          <List {...listProps} />
        </FormList>

        <FormButtons
          reset={reset}
          disabled={pristine || submitting}
        >
          <DefaultButton
            primary
            split
            text={'Authorize All New'}
            onClick={this.handleAuthorizeNew(change)}
            iconProps={{ iconName: 'approve' }}
            menuProps={{
              items: [
                {
                  key: 'authorizeAll',
                  name: 'Authorize All',
                  icon: 'approve',
                  onClick: this.handleAuthorizeAll(change),
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
      </StyledForm>
    );
  }

  render() {
    const { Loading } = this.props;
    const { initialize } = this.state;

    if (Loading) {
      return Loading;
    }

    const formProps = {
      onSubmit,
      validate,
      initialize,
      render: this.renderForm,
    };

    return (
      <Form {...formProps} />
    );
  }
}


const { object, node } = PropTypes;

PaasHome.propTypes = {
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
});

const withAppPage = appPage(PaasHome);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(withAppPage);
