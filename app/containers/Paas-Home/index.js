import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { Form, FormButtons, FieldToggle } from 'components/Form';
import { getAuthorizations, getAuthorizationList, selectById } from 'containers/Paas/selectors';

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
  { key: 'fullName', fieldName: 'fullName', name: 'Full Name' },
  { key: 'app1', fieldName: 'app1', name: 'App 1', requried: true, onRender: renderToggle },
  { key: 'app2', fieldName: 'app2', name: 'App 2', onRender: renderToggle },
  { key: 'app3', fieldName: 'app3', name: 'App 3', onRender: renderToggle },
  { key: 'app4', fieldName: 'app4', name: 'App 4', onRender: renderToggle },
];

const onSubmit = (vals) => console.log('submitting: ', vals.toJS());


export class PaasHome extends React.PureComponent {
  componentDidMount() {
    const { initialize, authorizations } = this.props;
    initialize(selectById(authorizations));
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

    const messageProps = {
      messageBarType: MessageBarType.warning,
      children: `There are ${2} employees that require authorizations. Select 'Yes' or 'No' for each application.`,
    };

    const listProps = {
      items: authorizationList.toJS(),
      columns,
      title: 'Authorizations',
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <MessageBar {...messageProps} />

        <List {...listProps} />

        <FormButtons {...buttonProps}>
          <DefaultButton
            primary
            text={'Authorize All'}
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
  handleSubmit: func.isRequired,
  initialize: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authorizationList: getAuthorizationList(),
  authorizations: getAuthorizations(),
});

export const mapDispatchToProps = () => ({});

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
