import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { Form, FormButtons, FieldToggle } from 'components/Form';

import validate from './validate';


const renderToggle = (item, index, column) => {
  const props = {
    name: `${item.sid}[${column.key}]`,
    onText: 'Yes',
    offText: 'No',
  };

  return (
    <FieldToggle {...props} />
  );
};


const items = [
  { sid: 'sid 1', fullName: 'fullName 1', app1: 1, app2: 0, app3: 2, app4: 0 },
  { sid: 'sid 2', fullName: 'fullName 2', app1: 1, app2: 1, app3: 1, app4: 1 },
  { sid: 'sid 3', fullName: 'fullName 3', app1: 2, app2: 2, app3: 2, app4: 0 },
];

const columns = [
  { key: 'fullName', fieldName: 'fullName', name: 'Full Name' },
  { key: 'app1', fieldName: 'app1', name: 'App 1', requried: true, onRender: renderToggle },
  { key: 'app2', fieldName: 'app2', name: 'App 2', onRender: renderToggle },
  { key: 'app3', fieldName: 'app3', name: 'App 3', onRender: renderToggle },
  { key: 'app4', fieldName: 'app4', name: 'App 4', onRender: renderToggle },
];

const onSubmit = (vals) => console.log('submitting: ', vals.toJS());


export class PaasHome extends React.PureComponent {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      Loading,
    } = this.props;

    if (Loading) {
      return Loading;
    }

    const listProps = {
      items,
      columns,
      title: 'Authorizations',
    };

    const buttonProps = {
      reset,
      disabled: pristine || submitting,
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
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


const { node, bool, func } = PropTypes;

PaasHome.propTypes = {
  Loading: node,
  pristine: bool.isRequired,
  submitting: bool.isRequired,
  reset: func.isRequired,
  handleSubmit: func.isRequired,
};

const withForm = reduxForm({
  form: 'paas',
  validate,
});

const withAppPage = appPage(PaasHome);

export default compose(
  withForm,
)(withAppPage);
