import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { REPORT } from 'containers/Spa/constants';
import { PieChart as Chart } from 'components/D3';
import { incrementRenderCount } from 'containers/AppHub/actions';
import theme from 'utils/theme';


export const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 5px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
`;


const measurements = {
  width: 300,
  height: 300,
};


export class PieChart extends React.PureComponent {
  render() {
    const {
      data,
      stats,
      onClick,
      hasData,
      selectedKey,
     } = this.props;

    const { pending, acknowledged } = stats;

    if (!hasData) {
      return (
        <Wrapper>No Data</Wrapper>
      );
    }

    const legend = [
      {
        key: REPORT.PENDING,
        text: `Pending: ${pending.count} (${pending.percent} %)`,
        onClick: () => onClick(REPORT.PENDING),
        checked: selectedKey === REPORT.PENDING,
      },
      {
        key: REPORT.PREVIOUS,
        text: `Acknowldged: ${acknowledged.count} (${acknowledged.percent} %)`,
        onClick: () => onClick(REPORT.PREVIOUS),
        checked: selectedKey === REPORT.PREVIOUS,
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
  selectedKey: number.isRequired,
  onClick: func.isRequired,
  hasData: bool.isRequired,
  data: array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incrementRenderCount(mode) {
    dispatch(incrementRenderCount('demo-piechart', mode));
  },
});

export default connect(null, mapDispatchToProps)(PieChart);
