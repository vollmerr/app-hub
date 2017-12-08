import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import theme from 'utils/theme';


export const Wrapper = styled.div`
  flex: 2 calc(${theme.chart.height}px + 60px);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 5px;
  padding: 15px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
`;


export const Chart = styled.div`
  .arc path {
    stroke: ${theme.themeDarker};
    stroke-width: 1px;
  }

  .arc path:hover {
    fill-opacity: 0.2;
    cursor: pointer;
  }
`;


export const Legend = styled.div`
  margin: 5px;
`;


export const Item = styled.div`
  display:flex;
  align-items: center;
  padding: 5px;
`;


export const Color = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: ${(props) => theme.chart.colors[props.index]};
  border: 1px solid ${theme.themeDarker};
`;


class PieChart extends React.PureComponent {
  render() {
    const { chart, stats } = this.props;
    const { pending, acknowledged } = stats;

    return (
      <Wrapper>
        <Chart>{chart}</Chart>
        <Legend>
          <Item><Color index={0} />Pending: {pending.count} ({pending.percent} %)</Item>
          <Item><Color index={1} />Acknowldged: {acknowledged.count} ({acknowledged.percent} %)</Item>
        </Legend>
      </Wrapper>
    );
  }
}


const { object, shape, number } = PropTypes;

PieChart.propTypes = {
  chart: object,
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
};


export default PieChart;
