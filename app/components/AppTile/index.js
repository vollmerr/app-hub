import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import theme from '../../utils/theme';

import Link from '../Link';


export const App = styled(Link) `
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


export const StyledIcon = styled(Icon) `
  font-size: 26px;
`;


export const Text = styled.div`
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


const { func, string, shape } = PropTypes;

AppTile.propTypes = {
  onClick: func,
  route: shape({
    key: string,
    href: string,
    path: string,
    name: string,
    icon: string,
  }).isRequired,
};


export default AppTile;
