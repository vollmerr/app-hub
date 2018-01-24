import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import toJS from 'hocs/toJS';
import appPage from 'containers/App-Container/appPage';
import List from 'components/List';
import { StyledToggle } from 'components/Form/FieldToggle';
import { AUTH } from 'containers/Paas/constants';
import { previousColumns } from 'containers/Paas/data';
import * as selectors from 'containers/Paas/selectors';
import * as actions from 'containers/Paas/actions';


export class PaasPrevious extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.buildColumns(previousColumns),
    };
  }

  async componentDidMount() {
    const { onGetManagerDataRequest } = this.props;
    // TODO: CACHING....
    await onGetManagerDataRequest();
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
            disabled: true,
            readOnly: true,
          };

          return (
            <StyledToggle {...toggleProps} />
          );
        },
      };
      return onRenders[column.data.render];
    }
    return undefined;
  }


  render() {
    const { Loading, managerItems } = this.props;
    const { columns } = this.state;

    if (Loading) {
      return Loading;
    }

    const listProps = {
      columns,
      items: managerItems,
      title: 'Previous Staff Authorizations',
      sortBy: [AUTH.FULL_NAME],
    };

    return (
      <List {...listProps} />
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
