import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Nav as OfficeNav } from 'office-ui-fabric-react/lib/Nav';

import toJS from '../../hocs/toJS';
import theme from '../../utils/theme';
import { history } from '../../configureStore';

import * as selectors from '../AppHub/selectors';


export const Items = styled(OfficeNav) `
  /* flex: none; */
  display: ${(props) => props.isMobile ? 'none' : 'block'};
  width: ${theme.app.navWidth}px;
  height: calc(100vh - ${theme.hub.headerHeight}px);
  background: ${(props) => props.isMobile ? theme.neutralPrimary : theme.neutralLight};

  li > div {
    background: ${(props) => props.isMobile ? theme.neutralPrimary : theme.neutralLight};
    button {
      text-decoration: none;
      display: block;
      color: ${(props) => props.isMobile ? theme.white : 'inherit'};
      &:hover,
      &:focus,
      &:active {
        color: ${(props) => props.isMobile ? theme.neutralDark : 'inherit'};
        background: ${(props) => props.isMobile ? theme.neutralLighter : theme.neutralTertiaryAlt};
      }
    }
    &:hover button,
    &.is-selected button {
      background: ${(props) => props.isMobile ? theme.neutralLighter : theme.neutralTertiaryAlt};
    }
  }
`;


// https://github.com/OfficeDev/office-ui-fabric-react/issues/915
export class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      routes: [],
    };
  }

  componentDidMount() {
    const { routes } = this.props;
    // initalize to exisiting location
    this.getRoutes(routes, history.location);
    // listen for changes on history, updated selected on change
    /* istanbul ignore next */
    this.history = history.listen((location) => {
      this.getRoutes(this.props.routes, location); // use this.props to get new reference
    });
  }

  componentWillReceiveProps(nextProps) {
    // when mounted routes do not exist, and component is PureCOmponent must check here for route change
    if (nextProps.routes !== this.props.routes) {
      this.getRoutes(nextProps.routes, history.location);
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
   * @param {object} allRoutes  - routes to get map
   * @param {object} location   - user location info
   */
  getRoutes = (allRoutes, location) => {
    const { user } = this.props;
    const routes = allRoutes.filter((route) => {
      // no roles on route, keep on list of routes
      if (!route.roles) {
        return true;
      }
      // keep if user has correct role
      if (route.roles.some((role) => user.roles.includes(role))) {
        return true;
      }
      return false;
    });

    this.setState({ routes });
    this.getSelectedKey(routes, location);
  }

  /**
   * Handles getting the key of the selected nav item
   *
   * @param {object} routes     - routes to get selected key from (immutable)
   * @param {object} location   - user location info
   */
  getSelectedKey = (routes, location) => {
    const index = routes.findIndex((route) => route.path === location.pathname);
    // valid route
    if (index > -1) {
      this.setState({
        selectedKey: routes[index].key,
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
    const { view } = this.props;
    const { selectedKey, routes } = this.state;

    return (
      <Items
        isMobile={view.isMobile}
        selectedKey={selectedKey}
        groups={[{ links: routes }]}
        onLinkClick={this.handleClickLink.bind(this)} // eslint-disable-line
      />
    );
  }
}


const { func, object, array } = PropTypes;

Nav.propTypes = {
  routes: array.isRequired,
  onClick: func,
  view: object.isRequired,
  user: object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectors.getUser,
  view: selectors.getView,
});

const withConnect = connect(mapStateToProps);


export default compose(
  withConnect,
  toJS,
)(Nav);