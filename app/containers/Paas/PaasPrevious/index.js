import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import toJS from '../../../hocs/toJS';
import { shouldFetch } from '../../../utils/api';
import Loading from '../../../components/Loading';
import List from '../../../components/List';
import { StyledToggle } from '../../../components/Form/FieldToggle';
import { isNull } from '../../../utils/validate';

import * as hubSelectors from '../../AppHub/selectors';

import { previousColumns } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';


export class PaasPrevious extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.buildColumns(previousColumns),
    };
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
          const checked = isNull(item[column.key]) ? null : Number(item[column.key]);
          const toggleProps = {
            checked,
            onText: 'Yes',
            offText: 'No',
            isNullable: true,
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
    const { app, managerItems } = this.props;
    const { loading, columns } = this.state;

    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
        to: app.home.path,
      };
      return <Loading {...loadingProps} />;
    }

    const listProps = {
      columns,
      items: managerItems,
      title: 'Previous Staff Authorizations',
      sortBy: [C.AUTH.FULL_NAME],
    };

    return (
      <List {...listProps} />
    );
  }
}


const { object, array, func } = PropTypes;

PaasPrevious.propTypes = {
  app: object.isRequired,
  manager: object.isRequired,
  managerItems: array.isRequired,
  managerById: object.isRequired, // eslint-disable-line
  onGetManagerDataRequest: func.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  manager: selectors.getManager,
  managerItems: selectors.getManagerItems('previous'),
  managerById: selectors.getManagerById('previous'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetManagerDataRequest: () => dispatch(actions.getManagerDataRequest()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(PaasPrevious);
