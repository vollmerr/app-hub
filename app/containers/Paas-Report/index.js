import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from 'hocs/toJS';
import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import { reportColumns } from 'containers/Paas/data';
import * as selectors from 'containers/Paas/selectors';
import * as actions from 'containers/Paas/actions';
import * as C from 'containers/Paas/constants';
import { StyledToggle } from 'components/Form/FieldToggle';

import Wrapper from './Wrapper';
import Section from './Section';
import Filters from './Filters';
import PieChart from './PieChart';
import Authorizations from './Authorizations';


const titles = {
  [C.REPORT.APPROVED]: 'Approved Authorizations',
  [C.REPORT.DENIED]: 'Denied Authorizations',
  [C.REPORT.PENDING]: 'Pending Authorizations',
  [C.REPORT.NO_MANAGER]: 'No Manager Listed',
};


export class PaasReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: C.REPORT.PENDING,
      authorizations: {
        all: [],
        [C.REPORT.APPROVED]: [],
        [C.REPORT.DENIED]: [],
        [C.REPORT.PENDING]: [],
        [C.REPORT.NO_MANAGER]: [],
      },
    };
  }

  async componentDidMount() {
    const { onGetReportDataRequest } = this.props;
    // TODO caching!
    onGetReportDataRequest();
    await doneLoading(this);
    this.mapData();
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

  mapData = () => {
    const { allItems, approvedItems, deniedItems, pendingItems, noManagerItems } = this.props;
    // TODO: filtering goes here, such as select app then filter by that app, etc
    // update with our new lists
    this.setState({
      authorizations: {
        all: allItems,
        [C.REPORT.APPROVED]: approvedItems,
        [C.REPORT.DENIED]: deniedItems,
        [C.REPORT.PENDING]: pendingItems,
        [C.REPORT.NO_MANAGER]: noManagerItems,
      },
    });
  }

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.setState({ selectedKey: Number(key) });
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
            checked: item[column.key],
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
    const { authorizations, selectedKey } = this.state;
    // build stats for chart lengend
    const totalCount = authorizations.all.length || 1;
    // percents for lists
    const approvedPercent = Math.round((authorizations[C.REPORT.APPROVED].length / totalCount) * 100);
    const deniedPercent = Math.round((authorizations[C.REPORT.DENIED].length / totalCount) * 100);
    const pendingPercent = Math.round((authorizations[C.REPORT.PENDING].length / totalCount) * 100);
    const noManagerPercent = 100 - approvedPercent - deniedPercent - pendingPercent;

    const filtersProps = {
      // enums,
      // selectedItem,
    };

    const pieChartProps = {
      data: [
        { key: C.REPORT.APPROVED, value: authorizations[C.REPORT.APPROVED].length },
        { key: C.REPORT.DENIED, value: authorizations[C.REPORT.DENIED].length },
        { key: C.REPORT.PENDING, value: authorizations[C.REPORT.PENDING].length },
        { key: C.REPORT.NO_MANAGER, value: authorizations[C.REPORT.NO_MANAGER].length },
      ],
      selectedKey,
      stats: {
        approved: {
          count: authorizations[C.REPORT.APPROVED].length,
          percent: approvedPercent,
        },
        denied: {
          count: authorizations[C.REPORT.DENIED].length,
          percent: deniedPercent,
        },
        pending: {
          count: authorizations[C.REPORT.PENDING].length,
          percent: pendingPercent,
        },
        noManager: {
          count: authorizations[C.REPORT.NO_MANAGER].length,
          percent: noManagerPercent,
        },
      },
      onClick: this.handleClick,
      hasData: Boolean(authorizations.all.length),
    };

    const authorizationsProps = {
      items: authorizations[selectedKey],
      columns: this.buildColumns(reportColumns[selectedKey]),
      title: titles[selectedKey],
      empty: {
        message: 'No Authorizations',
      },
      selectionMode: SelectionMode.none,
      compact: true,
    };

    return (
      <Wrapper>
        <Section>
          <Filters {...filtersProps} />
          <PieChart {...pieChartProps} />
        </Section>
        <Section flex={2}>
          <Authorizations {...authorizationsProps} />
        </Section>
      </Wrapper>
    );
  }
}


const { array, func } = PropTypes;

PaasReport.propTypes = {
  allItems: array.isRequired,
  approvedItems: array.isRequired,
  deniedItems: array.isRequired,
  pendingItems: array.isRequired,
  noManagerItems: array.isRequired,
  onGetReportDataRequest: func.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  allById: selectors.getAuthorizationsById(),
  allItems: selectors.getAuthorizationItems(),
  approvedItems: selectors.getReportItems('approved'),
  deniedItems: selectors.getReportItems('denied'),
  pendingItems: selectors.getReportItems('pending'),
  noManagerItems: selectors.getReportItems('noManager'),
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: () => dispatch(actions.getReportDataRequest()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  appPage,
  toJS,
)(PaasReport);
