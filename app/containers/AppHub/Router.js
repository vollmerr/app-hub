import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHubHome from 'containers/AppHub-Home/Loadable';
import Spa from 'containers/Spa/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export const routes = [
  {
    key: 'home',
    name: 'Home',
    path: '/',
    exact: true,
    component: AppHubHome,
    icon: 'HomeSolid',
  },
  {
    key: 'spa',
    name: 'SPA',
    path: '/spa',
    exact: false,
    component: Spa,
    icon: 'BulletedList2Mirrored',
  },
];

export const notFound = NotFoundPage;

const Router = () => (
  <Switch>
    {
      routes.map((route) => (
        <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
      ))
    }
    <Route component={notFound} />
  </Switch>
);

export default Router;
