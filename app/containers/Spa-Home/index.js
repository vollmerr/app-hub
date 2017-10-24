/**
 *
 * SpaHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';

import theme from 'utils/theme';
import Content from 'components/App-Content/Content';
import Section from 'components/App-Content/Section';
import List from 'components/List';

const aBunch = 5;
const aBunchOfRows = (x) => Array(aBunch).fill(0).reduce((o, v, i) => Object.assign(o, { [`col${i}`]: `row ${i}${x}` }, {}));
const aBunchOfItems = () => Array(aBunch).fill(0).map((x, i) => aBunchOfRows(i));

const columns = Object.keys(aBunchOfItems()[0]).map((key) => ({
  key,
  name: key,
  fieldName: key,
}));

const Active = styled(Section)`
  height: calc(50vh - ${theme.hub.headerHeight});
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(50vh - ${theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }
`;

const History = styled(Active)``;

const activeProps = {
  columns,
  title: 'Waiting Acknowledgement',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.hidden,
};
activeProps.items[2].col2 = 'x';
activeProps.items[1].col2 = 'x';

const historyProps = {
  columns,
  title: 'Previously Acknowledged',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.always,
};

export class SpaHome extends React.PureComponent {
  render() {
    return (
      <Content>
        <Active>
          <List {...activeProps} />
        </Active>
        <History>
          <List {...historyProps} />
        </History>
      </Content>
    );
  }
}

SpaHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(SpaHome);
