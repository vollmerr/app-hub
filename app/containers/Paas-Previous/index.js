import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-final-form';

import toJS from 'hocs/toJS';
import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { StyledForm, FieldToggle } from 'components/Form';
import { AUTH } from 'containers/Paas/constants';
import { previousColumns } from 'containers/Paas/data';
import * as selectors from 'containers/Paas/selectors';
import * as actions from 'containers/Paas/actions';

import FormList from './FormList';


const listHeight = {
  margin: 120, // space for buttom buttons
};


export class PaasPrevious extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      columns: this.buildColumns(previousColumns),
    };
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
    const initialValues = this.props.managerById;
    this.setState({ initialValues });
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
          };

          return (
            <FieldToggle {...toggleProps} />
          );
        },
      };
      return onRenders[column.data.render];
    }
    return undefined;
  }

  /**
   * Renders the form
   */
  renderForm = ({ handleSubmit }) => {
    const { managerItems } = this.props;
    const { columns } = this.state;

    const listProps = {
      columns,
      items: managerItems,
      title: 'Previous Staff Authorizations',
      sortBy: [AUTH.FULL_NAME],
    };

    return (
      <StyledForm onSubmit={handleSubmit}>
        <FormList {...listHeight}>
          <List {...listProps} />
        </FormList>
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
      initialValues,
      render: this.renderForm,
      onSubmit: () => {},
    };

    return (
      <Form {...formProps} />
    );
  }
}


const { object, array, node, func } = PropTypes;

PaasPrevious.propTypes = {
  onGetManagerDataRequest: func.isRequired, // eslint-disable-line
  managerItems: array.isRequired,
  managerById: object.isRequired, // eslint-disable-line
  Loading: node,
};

const mapStateToProps = createStructuredSelector({
  managerItems: selectors.getManagerItems('previous'),
  managerById: selectors.getManagerById('previous'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  appPage,
  toJS,
)(PaasPrevious);
