import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from 'react-router-dom';

const Router = ({ routes }) => (
  <Switch>
    {
      routes.map((route) => (
        route.path &&
        <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          render={(props) => (
            <route.component {...props} routes={routes} name={route.name} />
          )}
        />
      ))
    }
    <Redirect to={routes[0].path} />
  </Switch>
);

Router.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Router;
