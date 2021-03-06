import React from 'react';
import styled from 'styled-components';

import AppTile from '../../../components/AppTile';
import { routesProp } from '../../../utils/propTypes';
import theme from '../../../utils/theme';


export const Wrapper = styled.div`
  max-width: calc(${theme.hub.numApps} * ${theme.hub.tileSize}px + ${(theme.hub.numApps) * 2} * 3px);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 102px;
  overflow: hidden;
  width: 100%;
  margin-top: 30px;
`;


class AppTiles extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        {
          this.props.routes.slice(0, theme.hub.numApps).map((route) => (
            <AppTile key={route.key} route={route} />
          ))
        }
      </Wrapper>
    );
  }
}

AppTiles.propTypes = {
  routes: routesProp.isRequired,
};


export default AppTiles;
