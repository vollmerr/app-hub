/**
*
* AppPanel
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { history } from 'configureStore';

import Items from './Items';

// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
class AppNav extends React.PureComponent {
  static history;

  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
    };
  }

  componentDidMount() {
    // listen for changes on history, updated selected on change
    this.history = history.listen((location) => {
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

  componentWillUnmount() {
    // unlisten from history when unmounted (so not trying to update state on unmounted component)
    this.history();
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
    const { routes, isMobile } = this.props;
    const { selectedKey } = this.state;

    return (
      <Items
        isMobile={isMobile}
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
  isMobile: PropTypes.bool.isRequired,
};

export default AppNav;
