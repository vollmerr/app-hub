import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SpaHome from 'containers/Spa-Home/Loadable';

const OtherPage = () => <div>OTHER PAGE TEST</div>;

const app = '/spa';

export const routes = {
  home: {
    path: `${app}/`,
    text: 'Home',
    exact: true,
    component: SpaHome,
  },
  OtherPage: {
    path: `${app}/OtherPage`,
    text: 'OtherPage',
    exact: true,
    component: OtherPage,
  },
};

const Router = () => (
  <Switch>
    {
      Object.values(routes).map((route) => (
        <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
      ))
    }
  </Switch>
);

export default Router;
