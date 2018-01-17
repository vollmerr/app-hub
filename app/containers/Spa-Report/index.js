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


const titles = {
  [REPORT.PENDING]: 'Pending Recipients',
  [REPORT.PREVIOUS]: 'Acknowledged Recipients',
};


export class SpaReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: REPORT.PENDING,
      data: [],
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
      data: [
        { key: REPORT.PENDING, value: recipients[REPORT.PENDING].length },
        { key: REPORT.PREVIOUS, value: recipients[REPORT.PREVIOUS].length },
      ],
      recipients,
    });
  }

  handleClick = (d) => {
    const key = d.data ? d.data.key : d;
    this.setState({ selectedKey: Number(key) });
  }

  render() {
    const { dataKey, selectedItem, enums } = this.props;
    const { data, recipients, selectedKey } = this.state;
    // build stats for chart lengend
    const pendingCount = recipients[REPORT.PENDING].length;
    const acknowledgedCount = recipients[REPORT.PREVIOUS].length;
    const totalCount = pendingCount + acknowledgedCount || 1;
    const pendingPercent = Math.round((pendingCount / totalCount) * 100);
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
          count: pendingCount,
          percent: pendingPercent,
        },
        acknowledged: {
          count: acknowledgedCount,
          percent: acknowldgedPercent,
        },
      },
      onClick: this.handleClick,
      hasData: Boolean(data.some((x) => x.value)),
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
