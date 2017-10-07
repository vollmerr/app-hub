import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import Link from 'components/Link';
import theme from 'utils/theme';

const App = styled(Link) `
  display: flex;
  float: left;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3px;
  height: 102px;
  width: 102px;
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
    color: ${theme.themePrimary};
  }
`;

const StyledIcon = styled(Icon) `
  font-size: 26px;
`;

const Text = styled.div`
  display: table;
`;

class AppTile extends React.PureComponent {
  render() {
    const { onClick, route } = this.props;
    const { path, href, name, icon } = route;

    return (
      <App to={path} href={href} onClick={onClick}>
        <StyledIcon iconName={icon} />
        <Text>{name}</Text>
      </App>
    );
  }
}

AppTile.propTypes = {
  onClick: PropTypes.func,
  route: PropTypes.object.isRequired,
};

export default AppTile;
