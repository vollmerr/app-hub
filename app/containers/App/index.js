import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { CommandBar as OfficeBar } from 'office-ui-fabric-react/lib/CommandBar';

import { history } from '../../configureStore';
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
  flex: 1 0 auto;
  flex-direction: column;
`;


export const Content = styled.div`
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
      commandBar: {
        isVisible: false,
        props: {
          items: [],
        },
      },
    };
  }

  async componentDidMount() {
    await this.props.onChangeApp(this.props.appProps);
    await this.authorizeRoute(this.props.app);
    this.setState({ changingApp: false }); // eslint-disable-line
  }

  componentWillUnmount() {
    this.props.onChangeApp(initialState.app);
  }

  authorizeRoute = (app) => {
    const { user } = this.props;
    // get index of current route
    const currentRoute = app.routes
      .find((route) => (
        route.path === history.location.pathname)
      );
    // route found, that has permissions set
    if (currentRoute && currentRoute.roles) {
      // not authorized for route
      if (unauthorizedRoute(currentRoute, user.roles)) {
        let key = /Home/;
        // // check for redirects for specific roles
        const rolesRedirect = currentRoute.rolesRedirect;
        if (rolesRedirect) {
          // for all users roles
          user.roles.forEach((role) => {
            // if there is a redirect, set that as the key
            if (rolesRedirect[role]) {
              key = rolesRedirect[role];
            }
          });
        }
        // get home route for app
        const homeRoute = app.routes
          .find((route) => route.key.match(key));
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
    const { app } = this.props;
    const { changingApp, commandBar } = this.state;

    const navProps = {
      routes: app.routes,
    };

    const commandBarProps = {
      isSearchBoxVisible: false,
      ...commandBar.props,
    };

    const routerProps = {
      routes: app.routes,
      error: app.error,
      loading: app.loading,
    };

    return (
      <div>
        {
          changingApp ?
            <LoadingMessage /> :
            <Wrapper>
              <Nav {...navProps} />
              <Body>
                {commandBar.isVisible && <CommandBar {...commandBarProps} />}
                <Content><Router {...routerProps} /></Content>
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
  onChangeApp: func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeApp: (app) => dispatch(actions.changeApp(app)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withRouter,
  withConnect,
  toJS,
)(App);
