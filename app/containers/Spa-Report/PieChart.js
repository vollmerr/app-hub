import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import { REPORT } from 'containers/Spa/constants';
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
    fill-opacity: 0.15;
    cursor: pointer;
  }
`;


export const Legend = styled.div`
  margin: 5px;
`;


export const Item = styled(ActionButton) `
  display:flex;
  padding: 5px;
`;


export const Color = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: ${(props) => props.color};
  border: 1px solid ${theme.themeDarker};
`;


class PieChart extends React.PureComponent {
  render() {
    const { chart, stats, onClick } = this.props;
    const { pending, acknowledged } = stats;

    return (
      <Wrapper>
        <Chart>{chart}</Chart>
        <Legend>
          <Item onClick={() => onClick(REPORT.PENDING)}><Color color={pending.color} />Pending: {pending.count} ({pending.percent} %)</Item>
          <Item onClick={() => onClick(REPORT.PREVIOUS)}><Color color={acknowledged.color} />Acknowldged: {acknowledged.count} ({acknowledged.percent} %)</Item>
        </Legend>
      </Wrapper>
    );
  }
}


const { node, shape, number, func } = PropTypes;

PieChart.propTypes = {
  chart: node,
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
};


export default PieChart;
