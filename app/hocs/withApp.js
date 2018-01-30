import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
// import Content from 'components/App-Content/Content';
import { unauthorizedRoute } from 'utils/validate';


import { history } from '../configureStore';

import * as selectors from '../containers/AppHub/selectors';


export function withApp(Component) {
  return class extends React.PureComponent {
    static displayName = Component.displayName ||
      Component.name /* istanbul ignore next: can't set `name` for testing as read only */ ||
      'App';

    static propTypes = {
      app: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        isLoading: 1,
      };
    }

    componentDidMount() {
      // do not show component wrapped until done mounting...
      this.setState({ isLoading: this.state.isLoading - 1 });
      this.authorizeRoute(this.props.app);
    }

    componentWillReceiveProps(nextProps) {
      const { app } = this.props;
      // if there are different routes (is empty when component loads, so check here)
      if (nextProps.app.get('routes') !== app.get('routes')) {
        this.authorizeRoute(nextProps.app);
      }
    }

    authorizeRoute = (app) => {
      const { user } = this.props;
      // get index of current route
      const currentRoute = app
        .get('routes')
        .find((route) => (
          route.get('path') === history.location.pathname)
        );
      // route found, that has permissions set
      if (currentRoute && currentRoute.get('roles')) {
        // not authorized for route
        if (unauthorizedRoute(currentRoute, user.get('roles'))) {
          let key = /Home/;
          // // check for redirects for specific roles
          const rolesRedirect = currentRoute.get('rolesRedirect');
          if (rolesRedirect) {
            // for all users roles
            user.get('roles').forEach((role) => {
              // if there is a redirect, set that as the key
              if (rolesRedirect.get(role)) {
                key = rolesRedirect.get(role);
              }
            });
          }
          // get home route for app
          const homeRoute = app
            .get('routes')
            .find((route) => route.get('key').match(key));
          // if not valid app home, redirect to apphub home
          const redirectRoute = unauthorizedRoute(homeRoute, user.get('roles')) ?
            '/' :
            homeRoute.get('path');
          // push to home of app
          history.push(redirectRoute);
        }
      }
    }

    startRequest = () => {
      this.setState({ isLoading: this.state.isLoading + 1 });
    }

    endRequest = () => {
      this.setState({ isLoading: this.state.isLoading - 1 });
    }

    render() {
      const { app } = this.props;
      const { isLoading } = this.state;

      const routes = app.get('routes');
      const homeRoute = routes.find((route) => (
        route.get('key').match(/Home/))
      );
      const to = homeRoute ? homeRoute.get('path') : '/';

      if (app.get('error')) {
        return <ErrorMessage error={app.get('error')} to={to} />;
      }

      let Loading = null;
      if (app.get('loading') || isLoading) {
        Loading = <LoadingMessage />;
      }

      const componentProps = {
        Loading,
        startRequest: this.startLoading,
        endRequest: this.stopLoading,
      };

      return (
        // <Content>
        <Component {...this.props} {...componentProps} />
        // {/* </Content> */}
      );
    }
  };
}

const mapStateToProps = createStructuredSelector({
  app: selectors.getApp,
  user: selectors.getUser,
});

export default (Component) => connect(mapStateToProps, {})(withApp(Component));
