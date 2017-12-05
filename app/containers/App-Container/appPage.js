import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { history } from 'configureStore';
import ErrorMessage from 'components/Loading/ErrorMessage';
import LoadingMessage from 'components/Loading/LoadingMessage';
import Content from 'components/App-Content/Content';
import { makeSelectApp, makeSelectUserRoles } from 'containers/AppHub/selectors';


export function appPage(Component) {
  return class extends React.PureComponent {
    static displayName = Component.displayName ||
      Component.name /* istanbul ignore next: can't set `name` for testing as read only */ ||
      'AppPage';

    static propTypes = {
      app: PropTypes.object.isRequired,
      userRoles: PropTypes.object.isRequired,
    };

    componentWillReceiveProps(nextProps) {
      const { app, userRoles } = this.props;
      // if there are different routes (is empty when component loads, so check here)
      if (nextProps.app.get('routes') !== app.get('routes')) {
        // get index of current route
        const currentRoute = nextProps.app
          .get('routes')
          .find((route) => (
            route.get('path') === history.location.pathname)
          );
        // route found, that has permissions set
        if (currentRoute && currentRoute.get('roles')) {
          // not authorized for route
          if (!currentRoute.get('roles').some((role) => userRoles.includes(role))) {
            // get home route for app
            const homeRoute = nextProps.app
              .get('routes')
              .find((route) => (
                route.get('key').match(/Home/))
              );
            // push to home of app
            history.push(homeRoute ? homeRoute.get('path') : '/');
            // dont update
            return false;
          }
        }
      }
      return nextProps !== this.props;
    }

    render() {
      const { app } = this.props;
      const routes = app.get('routes');
      const homeRoute = routes.find((route) => (
        route.get('key').match(/Home/))
      );
      const to = homeRoute ? homeRoute.get('path') : '/';

      if (app.get('error')) {
        return <ErrorMessage error={app.get('error')} to={to} />;
      }

      let Loading = null;
      if (app.get('loading')) {
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
