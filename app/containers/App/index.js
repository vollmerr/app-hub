import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { CommandBar as OfficeBar } from 'office-ui-fabric-react/lib/CommandBar';
import isEqual from 'lodash/isEqual';

import toJS from '../../hocs/toJS';
import theme from '../../utils/theme';
import { unauthorizedRoute } from '../../utils/validate';
import Router from '../../components/Router';
import LoadingMessage from '../../components/Loading/LoadingMessage';

import { initialState } from '../AppHub/reducer';
import * as selectors from '../AppHub/selectors';
import * as actions from '../AppHub/actions';

import Nav from './Nav';


export const Wrapper = styled.div`
  display: flex;
  background-color: ${theme.neutralLighterAlt};
  height: calc(100vh - ${theme.hub.headerHeight}px);
`;


export const Body = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;


export const Content = styled.div`
  width: ${(props) => props.isMobile ? '100vw' : `calc(100vw - ${theme.app.navWidth}px)`};
  overflow-y: auto;
  overflow-x: hidden;
`;


export const CommandBar = styled(OfficeBar) `
  &.ms-CommandBar {
    width: 100%;
    border-bottom: 1px solid ${theme.neutralLight};
  }
`;


export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changingApp: true,
      commandBar: false,
    };
  }

  async componentDidMount() {
    await this.props.onChangeApp(this.props.appProps);
    this.setState({ changingApp: false }); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { app, location } = this.props;
    // if there are different routes (is empty when component loads, so check here)
    if (
      !isEqual(nextProps.app.routes, app.routes) ||
      !isEqual(nextProps.location.pathname, location.pathname)
    ) {
      this.authorizeRoute(nextProps.app);
    }
  }

  componentWillUnmount() {
    this.props.onChangeApp(initialState.app);
  }

  setCommandBar = (commandBar) => {
    this.setState({ commandBar });
  }

  authorizeRoute = (app) => {
    const { user, history } = this.props;
    // get index of current route
    const currentRoute = app.routes.find((route) => (
      route.path === history.location.pathname
    ));
    // route found, that has permissions set
    if (currentRoute && currentRoute.roles) {
      // not authorized for route
      if (unauthorizedRoute(currentRoute, user.roles)) {
        let homeRoute = app.home;
        // // check for redirects for specific roles
        const redirects = currentRoute.redirect;
        if (redirects) {
          // for all users roles
          user.roles.forEach((role) => {
            // if there is a redirect, set that as the key
            if (redirects[role]) {
              homeRoute = app.routes.find((route) => (
                route.key === redirects[role]
              ));
            }
          });
        }
        // if not valid app home, redirect to apphub home
        const redirectRoute = unauthorizedRoute(homeRoute, user.roles) ?
          '/' :
          homeRoute.path;
        // push to home of app
        history.push(redirectRoute);
      }
    }
  }

  render() {
    const { app, view } = this.props;
    const { changingApp, commandBar } = this.state;

    const commandBarProps = {
      isSearchBoxVisible: false,
      ...commandBar,
    };

    const routerProps = {
      setCommandBar: this.setCommandBar,
      routes: app.routes,
    };

    return (
      <div>
        {
          changingApp ?
            <LoadingMessage /> :
            <Wrapper>
              {view.isMobile || <Nav />}
              <Body>
                {commandBar && <CommandBar {...commandBarProps} />}
                <Content isMobile={view.isMobile}><Router {...routerProps} /></Content>
              </Body>
            </Wrapper>
        }
      </div>
    );
  }
}


const { func, object } = PropTypes;

App.propTypes = {
  appProps: object.isRequired, // eslint-disable-line
  app: object.isRequired,
  user: object.isRequired,
  view: object.isRequired,
  onChangeApp: func.isRequired,
  history: object.isRequired,
  location: object.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
  view: selectors.getView,
});

export const mapDispatchToProps = (dispatch) => ({
  onChangeApp: (app) => dispatch(actions.changeApp(app)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(App);
