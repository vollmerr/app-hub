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

  renderD3 = (mode) => {
    const { data, dataKey, connectFauxDOM, animateFauxDOM } = this.props;
    // rendering mode
    const render = mode === 'render';
    const resize = mode === 'resize';
    // d3 helpers
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
    // map data based off length of lists
    const mappedData = d3.nest()
      .key((d) => d[dataKey] ? REPORT.PREVIOUS : REPORT.PENDING)
      .rollup((v) => v.length)
      .entries(data);
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

    const arcs = svg.selectAll('path').data(pie(mappedData));
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
      .on('click', this.handleClick);

    arcs.exit().remove();

    arcs.transition().attrTween('d', arcTween);
    animateFauxDOM(800);
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
      hasData: Boolean(data.length),
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
