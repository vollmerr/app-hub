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
import { routes } from 'containers/AppHub/Router';
import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: ${theme.themeDarker};
  height: 100%;
  width: 100%;
`;

const App = styled(Link) `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3px;
  height: 102px;
  width: 102px;
  box-sizing: border-box;
  overflow: visible;
  transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;
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
          routes.map((route) => (
            <App key={route.key} to={route.path} href={route.href} onClick={this.props.onClick}>
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
  onClick: PropTypes.func.isRequired,
};

export default Apps;
