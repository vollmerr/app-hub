/**
*
* AppPanel
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import theme from 'utils/theme';

const NavItems = styled(Nav) `
  background: ${theme.neutralLighterAlt};
  li > div {
    background: ${theme.neutralLighterAlt};

    a {
      text-decoration: none;
      display: block;

      &: hover,
      &: focus,
      &: active {
        background: ${theme.neutralLight};
      }
    }

    &:hover a,
    &.is-selected a {
      background: ${theme.neutralLight};
    }
  }
`;


class AppNav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { routes, onClick } = this.props;

    return (
      <NavItems
        groups={[{ links: routes }]}
        onRenderLink={(link) => (
          link.path ?
            <Link to={link.path} key={link.key} onClick={onClick}>{link.name}</Link> :
            <a href={link.href} key={link.key}>{link.name}</a>
        )}
      />
    );
  }
}

AppNav.propTypes = {

};

export default AppNav;
