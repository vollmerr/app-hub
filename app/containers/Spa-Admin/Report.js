/* eslint-disable */
import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import styled from 'styled-components';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import theme from 'utils/theme';
import ListSection from 'components/List/ListSection';
import List, { handleSelectItem } from 'components/List';
import Section from 'components/App-Content/Section';
import { RECIPIENT } from 'containers/Spa/constants';
import { reportPendingColumns } from 'containers/Spa/columns';

const colors = [theme.themePrimary, theme.themeDarker];

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - ${theme.hub.headerHeight} - ${theme.app.subNavHeight} - 20px);
  margin: 10px 0;
  width: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: calc(${theme.breakpoints.xs}px - 40px);
  min-height: 100%;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: calc(${theme.breakpoints.xs}px - 40px);
  min-height: 100%;
`;

const ChartSection = styled(Section) `
  flex: 2 calc(${theme.chart.height}px + 60px);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 5px;
  padding: 15px;
`;

const Chart = styled.div`
  .arc path {
    stroke: ${theme.themeDarker};
    stroke-width: 1px;
  }

  .arc path:hover {
    fill-opacity: 0.2;
    cursor: pointer;
  }
`;

const ChartDetails = styled.div`
  margin: 5px;
`;

const ChartDetailsItem = styled.div`
  display:flex;
  align-items: center;
  padding: 5px;
`;

const ChartDetailsItemColor = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: ${props => colors[props.index]};
  border: 1px solid ${theme.themeDarker};
`;

const ChartDetailsItemDesc = styled.div`
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
  flex: 1;
  margin: 5px;
`;

const PENDING = 0;
const ACK = 1;

export class Report extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: null,
      selectedKey: PENDING,
      recipients: [[], []],
    };
  }

  componentDidMount() {
    this.mapData(this.renderD3, 'render');
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, dataKey } = this.props;
    // do not compare props.chart as it gets updated in updateD3()
    if (
      data !== prevProps.data ||
      dataKey !== prevProps.dataKey
    ) {

      this.mapData(this.renderD3, 'update');
    }
  }

  mapData = (cb, type) => {
    const { data } = this.props;
    const recipients = [[], []];
    // go through all recipients
    data.forEach((recipient) => {
      // if acknowledged,
      if (recipient[RECIPIENT.ACK_DATE]) {
        // add to acknowledged list
        recipients[ACK].push(recipient);
      } else {
        // add to not acknowledged list
        recipients[PENDING].push(recipient);
      }
    });
    // update with our new lists
    this.setState({
      recipients,
    }, () => cb && cb(type));
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

  renderD3 = (type) => {
    const { data, dataKey, connectFauxDOM, animateFauxDOM } = this.props;
    // data passed down
    const mappedData = d3.nest()
      .key((d) => Boolean(d[dataKey]))
      .rollup((v) => v.length)
      .entries(data);
    // attach to faux dom
    const faux = connectFauxDOM('div', 'chart');
    // init some vars
    const width = theme.chart.width;
    const height = theme.chart.height;
    const radius = Math.min(width, height) / 2;
    // set color of chart
    const color = d3.scaleOrdinal()
      .domain([0, 1])
      .range(colors);
    // helper func for binding data as pie
    const pie = d3.pie()
      .sort(null)
      .value((d) => d.value);
    // helper func for setting path attribute as an arc
    const arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(0);
    // RENDERING
    if (type === 'render') {
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
    } else { // UPDATING
      const svg = d3.select(faux).select('svg');
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
  }

  render() {
    const { chart, data } = this.props;
    const { tooltip, recipients, selectedKey } = this.state;

    const halfHeight = {
      vh: 50,
      margin: 18, // section margin (15) + 3 due to being in div (margin outside div)
    };

    const totalCount = data.length || 1;
    const pending = recipients[PENDING];
    const acknowledged = recipients[ACK];
    const pendingPercent = Math.round((pending.length / totalCount) * 100);
    const acknowldgedPercent = Math.round((acknowledged.length / totalCount) * 100);


    const listProps = {
      items: recipients[selectedKey],
      columns: reportPendingColumns,
      title: 'Pending Acknowledgments',
      empty: {
        message: 'No Pending Acknowledgments',
      },
      selectionMode: SelectionMode.none,
    };

    return (
      <Wrapper>
        <Left>
          <Details>
            <h2>name of report goes here....</h2>
            Details of ack goes here....
          </Details>
          <ChartSection>
            <Chart>
              {chart}
            </Chart>
            {/* {
              tooltip &&
              <p>{tooltip}</p>
            } */}
            <ChartDetails>
              <ChartDetailsItem>
                <ChartDetailsItemColor index={0} />
                <ChartDetailsItemDesc>Pending: {pending.length} ({pendingPercent} %)</ChartDetailsItemDesc>
              </ChartDetailsItem>
              <ChartDetailsItem>
                <ChartDetailsItemColor index={1} />
                <ChartDetailsItemDesc>Acknowldged: {acknowledged.length} ({acknowldgedPercent} %)</ChartDetailsItemDesc>
              </ChartDetailsItem>
            </ChartDetails>
          </ChartSection>
        </Left>
        <Right>
          <UserList {...halfHeight}>
            <List {...listProps} />
          </UserList>
        </Right>
      </Wrapper>
    );
  }
}

export default withFauxDOM(Report);
