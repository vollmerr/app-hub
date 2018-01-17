import React from 'react';
import { connect } from 'react-redux';

import { PieChart } from 'components/D3';
import { incrementRenderCount } from 'containers/AppHub/actions';


const mockData = [
  [
    { key: 0, value: 10 },
    { key: 1, value: 64 },
    { key: 2, value: 34 },
  ], [
    { key: 0, value: 60 },
    { key: 1, value: 24 },
    { key: 2, value: 14 },
  ],
];

const measurements = {
  width: 200,
  height: 200,
};


class DemoPieChart extends React.Component {
  state = { index: 0 };

  render() {
    const buttonProps = {
      onClick: () => this.setState({ index: 1 - this.state.index }),
      children: 'Toggle Data',
    };

    const pieChartProps = {
      data: mockData[this.state.index],
      ...measurements,
      ...this.props,
    };

    return (
      <div>
        <h3>Example Pie Chart</h3>
        <button {...buttonProps} />
        <PieChart {...pieChartProps} />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  incrementRenderCount(mode) {
    dispatch(incrementRenderCount('demo-piechart', mode));
  },
});


export default connect(null, mapDispatchToProps)(DemoPieChart);
