import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';


import toJS from '../../../hocs/toJS';
import Loading from '../../../components/Loading';
import List from '../../../components/List';

// import Wrapper from './Wrapper';
// import Section from './Section';
import Details from './Details';
import PieChart from './PieChart';
// import Recipients from './Recipients';
import * as hubSelectors from '../../AppHub/selectors';

import { reportColumns } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

const titles = {
  [C.REPORT.PENDING]: 'Pending Recipients',
  [C.REPORT.PREVIOUS]: 'Acknowledged Recipients',
};


// const Wrapper = styled.div`

// `;


const RecipientList = styled(List) `

`;


export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chartData: [[], []],
      // selectedKey: REPORT.PENDING,
      // data: [],
      // recipients: [[], []],
    };
  }

  async componentDidMount() {
    const { match, onGetReportDataRequest } = this.props;
    // if (shouldFetch(report.lastFetchedById[id])) {
    await onGetReportDataRequest(match.params.id);
    // }
    this.setState({ loading: false }); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { reportData } = nextProps;
    // if there is report data, map it out to [{ key, value }, {...}]
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

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.props.onSetReportKey(key);
  }

  render() {
    const { app, report, reportData, enums } = this.props;
    const { loading, chartData } = this.state;
    // LOADING
    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
      };
      return <Loading {...loadingProps} />;
    }
    // build stats for chart lengend
    const pendingCount = reportData[C.REPORT.PENDING].length;
    const acknowledgedCount = reportData[C.REPORT.PREVIOUS].length;
    const totalCount = pendingCount + acknowledgedCount || 1;
    const pendingPercent = Math.round((pendingCount / totalCount) * 100);
    const acknowldgedPercent = 100 - pendingPercent;

    const { key, item } = report;

    const detailsProps = {
      item,
      enums,
    };

    const pieChartProps = {
      dataKey: key,
      data: chartData,
      stats: {
        pending: {
          count: pendingCount,
          percent: pendingPercent,
        },
        acknowledged: {
          count: acknowledgedCount,
          percent: acknowldgedPercent,
        },
      },
      onClick: this.handleClick,
      hasData: Boolean(chartData.some((x) => x.value)),
    };

    const recipientListProps = {
      items: reportData[key],
      columns: reportColumns[key],
      title: titles[key],
      empty: {
        message: 'No Recipients',
      },
      selectionMode: SelectionMode.none,
    };

    return (
      // <Wrapper>
      //   <Section>
      //     <Details {...detailsProps} />
      //     <PieChart {...pieChartProps} />
      //   </Section>
      //   <Section>
      //     <Recipients {...recipientsProps} />
      //   </Section>
      // </Wrapper>

      <div>
        <div>
          <Details {...detailsProps} />
          <PieChart {...pieChartProps} />
        </div>

        <div>
          <RecipientList {...recipientListProps} />
        </div>
      </div>
    );
  }
}


const { func, object } = PropTypes;

Report.propTypes = {
  app: object.isRequired,
  report: object,
  reportData: object,
  enums: object,
  // data: array.isRequired,
  // dataKey: string.isRequired,
  // selectedItem: object.isRequired,
  onGetReportDataRequest: func.isRequired,
  onSetReportKey: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  // // adminIsCached: selectors.getAdminIsCached(),
  // // recipientsById: selectors.getRecipientsById(),
  // // groupsById: selectors.getGroupsById(),
  // // targetGroupIds: selectors.getTargetGroupIds(),
  // // adminActiveItems: selectors.getAdminActiveItems(),
  // // adminPreviousItems: selectors.getAdminPreviousItems(),
  // // adminCachedIds: selectors.getAdminCachedIds(),

  app: hubSelectors.getApp,
  // admin: selectors.getAdmin,
  // adminActiveItems: selectors.geAdminItems('acksActive'),
  // adminPreviousItems: selectors.geAdminItems('acksPrevious'),
  report: selectors.getReport,
  reportData: selectors.getReportData,
  enums: selectors.getEnums,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: (id) => dispatch(actions.getReportDataRequest(id)),
  onSetReportKey: (key) => dispatch(actions.setReportKey(key)),
  // onGetAckRecipientsRequest: (item) => dispatch(actions.getAckRecipientsRequest(item)),
  // onNewAckRequest: (vals) => dispatch(actions.newAckRequest(vals)),
  // onDisableAckRequest: (item) => dispatch(actions.disableAckRequest(item)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  // withRouter,
  withConnect,
  toJS,
)(Report);
