import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SpaHome from 'containers/Spa-Home';

const OtherPage = () => <div>OTHER PAGE TEST</div>;

export const base = '/spa';

export const routes = [
  {
    key: 'home',
    name: 'Home',
    path: `${base}/`,
    exact: true,
    component: SpaHome,
  },
  {
    key: 'otherPage',
    name: 'Other Page',
    path: `${base}/OtherPage`,
    exact: true,
    component: OtherPage,
  },
];

const Router = () => (
  <Switch>
    {
      routes.map((route) => (
        <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
      ))
    }
  </Switch>
);

export default Router;
