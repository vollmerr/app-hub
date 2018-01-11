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
import { APPROVAL, APPS } from 'containers/Paas/constants';
import { homeColumns } from 'containers/Paas/data';
import * as actions from 'containers/Paas/actions';

import FormList from './FormList';
import validate from './validate';

// TODO: MOVE COMMON RENDER UTIL
const onRenders = {
  renderToggle: (item, index, column) => {
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
};

const onSubmit = (vals) => console.log('submitting: ', vals);
const listHeight = {
  margin: 120, // space for buttom buttons
};

export class PaasHome extends React.PureComponent {
  state = {
    initialize: {},
    columns: homeColumns.map((col) => ({
      ...col,
      onRender: onRenders[col.data && col.data.render],
    })),
  };

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

  handleAuthorizeAll = (change) => () => {
    const { authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => {
      Object.values(APPS).forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.APPROVE);
      });
    });
  }

  handleDenyAll = (change) => () => {
    const { authorizations } = this.props;
    selectAllIds(authorizations).forEach((id) => { // TODO: TRACK NEW IDS???/
      Object.values(APPS).forEach((app) => {
        change(`${id}[${app}]`, APPROVAL.DENY);
      });
    });
  }

  renderForm = ({ handleSubmit, reset, submitting, pristine, change }) => {
    const { authorizationList } = this.props;
    const { columns } = this.state;

    const listProps = {
      columns,
      items: authorizationList.toJS(),
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
            text={'Authorize All'}
            onClick={this.handleAuthorizeAll(change)}
            iconProps={{ iconName: 'approve' }}
            menuProps={{
              items: [
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
