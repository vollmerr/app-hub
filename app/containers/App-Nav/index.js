import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { history } from 'configureStore';
import { makeSelectUserRoles } from 'containers/AppHub/selectors';

import Items from './Items';


// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
export class AppNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      routes: [],
    };
  }

  componentDidMount() {
    const { appRoutes } = this.props;
    // initalize to exisiting location
    this.getRoutes(appRoutes, history.location);
    // listen for changes on history, updated selected on change
    /* istanbul ignore next */
    this.history = history.listen((location) => {
      this.getRoutes(this.props.appRoutes, location); // use this.props to get new reference
    });
  }

  componentWillReceiveProps(nextProps) {
    // when mounted routes do not exist, and component is PureCOmponent must check here for route change
    if (nextProps.appRoutes !== this.props.appRoutes) {
      this.getRoutes(nextProps.appRoutes, history.location);
    }
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    // unlisten from history when unmounted (so not trying to update state on unmounted component)
    this.history();
  }

  /**
   * Maps the routes to only those that the user has role for
   *
   * @param {object} allRoutes  - routes to get map (immutable)
   * @param {object} location   - user location info
   */
  getRoutes = (allRoutes, location) => {
    const { userRoles } = this.props;

    const routes = allRoutes.filter((route) => {
      // no roles on route, keep on list of routes
      if (!route.get('roles')) {
        return true;
      }
      // keep if user has correct role
      if (route.get('roles').some((role) => userRoles.includes(role))) {
        return true;
      }
      return false;
    });

    this.setState({ routes: routes.toJS() });
    this.getSelectedKey(routes, location);
  }

  /**
   * Handles getting the key of the selected nav item
   *
   * @param {object} routes     - routes to get selected key from (immutable)
   * @param {object} location   - user location info
   */
  getSelectedKey = (routes, location) => {
    const validRoute = routes.find((route) => route.get('path') === location.pathname);
    // valid route
    if (validRoute) {
      this.setState({
        selectedKey: validRoute.get('key'),
      });
    }
  }

  /**
   * Handles clicking on a link in the nav
   *
   * @param {event} event     - click event occuring
   * @param {object} element  - element being clicked
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
    const { isMobile } = this.props;
    const { selectedKey, routes } = this.state;

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


const { func, bool, object } = PropTypes;

AppNav.propTypes = {
  appRoutes: object.isRequired,
  onClick: func,
  isMobile: bool.isRequired,
  userRoles: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userRoles: makeSelectUserRoles(),
});

export default connect(mapStateToProps, {})(AppNav);
