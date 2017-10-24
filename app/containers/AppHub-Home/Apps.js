/**
*
* Apps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AppTile from 'components/AppHub-Panel/AppTile';
import theme from 'utils/theme';

export const Wrapper = styled.div`
  max-width: calc(${theme.hub.numApps} * ${theme.hub.tileSize} + ${(theme.hub.numApps) * 2} * 3px);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 102px;
  overflow: hidden;
  width: 100%;
  margin-top: 30px;
`;


class Apps extends React.PureComponent {
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

Apps.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Apps;
