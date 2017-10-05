import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHubHome from 'containers/AppHub-Home';
import Spa from 'containers/Spa/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Loading from 'components/Loading';

export const routes = [
  {
    key: 'home',
    name: 'App Hub',
    path: '/',
    exact: true,
    component: AppHubHome,
    icon: 'Glimmer',
  },
  {
    key: 'spa',
    name: 'SPA',
    path: '/spa',
    exact: false,
    component: Spa,
    icon: 'BulletedList2Mirrored',
  },
  {
    key: 'loading',
    name: 'Test App Loading',
    path: '/loading',
    component: Loading,
    icon: 'ProgressRingDots',
  },
  {
    key: 'cold',
    name: 'COLD',
    href: 'https://cold.govops.ca.gov/',
    icon: 'Rename',
  },
  {
    key: 'bars',
    name: 'BARS',
    href: 'http://barsui.technology.ca.gov/',
    icon: 'IDBadge',
  },
  {
    key: 'ed',
    name: 'ED',
    href: 'http://employeedirectory/',
    icon: 'ContactInfo',
  },
];

export const notFound = NotFoundPage;

const Router = () => (
  <Switch>
    {
      routes.map((route) => (
        <Route exact={route.exact} key={route.key} path={route.path} component={route.component} />
      ))
    }
    <Route component={notFound} />
  </Switch>
);

export default Router;
