import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import toJS from 'hocs/toJS';
import { doneLoading } from 'utils/request';
import appPage from 'containers/App-Container/appPage';
import { REPORT } from 'containers/Paas/constants';
import { reportColumns } from 'containers/Paas/data';
import * as selectors from 'containers/Paas/selectors';
import * as actions from 'containers/Paas/actions';

import Wrapper from './Wrapper';
import Section from './Section';
import Filters from './Filters';
import PieChart from './PieChart';
import Authorizations from './Authorizations';


const titles = {
  [REPORT.APPROVED]: 'Approved Authorizations',
  [REPORT.DENIED]: 'Denied Authorizations',
  [REPORT.PENDING]: 'Pending Authorizations',
};


export class PaasReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: REPORT.PENDING,
      authorizations: {
        all: [],
        [REPORT.APPROVED]: [],
        [REPORT.DENIED]: [],
        [REPORT.PENDING]: [],
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

  // componentDidUpdate(prevProps) {
  //   const { data, dataKey } = this.props;
  //   // do not compare props.chart as it gets updated in updateD3()
  //   if (
  //     data !== prevProps.data ||
  //     dataKey !== prevProps.dataKey
  //   ) {
  //     this.mapData();
  //   }
  // }

  mapData = () => {
    const { allList, approvedList, deniedList, pendingList } = this.props;
    // TODO: filtering goes here, such as select app then filter by that app, etc
    // update with our new lists
    this.setState({
      authorizations: {
        all: allList,
        [REPORT.APPROVED]: approvedList,
        [REPORT.DENIED]: deniedList,
        [REPORT.PENDING]: pendingList,
      },
    });
  }

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.setState({ selectedKey: Number(key) });
  }

  render() {
    // const { data, dataKey, selectedItem, enums } = this.props;
    const { authorizations, selectedKey } = this.state;
    // build stats for chart lengend
    const totalCount = authorizations.all.length || 1;
    // percents for lists
    const approvedPercent = Math.round((authorizations[REPORT.APPROVED].length / totalCount) * 100);
    const deniedPercent = Math.round((authorizations[REPORT.DENIED].length / totalCount) * 100);
    const pendingPercent = 100 - approvedPercent - deniedPercent;

    const filtersProps = {
      // enums,
      // selectedItem,
    };

    const pieChartProps = {
      data: [
        { key: REPORT.APPROVED, value: authorizations[REPORT.APPROVED].length },
        { key: REPORT.DENIED, value: authorizations[REPORT.DENIED].length },
        { key: REPORT.PENDING, value: authorizations[REPORT.PENDING].length },
      ],
      selectedKey,
      stats: {
        approved: {
          count: authorizations[REPORT.APPROVED].length,
          percent: approvedPercent,
        },
        denied: {
          count: authorizations[REPORT.DENIED].length,
          percent: deniedPercent,
        },
        pending: {
          count: authorizations[REPORT.PENDING].length,
          percent: pendingPercent,
        },
      },
      onClick: this.handleClick,
      hasData: Boolean(authorizations.all.length),
    };

    const authorizationsProps = {
      items: authorizations[selectedKey],
      columns: reportColumns[selectedKey],
      title: titles[selectedKey],
      empty: {
        message: 'No Authorizations',
      },
      selectionMode: SelectionMode.none,
    };

    return (
      <Wrapper>
        <Section>
          <Filters {...filtersProps} />
          <PieChart {...pieChartProps} />
        </Section>
        <Section>
          <Authorizations {...authorizationsProps} />
        </Section>
      </Wrapper>
    );
  }
}


const { array, func } = PropTypes;

PaasReport.propTypes = {
  allList: array.isRequired,
  approvedList: array.isRequired,
  deniedList: array.isRequired,
  pendingList: array.isRequired,
  onGetReportDataRequest: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allList: selectors.getAuthorizationList(),
  approvedList: selectors.getReportList('approved'),
  deniedList: selectors.getReportList('denied'),
  pendingList: selectors.getReportList('pending'),
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
