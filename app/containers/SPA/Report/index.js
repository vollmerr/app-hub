import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

// import { RECIPIENT, REPORT } from '../constants';
// import { reportColumns } from '../data';

import toJS from '../../../hocs/toJS';
import Loading from '../../../components/Loading';


// import Wrapper from './Wrapper';
// import Section from './Section';
// import Details from './Details';
// import PieChart from './PieChart';
// import Recipients from './Recipients';
import * as hubSelectors from '../../AppHub/selectors';

import * as selectors from '../selectors';
import * as actions from '../actions';

// const titles = {
//   [REPORT.PENDING]: 'Pending Recipients',
//   [REPORT.PREVIOUS]: 'Acknowledged Recipients',
// };


export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  // mapData = () => {
  //   const { data } = this.props;
  //   const recipients = [[], []];
  //   // go through all recipients
  //   data.forEach((recipient) => {
  //     // if acknowledged,
  //     if (recipient[RECIPIENT.ACK_DATE]) {
  //       // add to acknowledged list
  //       recipients[REPORT.PREVIOUS].push(recipient);
  //     } else {
  //       // add to not acknowledged list
  //       recipients[REPORT.PENDING].push(recipient);
  //     }
  //   });
  //   // update with our new lists
  //   this.setState({
  //     data: [
  //       { key: REPORT.PENDING, value: recipients[REPORT.PENDING].length },
  //       { key: REPORT.PREVIOUS, value: recipients[REPORT.PREVIOUS].length },
  //     ],
  //     recipients,
  //   });
  // }

  // handleClick = (d) => {
  //   const key = d.data ? d.data.key : d;
  //   this.setState({ selectedKey: Number(key) });
  // }

  render() {
    const { app } = this.props;
    const { loading } = this.state;
    // LOADING
    if (app.loading || app.error || loading) {
      const loadingProps = {
        loading: app.loading || loading,
        error: app.error,
      };
      return <Loading {...loadingProps} />;
    }

    console.log(this.props.reportData);
    // const { dataKey, selectedItem, enums } = this.props;
    // const { data, recipients, selectedKey } = this.state;
    // // build stats for chart lengend
    // const pendingCount = recipients[REPORT.PENDING].length;
    // const acknowledgedCount = recipients[REPORT.PREVIOUS].length;
    // const totalCount = pendingCount + acknowledgedCount || 1;
    // const pendingPercent = Math.round((pendingCount / totalCount) * 100);
    // const acknowldgedPercent = 100 - pendingPercent;

    // const detailsProps = {
    //   enums,
    //   selectedItem,
    // };

    // const pieChartProps = {
    //   data,
    //   dataKey,
    //   selectedKey,
    //   stats: {
    //     pending: {
    //       count: pendingCount,
    //       percent: pendingPercent,
    //     },
    //     acknowledged: {
    //       count: acknowledgedCount,
    //       percent: acknowldgedPercent,
    //     },
    //   },
    //   onClick: this.handleClick,
    //   hasData: Boolean(data.some((x) => x.value)),
    // };

    // const recipientsProps = {
    //   items: recipients[selectedKey],
    //   columns: reportColumns[selectedKey],
    //   title: titles[selectedKey],
    //   empty: {
    //     message: 'No Recipients',
    //   },
    //   selectionMode: SelectionMode.none,
    // };

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
      <div>in report.........{JSON.stringify(this.props.reportData)}</div>
    );
  }
}


const { object } = PropTypes;

Report.propTypes = {
  app: object.isRequired,
  reportData: object,
  // enums: any,
  // data: array.isRequired,
  // dataKey: string.isRequired,
  // selectedItem: object.isRequired,
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
  // enums: selectors.getEnums,
  reportData: selectors.getReportData,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: (id) => dispatch(actions.getReportDataRequest(id)),
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
