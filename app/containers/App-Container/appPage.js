import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { history } from 'configureStore';
import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
import Content from 'components/App-Content/Content';
import { makeSelectApp, makeSelectUserRoles } from 'containers/AppHub/selectors';
import { unauthorizedRoute } from 'utils/validate';

export function appPage(Component) {
  return class extends React.PureComponent {
    static displayName = Component.displayName ||
      Component.name /* istanbul ignore next: can't set `name` for testing as read only */ ||
      'AppPage';

    static propTypes = {
      app: PropTypes.object.isRequired,
      userRoles: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        isMounting: true,
      };
    }

    componentDidMount() {
      // do not show component wrapped until done mounting...
      this.setState({ isMounting: false }); // eslint-disable-line
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
      const { userRoles } = this.props;
      // get index of current route
      const currentRoute = app
        .get('routes')
        .find((route) => (
          route.get('path') === history.location.pathname)
        );
      // route found, that has permissions set
      if (currentRoute && currentRoute.get('roles')) {
        // not authorized for route
        if (unauthorizedRoute(currentRoute, userRoles)) {
          let key = /Home/;
          // // check for redirects for specific roles
          const rolesRedirect = currentRoute.get('rolesRedirect');
          if (rolesRedirect) {
            // for all users roles
            userRoles.forEach((role) => {
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
          const redirectRoute = unauthorizedRoute(homeRoute, userRoles) ?
            '/' :
            homeRoute.get('path');
          // push to home of app
          history.push(redirectRoute);
        }
      }
    }

    render() {
      const { app } = this.props;
      const { isMounting } = this.state;

      const routes = app.get('routes');
      const homeRoute = routes.find((route) => (
        route.get('key').match(/Home/))
      );
      const to = homeRoute ? homeRoute.get('path') : '/';

      if (app.get('error')) {
        return <ErrorMessage error={app.get('error')} to={to} />;
      }

      let Loading = null;
      if (app.get('loading') || isMounting) {
        Loading = <LoadingMessage />;
      }

      return (
        <Content>
          <Component {...this.props} Loading={Loading} />
        </Content>
      );
    }
  };
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  userRoles: makeSelectUserRoles(),
});

export default (Component) => connect(mapStateToProps, {})(appPage(Component));
