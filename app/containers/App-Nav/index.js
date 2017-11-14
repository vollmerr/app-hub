import React from 'react';
import PropTypes from 'prop-types';

import { history } from 'configureStore';

import { routesProp } from 'utils/propTypes';

import Items from './Items';


// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
class AppNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
    };
  }

  componentDidMount() {
    const { appRoutes } = this.props;
    // initalize to exisiting location
    this.getSelectedKey(appRoutes, history.location);
    // listen for changes on history, updated selected on change
    /* istanbul ignore next */
    this.history = history.listen((location) => {
      this.getSelectedKey(this.props.appRoutes, location); // use this.props to get new reference
    });
  }

  componentWillReceiveProps(nextProps) {
    // when mounted routes do not exist, and component is PureCOmponent must check here for route change
    if (nextProps.appRoutes !== this.props.appRoutes) {
      this.getSelectedKey(nextProps.appRoutes, history.location);
    }
    return nextProps !== this.props;
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
    const { appRoutes, isMobile } = this.props;
    const { selectedKey } = this.state;

    return (
      <Items
        isMobile={isMobile}
        selectedKey={selectedKey}
        groups={[{ links: appRoutes }]}
        onLinkClick={this.handleClickLink.bind(this)} // eslint-disable-line
      />
    );
  }
}


const { func, bool } = PropTypes;

AppNav.propTypes = {
  appRoutes: routesProp.isRequired,
  onClick: func,
  isMobile: bool.isRequired,
};

export default AppNav;
