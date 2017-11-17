import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { history } from 'configureStore';
import { appProp } from 'utils/propTypes';
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
      app: appProp.isRequired,
      userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    componentWillReceiveProps(nextProps) {
      const { app, userRoles } = this.props;
      // if there are different routes (is empty when component loads, so check here)
      if (nextProps.app.routes.length !== app.routes.length) {
        // get index of current route
        const index = nextProps.app.routes.findIndex((route) => route.path === history.location.pathname);
        // route found, that has permissions set
        if (index > -1 && nextProps.app.routes[index].roles) {
          // not authorized for route
          if (!nextProps.app.routes[index].roles.some((role) => userRoles.includes(role))) {
            // push to home of app
            history.push(nextProps.app.routes[0].path);
            // dont update
            return false;
          }
        }
      }
      return nextProps !== this.props;
    }

    render() {
      const { app } = this.props;
      const { error, loading, routes } = app;
      const to = routes && routes[0] ? routes[0].path : '/';

      if (error) {
        return <ErrorMessage error={error} to={to} />;
      } else if (loading) {
        return <LoadingMessage />;
      }

      return <Content><Component {...this.props} /></Content>;
    }
  };
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  userRoles: makeSelectUserRoles(),
});

export default (Component) => connect(mapStateToProps, {})(appPage(Component));
