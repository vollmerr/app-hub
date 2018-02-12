import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/Layout/Section';
import { PieChart as Chart } from '../../../components/D3';
import theme from '../../../utils/theme';

import { incrementRenderCount } from '../../AppHub/actions';

import * as C from '../constants';


export const Wrapper = Section.extend`
  flex: 2 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: ${theme.hub.padding / 2}px;
`;


const measurements = {
  width: theme.chart.width,
  height: theme.chart.height,
};


export class PieChart extends React.PureComponent {
  handleClick = (key) => () => {
    this.props.onClick(key);
  }


  render() {
    const {
      data,
      dataKey,
      stats,
      hasData,
     } = this.props;

    const { approved, denied, pending, noManager } = stats;

    if (!hasData) {
      return (
        <Wrapper>No Data</Wrapper>
      );
    }

    const legend = [
      {
        key: C.REPORT.APPROVED,
        text: `All Approved: ${approved.count} (${approved.percent} %)`,
        onClick: this.handleClick(C.REPORT.APPROVED),
        checked: dataKey === C.REPORT.APPROVED,
      },
      {
        key: C.REPORT.DENIED,
        text: `Any Denied: ${denied.count} (${denied.percent} %)`,
        onClick: this.handleClick(C.REPORT.DENIED),
        checked: dataKey === C.REPORT.DENIED,
      },
      {
        key: C.REPORT.PENDING,
        text: `Pending: ${pending.count} (${pending.percent} %)`,
        onClick: this.handleClick(C.REPORT.PENDING),
        checked: dataKey === C.REPORT.PENDING,
      },
      {
        key: C.REPORT.NO_MANAGER,
        text: `No Manager: ${noManager.count} (${noManager.percent} %)`,
        onClick: this.handleClick(C.REPORT.NO_MANAGER),
        checked: dataKey === C.REPORT.NO_MANAGER,
      },
    ];

    const chartProps = {
      data,
      legend,
      ...measurements,
      ...this.props,
    };

    return (
      <Wrapper>
        <Chart {...chartProps} />
      </Wrapper>
    );
  }
}


const { shape, number, func, bool, array } = PropTypes;

const stat = shape({
  count: number,
  percent: number,
}).isRequired;

PieChart.propTypes = {
  data: array.isRequired,
  dataKey: number.isRequired,
  stats: shape({
    approved: stat,
    denied: stat,
    pending: stat,
    noManager: stat,
  }),
  hasData: bool.isRequired,
  onClick: func.isRequired,
};


export const mapDispatchToProps = (dispatch) => ({
  onIncrementRenderCount(mode) {
    dispatch(incrementRenderCount('paas-piechart', mode));
  },
});

export default connect(null, mapDispatchToProps)(PieChart);
