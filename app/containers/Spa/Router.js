import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SpaHome from 'containers/Spa-Home';

const OtherPage = () => <div>OTHER PAGE TEST</div>;

export const base = '/spa';

export const routes = [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
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
        <Route exact={route.exact} key={route.key} path={route.path} component={route.component} />
      ))
    }
    <Redirect to={routes[0].path} />
  </Switch>
);

export default Router;
