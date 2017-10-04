/**
*
* Apps
*
*/

import React from 'react';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import Link from 'components/Link';
import { routes } from 'containers/AppHub/Router';
import theme from 'utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: around;
  padding: 15px;
  background: ${theme.themeDarker};
  height: 100%;
`;

const App = styled(Link) `
  flex: 1;
  justify-content: center;
  padding: 12px;
  margin: 3px;
  height: 120px;
  box-sizing: border-box;
  text-align: center;
  overflow: visible;
  transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;
  pointer-events: all;
  font-size: ${(props) => props.size || '22px'};
  text-decoration: none;
  background: ${theme.themePrimary};

  &:hover {
    background: ${theme.white};
  }

  * {
    color: white;
  }

  &:hover * {
    color: ${theme.themePrimary}
  }
`;

const StyledIcon = styled(Icon) `
  font-size: 36px;
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
// iconProps={{ iconName: route.icon, style: { fontSize: '28px' } }}
Apps.propTypes = {

};

export default Apps;
