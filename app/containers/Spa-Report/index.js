import React from 'react';
import PropTypes from 'prop-types';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

import theme from 'utils/theme';
import { RECIPIENT, REPORT } from 'containers/Spa/constants';
import { reportColumns } from 'containers/Spa/data';

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
    this.mapData();
  }

  componentDidUpdate(prevProps) {
    const { data, dataKey } = this.props;
    // do not compare props.chart as it gets updated in updateD3()
    if (
      data !== prevProps.data ||
      dataKey !== prevProps.dataKey
    ) {
      this.mapData();
    }
  }

  mapData = () => {
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
    });
  }

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.setState({ selectedKey: Number(key) });
  }

  render() {
    const { data, dataKey, selectedItem, enums } = this.props;
    const { recipients, selectedKey } = this.state;
    // build stats for chart lengend
    const totalCount = data.length || 1;
    const pending = recipients[REPORT.PENDING];
    const acknowledged = recipients[REPORT.PREVIOUS];
    const pendingPercent = Math.round((pending.length / totalCount) * 100);
    const acknowldgedPercent = 100 - pendingPercent;

    const detailsProps = {
      enums,
      selectedItem,
    };

    const pieChartProps = {
      data,
      dataKey,
      selectedKey,
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
      columns: reportColumns[selectedKey],
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


const { object, any, array, string } = PropTypes;

SpaReport.propTypes = {
  enums: any,
  data: array.isRequired,
  dataKey: string.isRequired,
  selectedItem: object.isRequired,
};

export default SpaReport;
