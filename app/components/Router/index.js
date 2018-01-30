import React from 'react';
import PropTypes from 'prop-types';

import { routesProp } from 'utils/propTypes';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loading from '../Loading';


const Router = ({ routes, loading, error }) => (
  loading || error ?
    <Loading pastDelay isLoading={loading} error={error} /> :
    <Switch>
      {
        routes.map((route) => (
          route.path &&
          <Route
            key={route.key}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <route.component {...props} name={route.name} />
            )}
          />
        ))
      }
      <Redirect to={routes[0].path} />
    </Switch>
);


const { any, object } = PropTypes;

Router.propTypes = {
  routes: routesProp.isRequired,
  loading: any,
  error: object,
};


export default Router;
