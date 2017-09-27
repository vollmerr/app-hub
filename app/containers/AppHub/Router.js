import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHubHome from 'containers/AppHub-Home/Loadable';
import SpaHome from 'containers/Spa-Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export const routes = {
  home: {
    to: '/',
    text: 'AppHub Home',
    component: AppHubHome,
  },
  SpaHome: {
    to: '/spa',
    text: 'Spa',
    component: SpaHome,
  },
};

export const NotFound = NotFoundPage;

const Router = () => (
  <Switch>
    {
      Object.values(routes).map((route) => (
        <Route exact key={route.to} path={route.to} component={route.component} />
      ))
    }
    <Route component={NotFound} />
  </Switch>
);

export default Router;
