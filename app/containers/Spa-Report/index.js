import React from 'react';
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import theme from 'utils/theme';
import { RECIPIENT, REPORT } from 'containers/Spa/constants';
import { reportPendingColumns } from 'containers/Spa/columns';

import Wrapper from './Wrapper';
import Section from './Section';
import Details from './Details';
import PieChart from './PieChart';
import Recipients from './Recipients';


const titles = [
  'Pending Recipients',
  'Acknowledged Recipients',
];


export class SpaReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: REPORT.PENDING,
      recipients: [[], []],
    };
  }

  componentDidMount() {
    this.mapData(this.renderD3, 'render');
  }

  componentDidUpdate(prevProps) {
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
        recipients[REPORT.PREVIOUS].push(recipient);
      } else {
        // add to not acknowledged list
        recipients[REPORT.PENDING].push(recipient);
      }
    });
    // update with our new lists
    this.setState({
      recipients,
    }, () => cb && cb(type));
  }

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.setState({ selectedKey: Number(key) });
  }

  renderD3 = (type) => {
    const { data, dataKey, connectFauxDOM, animateFauxDOM } = this.props;
    // data passed down
    const mappedData = d3.nest()
      .key((d) => d[dataKey] ? REPORT.PREVIOUS : REPORT.PENDING)
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
      .range(theme.chart.colors);
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
        .style('fill', (d) => color(Number(d.data.key)))
        .each(function setAngle(d) { this.current = d; }) // store inital angle
        .on('click', this.handleClick);
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
        .style('fill', (d) => color(Number(d.data.key)))
        .each(function setAngle(d) { this.current = d; })  // store inital angles
        .on('click', this.handleClick);
      // update exisitng paths
      g.select('path')
        .transition()
        .duration(500)
        .attrTween('d', arcTween)
        .style('fill', (d) => color(Number(d.data.key)));

      g.select('path')
        .on('click', this.handleClick);

      // render update / animate
      animateFauxDOM(800);

      function arcTween(a) { // eslint-disable-line
        const i = d3.interpolate(this.current, a);
        this.current = i(0);
        return (t) => arc(i(t));
      }
    }
  }

  render() {
    const { chart, data, selectedItem } = this.props;
    const { recipients, selectedKey } = this.state;
    // build stats for chart lengend
    const totalCount = data.length || 1;
    const pending = recipients[REPORT.PENDING];
    const acknowledged = recipients[REPORT.PREVIOUS];
    const pendingPercent = Math.round((pending.length / totalCount) * 100);
    const acknowldgedPercent = 100 - pendingPercent;

    const detailsProps = {
      selectedItem,
    };

    const pieChartProps = {
      chart,
      stats: {
        pending: {
          color: theme.chart.colors[REPORT.PENDING],
          count: pending.length,
          percent: pendingPercent,
        },
        acknowledged: {
          color: theme.chart.colors[REPORT.PREVIOUS],
          count: acknowledged.length,
          percent: acknowldgedPercent,
        },
      },
      onClick: this.handleClick,
    };

    const recipientsProps = {
      items: recipients[selectedKey],
      columns: reportPendingColumns,
      title: titles[selectedKey],
      empty: {
        message: 'No Recipients',
      },
      selectionMode: SelectionMode.none,
    };

    return (
      <Wrapper>
        <Section>
          <Details {...detailsProps} />
          <PieChart {...pieChartProps} />
        </Section>
        <Section>
          <Recipients {...recipientsProps} />
        </Section>
      </Wrapper>
    );
  }
}


const { object, array, func, string, node } = PropTypes;

SpaReport.propTypes = {
  chart: node,
  data: array.isRequired,
  dataKey: string.isRequired,
  selectedItem: object.isRequired,
  connectFauxDOM: func.isRequired,
  animateFauxDOM: func.isRequired,
};

export default withFauxDOM(SpaReport);
