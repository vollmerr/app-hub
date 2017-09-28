import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHubHome from 'containers/AppHub-Home/Loadable';
import Spa from 'containers/Spa/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export const routes = {
  home: {
    path: '/',
    text: 'Home',
    exact: true,
    component: AppHubHome,
  },
  spa: {
    path: '/spa',
    text: 'Spa',
    exact: false,
    component: Spa,
  },
};

export const notFound = NotFoundPage;

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
