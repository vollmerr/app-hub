import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import json2csv from 'json2csv';

import toJS from '../../../hocs/toJS';
import Loading from '../../../components/Loading';
import { downloadFile, formatList } from '../../../utils/data';
import { formattedDate } from '../../../utils/date';
import { shouldFetch } from '../../../utils/api';
import List from '../../../components/List';
import theme from '../../../utils/theme';

import LoadCommandBar from '../../App/LoadCommandBar';
import * as hubSelectors from '../../AppHub/selectors';

import { reportColumns, adminCsv, recipient } from '../data';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as C from '../constants';

import PieChart from './PieChart';
import Details from './Details';
import DisableModal from './DisableModal';
import EmailModal from './EmailModal';


export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: ${theme.hub.padding / 2}px;
  min-height: calc(
    100vh - \
    ${theme.hub.headerHeight}px - \
    ${theme.app.commandBarHeight}px
  );
`;


export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 250px;

  @media (min-width: ${theme.breakpoints.sm}px) {
    min-width: ${theme.breakpoints.sm - 40}px;
  }
`;


export const RecipientList = styled(List) `
  margin: ${theme.hub.padding / 2}px;
`;


const titles = {
  [C.REPORT.PENDING]: 'Pending Recipients',
  [C.REPORT.PREVIOUS]: 'Acknowledged Recipients',
};

const modal = {
  email: 'email',
  disable: 'disable',
};


export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modals: {
        [modal.email]: false,
        [modal.disable]: false,
      },
      chartData: [[], []],
    };
  }

  async componentDidMount() {
    const { match, report, onGetReportDataRequest } = this.props;
    const id = match.params.id;
    if (shouldFetch(report.lastFetchedById[id])) {
      await onGetReportDataRequest(match.params.id);
    }
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

  // items to display in command bar by default
  getCommands = () => {
    const { report } = this.props;
    // add back button, naviagtes to admin page
    const items = [{
      key: 'back',
      name: 'Back',
      icon: 'navBack',
      ariaLabel: 'Back to Admin Page',
      onClick: this.handleBack,
    }];

    // is NOT in pending status
    if (report.item[C.ACK.STATUS] !== C.STATUS.PENDING) {
      // add cancel button
      items.push({
        key: 'download',
        name: 'Download',
        icon: 'download',
        ariaLabel: 'Download Report',
        onClick: this.handleDownload,
      });
    }

    // is in pending status
    if (report.item[C.ACK.STATUS] === C.STATUS.PENDING) {
      // add cancel button
      items.push({
        key: 'cancel',
        name: 'Cancel',
        icon: 'Clear',
        ariaLabel: 'Cancel Pending Acknowledgment',
        onClick: this.handleShowModal(modal.disable),
      });
    }

    // is in active status
    if (report.item[C.ACK.STATUS] === C.STATUS.ACTIVE) {
      // add disable button
      items.push({
        key: 'disable',
        name: 'Disable',
        icon: 'Clear',
        ariaLabel: 'Disable Exisiting Acknowledgment',
        onClick: this.handleShowModal(modal.disable),
      });
      // add email button
      items.push({
        key: 'email',
        name: 'Email',
        icon: 'email',
        ariaLabel: 'Email acknowledgment recipients',
        onClick: this.handleShowModal(modal.email),
      });
    }
    return { items };
  }

  // handles navigating back to the admin page
  handleBack = () => {
    const { history } = this.props;
    history.push('/spa/admin');
  }

  // handles downloading the csv export
  handleDownload = () => {
    const { report, reportData } = this.props;
    const csv = json2csv({ data: formatList(reportData[report.key], recipient), newLine: '\r\n', ...adminCsv });
    const name = `${report.item[C.ACK.TITLE]} - ${formattedDate(new Date())}.csv`;
    const type = 'data:text/csv;charset=utf-8;';

    downloadFile(csv, name, type);
  }

  // handles displaying a modal by name
  handleShowModal = (name) => () => {
    this.setState({ modals: { ...this.state.modals, [name]: true } });
  }

  // handles hiding a modal by name
  handleHideModal = (name) => () => {
    this.setState({ modals: { ...this.state.modals, [name]: false } });
  }

  // hadnles submitting a disable
  handleSubmitDisable = () => {
    const { report, onDisableAckRequest } = this.props;
    onDisableAckRequest(report.item);
    this.handleHideModal(modal.disable)();
  }

  // handles clicking on the report or legend to swicth the key
  handleClickReport = (d) => {
    const key = d.data ? d.data.key : d;
    this.props.onSetReportKey(key);
  }

  render() {
    const { app, report, reportData, enums, setCommandBar } = this.props;
    const { loading, chartData, modals } = this.state;
    const isLoading = app.loading || loading;
    const { key, item } = report;
    // LOADING
    if (isLoading || app.error) {
      const loadingProps = {
        loading: isLoading,
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
      onClick: this.handleClickReport,
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
      style: {
        padding: theme.hub.padding + theme.app.commandBarHeight,
      },
    };

    const disableProps = {
      item,
      type: item[C.ACK.STATUS] === C.STATUS.PENDING ? 'cancel' : 'disable',
      hidden: !modals.disable,
      onClose: this.handleHideModal(modal.disable),
      onSubmit: this.handleSubmitDisable,
    };

    const emailProps = {
      item,
      hidden: !modals.email,
      recipients: reportData[key],
      onClose: this.handleHideModal(modal.email),
      onSubmit: this.handleSubmitEmail,
    };

    const commandBarProps = {
      setCommandBar,
      commandBar: this.getCommands(),
      disabled: isLoading || app.error,
    };

    return (
      <Wrapper>
        <Section>
          <Details {...detailsProps} />
          <PieChart {...pieChartProps} />
        </Section>
        <Section>
          <RecipientList {...recipientListProps} />
        </Section>

        <DisableModal {...disableProps} />
        <EmailModal {...emailProps} />

        <LoadCommandBar {...commandBarProps} />
      </Wrapper>
    );
  }
}


const { func, object } = PropTypes;

Report.propTypes = {
  app: object.isRequired,
  report: object.isRequired,
  reportData: object,
  enums: object,
  onGetReportDataRequest: func.isRequired, // eslint-disable-line
  onSetReportKey: func.isRequired,
  onDisableAckRequest: func.isRequired,
  setCommandBar: func.isRequired,
  history: object.isRequired,
  match: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: hubSelectors.getApp,
  report: selectors.getReport,
  reportData: selectors.getReportData,
  enums: selectors.getEnums,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetReportDataRequest: (id) => dispatch(actions.getReportDataRequest(id)),
  onSetReportKey: (key) => dispatch(actions.setReportKey(key)),
  onDisableAckRequest: (item) => dispatch(actions.disableAckRequest(item)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(Report);
