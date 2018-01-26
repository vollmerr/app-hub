import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { REPORT } from 'containers/Paas/constants';
import { PieChart as Chart } from 'components/D3';
import { incrementRenderCount } from 'containers/AppHub/actions';
import theme from 'utils/theme';


export const Wrapper = styled.div`
  flex: 2 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 5px;
  background: ${theme.white};
  box-shadow: 0 0 3px ${theme.neutralLight};
`;


const measurements = {
  width: 240,
  height: 240,
};


export class PieChart extends React.PureComponent {
  render() {
    const {
      data,
      stats,
      onClick,
      hasData,
      selectedKey,
     } = this.props;

    const { approved, denied, pending, noManager } = stats;

    if (!hasData) {
      return (
        <Wrapper>No Data</Wrapper>
      );
    }

    const legend = [
      {
        key: REPORT.APPROVED,
        text: `All Approved: ${approved.count} (${approved.percent} %)`,
        onClick: () => onClick(REPORT.APPROVED),
        checked: selectedKey === REPORT.APPROVED,
      },
      {
        key: REPORT.DENIED,
        text: `Any Denied: ${denied.count} (${denied.percent} %)`,
        onClick: () => onClick(REPORT.DENIED),
        checked: selectedKey === REPORT.DENIED,
      },
      {
        key: REPORT.PENDING,
        text: `Pending: ${pending.count} (${pending.percent} %)`,
        onClick: () => onClick(REPORT.PENDING),
        checked: selectedKey === REPORT.PENDING,
      },
      {
        key: REPORT.NO_MANAGER,
        text: `No Manager: ${noManager.count} (${noManager.percent} %)`,
        onClick: () => onClick(REPORT.NO_MANAGER),
        checked: selectedKey === REPORT.NO_MANAGER,
      },
    ];

    const chartProps = {
      data,
      legend,
      ...measurements,
      ...this.props,
    };

    return (
      <Wrapper>
        <Chart {...chartProps} />
      </Wrapper>
    );
  }
}


const { shape, number, func, bool, array } = PropTypes;

const stat = shape({
  count: number,
  percent: number,
}).isRequired;

PieChart.propTypes = {
  stats: shape({
    approved: stat,
    denied: stat,
    pending: stat,
    noManager: stat,
  }),
  selectedKey: number.isRequired,
  onClick: func.isRequired,
  hasData: bool.isRequired,
  data: array.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  incrementRenderCount(mode) {
    dispatch(incrementRenderCount('paas-piechart', mode));
  },
});

export default connect(null, mapDispatchToProps)(PieChart);
