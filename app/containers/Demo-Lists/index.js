import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';

import appPage from 'containers/App-Container/appPage';
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

const Hidden = styled(Section)`
  height: calc(33vh - ${theme.hub.headerHeight});
  overflow: hidden;

  .ms-Viewport {
    overflow: auto;
    height: calc(33vh - ${theme.hub.headerHeight} - ${theme.list.headerHeight} - 15px)
  }

  .ms-DetailsList {
    overflow: visible;
  }
`;

const Always = styled(Hidden)``;
const OnHover = styled(Hidden)``;


const hiddenProps = {
  columns,
  title: 'Example List with CheckboxVisibility hidden',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.hidden,
};

const alwaysProps = {
  columns,
  title: 'Example List with CheckboxVisibility always',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.always,
};

const onHoverProps = {
  columns,
  title: 'Example List with CheckboxVisibility onHover',
  items: aBunchOfItems(),
  checkboxVisibility: CheckboxVisibility.onHover,
};


export class DemoLists extends React.PureComponent {
  render() {
    return (
      <Content>
        <Hidden>
          <List {...hiddenProps} />
        </Hidden>
        <Always>
          <List {...alwaysProps} />
        </Always>
        <OnHover>
          <List {...onHoverProps} />
        </OnHover>
      </Content>
    );
  }
}


const { func } = PropTypes;

DemoLists.propTypes = {
  dispatch: func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withAppPage = appPage(DemoLists);

export default connect(null, mapDispatchToProps)(withAppPage);
