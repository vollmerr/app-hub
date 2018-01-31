import React from 'react';

import { routesProp } from 'utils/propTypes';
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
            <route.component {...props} name={route.name} />
          )}
        />
      ))
    }
    <Redirect to={routes[0].path} />
  </Switch>
);


Router.propTypes = {
  routes: routesProp.isRequired,
};


export default Router;
