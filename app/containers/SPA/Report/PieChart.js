import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Section from '../../../components/Layout/Section';
import { PieChart as Chart } from '../../../components/D3';
import theme from '../../../utils/theme';

import { incrementRenderCount } from '../../AppHub/actions';

import * as C from '../constants';


export const Wrapper = Section.extend`
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
  render() {
    const {
      data,
      dataKey,
      stats,
      onClick,
      hasData,
    } = this.props;

    const { pending, acknowledged } = stats;

    if (!hasData) {
      return (
        <Wrapper>No Data</Wrapper>
      );
    }

    const legend = [
      {
        key: C.REPORT.PENDING,
        text: `Pending: ${pending.count} (${pending.percent} %)`,
        onClick: () => onClick(C.REPORT.PENDING),
        checked: dataKey === C.REPORT.PENDING,
      },
      {
        key: C.REPORT.PREVIOUS,
        text: `Acknowldged: ${acknowledged.count} (${acknowledged.percent} %)`,
        onClick: () => onClick(C.REPORT.PREVIOUS),
        checked: dataKey === C.REPORT.PREVIOUS,
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

PieChart.propTypes = {
  data: array.isRequired,
  dataKey: number.isRequired,
  stats: shape({
    pending: shape({
      count: number,
      percent: number,
    }).isRequired,
    acknowledged: shape({
      count: number,
      percent: number,
    }).isRequired,
  }),
  onClick: func.isRequired,
  hasData: bool.isRequired,
};


export const mapDispatchToProps = (dispatch) => ({
  incrementRenderCount(mode) {
    dispatch(incrementRenderCount('demo-piechart', mode));
  },
});


export default connect(null, mapDispatchToProps)(PieChart);
