import React from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom';
import styled, { css } from 'styled-components';
import _ from 'lodash';
import * as d3 from 'd3';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

import withD3Renderer from 'hocs/withD3Renderer';
import theme from 'utils/theme';


const LOADING = 'loading...';

// const Title = styled.div`
//   text-align: center;
//   position: relative;
//   top: -${({ height }) => height * 1 / 5}px;
// `;

export const Wrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;

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


export const LegendItem = styled(ActionButton) `
  display:flex;
  padding: 5px 10px;

  ${(props) => props.checked && css`
    box-shadow: 0 0 5px ${theme.themeDarker};
  `}

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border: 1px solid ${theme.themeDarker};
    background: ${(props) => d3.schemeCategory20c[props['data-key']]};
  }
`;


export class PieChart extends React.Component {
  // TODO: TOOLTIPS
  // state = {
  //   tooltip: null,
  // };

  // setTooltip = (text) => {
  //   this.setState({ tooltip: text });
  // }

  // computeTooltipContent = () => {
  //   const hoveredData = _.find(this.props.data, {
  //     name: this.state.tooltip,
  //   });

  //   return `${this.state.tooltip}: ${hoveredData}`;
  // }

  renderD3 = (mode) => {
    const {
      width,
      height,
      onClick,
      connectFauxDOM,
      animateFauxDOM,
    } = this.props;

    // rendering mode
    const render = mode === 'render';
    const resize = mode === 'resize';

    // d3 helpers
    const outerRadius = (Math.min(width, height) / 2) - 10;
    const innerRadius = 0;
    const data = _.cloneDeep(this.props.data); // pie() mutates data
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
    // define color scheme
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    // arc transitions, see https://bl.ocks.org/mbostock/1346410
    // do not use arrow function here as scope is the path element
    function arcTween(a) {
      const i = d3.interpolate(this.current, a);
      this.current = i(0);
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

    const arcs = svg.selectAll('path').data(pie(data));
    // add new data
    arcs
      .enter()
      .append('path')
      .style('fill', (d) => color(d.data.key))
      .attr('d', arc)
      .each(function (d) {
        // store the initial angles for transitions
        // do not use arrow function here as scope is the path element
        this.current = d;
      })
      .on('click', onClick);
      // TODO: TOOLTIPS
      // .on('mouseover', (d, i) => {
      //   clearTimeout(this.unsetTooltipTimeout);
      //   this.setTooltip(data[i].key);
      // })
      // .on('mouseout', () => {
      //   this.unsetTooltipTimeout = setTimeout(() => this.setTooltip(null), 200);
      // });
    // remove old data
    arcs.exit().remove();
    arcs.transition().attrTween('d', arcTween);
    animateFauxDOM(800);
  }

  render() {
    const { width, height, chart, legend } = this.props;

    return (
      <Wrapper width={width} height={height}>
        {chart}
        {
          legend &&
          <Legend>
            {
              legend.map((item) => (
                <LegendItem {...item} data-key={item.key} />
              ))
            }
          </Legend>
        }
      </Wrapper>
    );
  }
}


const { arrayOf, number, shape, func, any, string } = PropTypes;

PieChart.propTypes = {
  data: arrayOf(
    shape({
      key: number,
      value: number,
    })
  ),
  width: number,
  height: number,
  legend: arrayOf(
    shape({
      key: number,
      text: string,
    })
  ),
  onClick: func,
  chart: any.isRequired,
  connectFauxDOM: func.isRequired,
  animateFauxDOM: func.isRequired,
};

PieChart.defaultProps = {
  chart: LOADING,
};

export default withFauxDOM(
  withD3Renderer({ updateOn: ['data'] })(PieChart)
);
