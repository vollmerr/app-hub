import React from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import styled, { css } from 'styled-components';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import { REPORT } from 'containers/Spa/constants';
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


export const Chart = styled.div`
  path {
    stroke: ${theme.themeDarker};
    stroke-width: 1px;
  }

  path:hover {
    fill-opacity: 0.15;
    cursor: pointer;
  }
`;


export const Legend = styled.div`
  margin: 5px;
`;


export const Item = styled(ActionButton) `
  display:flex;
  padding: 5px 10px;
  ${(props) => props.checked && css`
    box-shadow: 0 0 5px ${theme.themeDarker};
  `}
`;


export const Color = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: ${(props) => props.color};
  border: 1px solid ${theme.themeDarker};
`;


export class PieChart extends React.PureComponent {
  componentDidMount() {
    this.renderD3('render');
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    // do not compare props.chart as it gets updated in updateD3()
    // TODO: deep equal
    if (data !== prevProps.data) {
      this.renderD3('update');
    }
  }

  renderD3 = (mode) => {
    const {
      data,
      onClick,
      connectFauxDOM,
      animateFauxDOM,
    } = this.props;
    // rendering mode
    const render = mode === 'render';
    const resize = mode === 'resize';
    // d3 helpers
    // TODO: pass width/height as props
    const width = theme.chart.width;
    const height = theme.chart.height;
    const outerRadius = (Math.min(width, height) / 2) - 10;
    const innerRadius = 0;
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
    // define color scheme
    const color = d3.scaleOrdinal()
      .domain([0, 1])
      .range(theme.chart.colors);
    // map data based off length of lists -> MAPPED IN PARENT - TODO: REMOVE / clean
    // const mappedData = d3.nest()
    //   .key((d) => d[dataKey] ? REPORT.PREVIOUS : REPORT.PENDING)
    //   .rollup((v) => v.length)
    //   .entries(data);
    // arc transitions, see https://bl.ocks.org/mbostock/1346410
    // do not use arrow function here as scope is the path element
    function arcTween(a) {
      const i = d3.interpolate(this._current, a); // eslint-disable-line
      this._current = i(0); // eslint-disable-line
      return (t) => arc(i(t));
    }
    // create a faux div and store its virtual DOM in state.chart
    const faux = connectFauxDOM('div', 'chart');

    let svg;
    if (render) {
      svg = d3
        .select(faux)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    } else if (resize) {
      svg = d3
        .select(faux)
        .select('svg')
        .attr('width', width)
        .attr('height', height)
        .select('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    } else {
      svg = d3.select(faux).select('svg').select('g');
    }

    // const arcs = svg.selectAll('path').data(pie(mappedData));
    const arcs = svg.selectAll('path').data(pie(data));

    arcs
      .enter()
      .append('path')
      .style('fill', (d) => color(Number(d.data.key)))
      .attr('d', arc)
      .each(function (d) { // eslint-disable-line
        // store the initial angles for transitions
        // do not use arrow function here as scope is the path element
        this._current = d; // eslint-disable-line
      })
      .on('click', onClick);

    arcs.exit().remove();

    arcs.transition().attrTween('d', arcTween);
    animateFauxDOM(200);
  }

  render() {
    const {
      chart,
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

    const pendingText = `Pending: ${pending.count} (${pending.percent} %)`;
    const ackText = `Acknowldged: ${acknowledged.count} (${acknowledged.percent} %)`;

    const pendingItem = {
      onClick: () => onClick(REPORT.PENDING),
      checked: selectedKey === REPORT.PENDING,
    };

    const ackItem = {
      onClick: () => onClick(REPORT.PREVIOUS),
      checked: selectedKey === REPORT.PREVIOUS,
    };

    return (
      <Wrapper>
        <Chart>{chart}</Chart>
        <Legend>
          <Item {...pendingItem}><Color color={pending.color} />{pendingText}</Item>
          <Item {...ackItem}><Color color={acknowledged.color} />{ackText}</Item>
        </Legend>
      </Wrapper>
    );
  }
}


const { node, shape, number, func, bool, array, string } = PropTypes;

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
  selectedKey: number.isRequired,
  onClick: func.isRequired,
  hasData: bool.isRequired,
  data: array.isRequired,
  dataKey: string.isRequired,
  connectFauxDOM: func.isRequired,
  animateFauxDOM: func.isRequired,
};


export default withFauxDOM(PieChart);
