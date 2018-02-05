import React from 'react';
import PropTypes from 'prop-types';

import { routesProp } from 'utils/propTypes';
import { Switch, Route, Redirect } from 'react-router-dom';


const Router = ({ routes, ...app }) => (
  <Switch>
    {
      routes.map((route) => (
        route.path &&
        <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          render={(props) => (
            <route.component {...props} {...app} name={route.name} />
          )}
        />
      ))
    }
    <Redirect to={routes[0].path} />
  </Switch>
);


const { func } = PropTypes;

Router.propTypes = {
  routes: routesProp.isRequired,
  innerRef: func,
};


export default Router;
