/**
*
* Apps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import Link from 'components/Link';
import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 102px;
  overflow: hidden;
  width: 100%;
  margin-top: 30px;
`;

const App = styled(Link) `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3px;
  height: ${theme.hub.tileSize};
  width: ${theme.hub.tileSize};
  box-sizing: border-box;
  overflow: visible;
  transition: .25s ease;
  pointer-events: all;
  font-size: ${(props) => props.size || '18px'};
  text-decoration: none;
  background: ${theme.themeDarkAlt};
  box-shadow: 0 0 2px ${theme.themeDarkAlt};

  &:hover {
    background: ${theme.white};
    box-shadow: 0 0 5px ${theme.white};
  }

  * {
    color: white;
    display: flex;
  }

  &:hover * {
    color: ${theme.themeDark}
  }
`;

const StyledIcon = styled(Icon) `
  font-size: 26px;
`;

class Apps extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        {
          this.props.routes.map((route) => (
            <App key={route.key} to={route.path} href={route.href}>
              <StyledIcon iconName={route.icon} />
              <div>{route.name}</div>
            </App>
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
