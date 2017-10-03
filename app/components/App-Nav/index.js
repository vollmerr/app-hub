/**
*
* AppPanel
*
*/

import React from 'react';
import styled from 'styled-components';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import { history } from 'configureStore';

import theme from 'utils/theme';

const NavItems = styled(Nav) `
  background: ${theme.neutralLighterAlt};
  li > div {
    background: ${theme.neutralLighterAlt};

    a {
      text-decoration: none;
      display: block;

      &:hover,
      &:focus,
      &:active {
        background: ${theme.neutralLight};
      }
    }

    &:hover a,
    &.is-selected a {
      background: ${theme.neutralLight};
    }
  }
`;

// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
class AppNav extends React.PureComponent {
  handleClickLink = (event, element) => {
    event.preventDefault();
    const { onClick } = this.props;

    if (onClick) {
      onClick(event, element);
    }

    const path = element.path || element.href;
    history.push(path);
  }

  render() {
    const { routes } = this.props;

    return (
      <NavItems
        groups={[{ links: routes }]}
        onLinkClick={this.handleClickLink.bind(this)} // eslint-disable-line
      />
    );
  }
}

AppNav.propTypes = {

};

export default AppNav;
