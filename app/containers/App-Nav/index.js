/**
*
* AppPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import { history } from 'configureStore';

import theme from 'utils/theme';

const NavItems = styled(Nav) `
  background: ${theme.neutralLight};
  li > div {
    background: ${theme.neutralLight};

    a {
      text-decoration: none;
      display: block;

      &:hover,
      &:focus,
      &:active {
        background: ${theme.neutralTertiaryAlt};
      }
    }

    &:hover a,
    &.is-selected a {
      background: ${theme.neutralTertiaryAlt};
    }
  }
`;

// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
class AppNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
    };
  }

  componentDidMount() {
    // listen for changes on history, updated selected on change
    history.listen((location) => {
      const { routes } = this.props;
      this.getSelectedKey(routes, location);
    });
  }

  componentWillReceiveProps(nextProps) {
    // when mounted routes do not exist, and component is PureCOmponent must check here for route change
    if (nextProps !== this.props) {
      this.getSelectedKey(nextProps.routes, history.location);
      return true;
    }
    return false;
  }

  /**
   * Handles getting the key of the selected nav item
   */
  getSelectedKey = (routes, location) => {
    const index = routes.findIndex((route) => route.path === location.pathname);

    if (index > -1) {
      this.setState({
        selectedKey: routes[index].key,
      });
    }
  }

  /**
   * Handles clicking on a link in the nav
   */
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
    const { selectedKey } = this.state;

    return (
      <NavItems
        selectedKey={selectedKey}
        groups={[{ links: routes }]}
        onLinkClick={this.handleClickLink.bind(this)} // eslint-disable-line
      />
    );
  }
}

AppNav.propTypes = {
  routes: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default AppNav;
