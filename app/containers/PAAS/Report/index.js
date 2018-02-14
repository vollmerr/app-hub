import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from '../../../hocs/toJS';
import Loading from '../../../components/Loading';
import { shouldFetch } from '../../../utils/api';
import List from '../../../components/List';
import { StyledToggle } from '../../../components/Form/FieldToggle';
import { isNull } from '../../../utils/validate';
import theme from '../../../utils/theme';

import * as hubSelectors from '../../AppHub/selectors';

import { reportColumns } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import Filters from './Filters';
import PieChart from './PieChart';


export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${theme.hub.padding / 2}px;
  min-height: calc(
    100vh - \
    ${theme.hub.headerHeight}px
  );
`;


export const Section = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  @media (min-width: ${theme.breakpoints.sm}px) {
    min-width: ${theme.breakpoints.sm - 40}px;
  }
`;


export const AuthorizationList = styled(List) `
  margin: ${theme.hub.padding / 2}px;
`;


const titles = {
  [C.REPORT.APPROVED]: 'Approved Authorizations',
  [C.REPORT.DENIED]: 'Denied Authorizations',
  [C.REPORT.PENDING]: 'Pending Authorizations',
  [C.REPORT.NO_MANAGER]: 'No Manager Listed',
};


export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      columns: this.buildColumns(reportColumns[this.props.report.key]),
      chartData: Object.keys(C.REPORT).map(() => ({})),
    };
  }

  async componentDidMount() {
    const { report, reportData, onGetReportDataRequest } = this.props;
    if (shouldFetch(report.lastFetched)) {
      await onGetReportDataRequest();
    }
    this.buildReportData(reportData);
    this.setState({ loading: false }); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { report, reportData } = nextProps;
    // adjust the columns to new values if they have been updated
    if (report.key !== this.props.report.key) {
      const columns = this.buildColumns(reportColumns[report.key]);
      this.setState({ columns });
    }
    // if there is report data, map it out to [{ key, value }, {...}]
    this.buildReportData(reportData);
  }

  componentWillUnmount() {
    // clear filters when leaving page
    this.props.onSetReportFilter();
  }

  buildReportData = (reportData) => {
    if (reportData) {
      const chartData = [];
      Object.values(C.REPORT).forEach((key) => {
        chartData[key] = {
          key,
          value: reportData[key].length,
        };
      });
      this.setState({ chartData });
    }
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

  handleClickReport = (d) => {
    const key = d.data ? d.data.key : d;
    this.props.onSetReportKey(key);
  }

  handleChangeFilter = (filter) => (field) => {
    this.props.onSetReportFilter({ [filter]: field.key });
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
    // const { authorizations, selectedKey, isLoading } = this.state;
    const { app, report, reportData } = this.props;
    const { loading, chartData, columns } = this.state;
    const isLoading = app.loading || loading;
    const { key } = report;
    // LOADING
    if (isLoading || app.error) {
      const loadingProps = {
        loading: isLoading,
        error: app.error,
        to: app.home.path,
      };
      return <Loading {...loadingProps} />;
    }
    // build stats for chart lengend
    const totalCount = report.data.all.length || 1;
    // percents for lists
    const approvedPercent = Math.round((reportData[C.REPORT.APPROVED].length / totalCount) * 100);
    const deniedPercent = Math.round((reportData[C.REPORT.DENIED].length / totalCount) * 100);
    const pendingPercent = Math.round((reportData[C.REPORT.PENDING].length / totalCount) * 100);
    const noManagerPercent = 100 - approvedPercent - deniedPercent - pendingPercent;

    const filterProps = {
      data: report.data.all,
      filteredData: reportData[key],
      onChange: this.handleChangeFilter,
    };

    const pieChartProps = {
      dataKey: key,
      data: chartData,
      stats: {
        approved: {
          count: reportData[C.REPORT.APPROVED].length,
          percent: approvedPercent,
        },
        denied: {
          count: reportData[C.REPORT.DENIED].length,
          percent: deniedPercent,
        },
        pending: {
          count: reportData[C.REPORT.PENDING].length,
          percent: pendingPercent,
        },
        noManager: {
          count: reportData[C.REPORT.NO_MANAGER].length,
          percent: noManagerPercent,
        },
      },
      hasData: Boolean(report.data.all),
      isAdmin: report.isAdmin,
      onClick: this.handleClickReport,
    };

    const authorizationListProps = {
      columns,
      items: reportData[key],
      title: titles[key],
      empty: {
        message: 'No Authorizations',
      },
      selectionMode: SelectionMode.none,
      compact: true,
    };

    return (
      <Wrapper>
        <Section>
          <Filters {...filterProps} />
          <PieChart {...pieChartProps} />
        </Section>
        <Section flex={2}>
          <AuthorizationList {...authorizationListProps} />
        </Section>
      </Wrapper>
    );
  }
}


const { object, func } = PropTypes;

Report.propTypes = {
  app: object.isRequired,
  report: object.isRequired,
  reportData: object,
  onGetReportDataRequest: func.isRequired, // eslint-disable-line
  onSetReportKey: func.isRequired,
  onSetReportFilter: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  report: selectors.getReport,
  reportData: selectors.getReportData,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: () => dispatch(actions.getReportDataRequest()),
  onSetReportKey: (key) => dispatch(actions.setReportKey(key)),
  onSetReportFilter: (filter) => dispatch(actions.setReportFilter(filter)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  toJS,
)(Report);
