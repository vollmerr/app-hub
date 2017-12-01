/* eslint-disable */
import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import styled from 'styled-components';

import theme from 'utils/theme';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';
import Section from 'components/App-Content/Section';


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - ${theme.hub.headerHeight} - ${theme.app.subNavHeight} - 20px);
  margin: 10px 0;
  width: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: calc(${theme.breakpoints.xs}px - 40px);
`;

const Right = styled.div`
  flex: 1;
  margin-bottom: 10px;
  width: 100%;
  min-width: calc(${theme.breakpoints.xs}px - 40px);
`;

const Chart = styled(Section) `
  flex: 2;
  margin: 5px;
  padding: 15px;

  .arc path {
    stroke: #333;
    stroke-width: 1px;
    stroke-opacity: 0.7;
  }

  .arc path:hover {
    fill-opacity: 0.3;
    cursor: pointer;
  }
`;

const ChartDetails = styled.div`

`;

const Details = styled(Section) `
  flex: 1;
  margin: 5px;
  padding: 15px;

  > h2 {
    margin: 0;
  }
`;

const UserList = styled(ListSection) `
  margin: 5px;
  height: 100%;
`;


export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: null,
    };
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, dataKey } = this.props;
    // do not compare props.chart as it gets updated in updateD3()
    if (
      data !== prevProps.data ||
      dataKey !== prevProps.dataKey
    ) {
      this.updateD3();
    }
  }

  onMouseOver = (data) => (d, i) => {
    clearTimeout(this.unsetTooltipTimeout);
    this.setTooltip(
      `Key: ${data[i].key}, Value: ${data[i].value}`
    );
  }

  onMouseOut = () => {
    this.unsetTooltipTimeout = setTimeout(() => this.setTooltip(null), 200);
  }

  setTooltip = (tooltip) => {
    this.setState({ tooltip });
  }

  updateD3 = () => {
    const { data, dataKey, connectFauxDOM, animateFauxDOM } = this.props;
    // data passed down
    const mappedData = d3.nest()
      .key((d) => d[dataKey])
      .rollup((v) => v.length)
      .entries(data);
    // reattach to faux dom and the svg
    const faux = connectFauxDOM('div', 'chart');
    const svg = d3.select(faux).select('svg');
    // init some vars
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    // set color of chart
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    // helper func for binding data as pie
    const pie = d3.pie()
      .sort(null)
      .value((d) => d.value);
    // helper func for setting path attribute as an arc
    const arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(0);
    // rejoin data
    const g = svg.select('g')
      .selectAll('.arc')
      .data(pie(mappedData));
    // remove old
    g.exit()
      .remove();
    // add new
    g.enter()
      .append('g')
      .attr('class', 'arc')
      .append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i))
      .each(function setAngle(d) { this.current = d; })  // store inital angles
      .on('mouseover', this.onMouseOver(mappedData))
      .on('mouseout', this.onMouseOut);
    // update exisitng paths
    g.select('path')
      .transition()
      .duration(500)
      .attrTween('d', arcTween)
      .style('fill', (d, i) => color(i));

    g.select('path')
      .on('mouseover', this.onMouseOver(mappedData))
      .on('mouseout', this.onMouseOut);

    // render update / animate
    animateFauxDOM(800);

    function arcTween(a) {
      const i = d3.interpolate(this.current, a);
      this.current = i(0);
      return (t) => arc(i(t));
    }
  }

  renderD3 = () => {
    const { data, dataKey, connectFauxDOM } = this.props;
    // data passed down
    const mappedData = d3.nest()
      .key((d) => d[dataKey])
      .rollup((v) => v.length)
      .entries(data);
    // attach to faux dom
    const faux = connectFauxDOM('div', 'chart');
    // init some vars
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    // set color of chart
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    // helper func for binding data as pie
    const pie = d3.pie()
      .sort(null)
      .value((d) => d.value);
    // helper func for setting path attribute as an arc
    const arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(0);
    // set up a svg > g contianer with width and height
    const svg = d3.select(faux).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    // set up arcs with data
    const g = svg.selectAll('.arc')
      .data(pie(mappedData))
      .enter().append('g')
      .attr('class', 'arc');
    // add a path to each arc, with the color based off index
    g.append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i))
      .each(function setAngle(d) { this.current = d; }) // store inital angle
      .on('mouseover', this.onMouseOver(mappedData))
      .on('mouseout', this.onMouseOut);
  }

  render() {
    const { chart, dataKey } = this.props;
    const { tooltip } = this.state;

    // TODO!
    const halfHeight = {
      vh: 50,
      margin: 18, // section margin (15) + 3 due to being in div (margin outside div)
    };

    return (
      <Wrapper>
        <Left>
          <Details>
            <h2>name of report goes here....</h2>
            Details of ack goes here....
          </Details>
          <Chart>
            {/* {chart} */}
            {/* {
              tooltip &&
              <p>{tooltip}</p>
            } */}
            <ChartDetails>
              <p>Pending: 1 billion</p>
              <p>Acknowldged: 0</p>
              <p>Total Acknowledged: 0 %</p>
            </ChartDetails>
          </Chart>
        </Left>
        <Right>
          <UserList {...halfHeight}>
            <List {...this.props.list} />
          </UserList>
        </Right>
      </Wrapper>
    );
  }
}

export default withFauxDOM(Report);
