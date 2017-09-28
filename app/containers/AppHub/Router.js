import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes, { notFound } from 'routes';

const Router = () => (
  <Switch>
    {
      Object.values(routes).map((route) => (
        <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
      ))
    }
    <Route component={notFound} />
  </Switch>
);

export default Router;
