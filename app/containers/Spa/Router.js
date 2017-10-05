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
  // {
  //   key: 'spaHome8', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage8',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome7', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage7',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome6', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage6',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome5', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage5',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome4', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage4',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome3', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage3',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome2', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage2',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome9', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage9',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },
  // {
  //   key: 'spaHome10', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage10',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHome11', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage12',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },
  // {
  //   key: 'spaHome15', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage122',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },
  // {
  //   key: 'spaHomeasdas', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPage213123',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },
  // {
  //   key: 'spaHomeljkh', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPagehj',
  //   name: 'Other Page',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },  {
  //   key: 'spaHomenbmmn', // default route must be first and end with 'Home' for key
  //   name: 'Home',
  //   path: `${base}/home`,
  //   exact: true,
  //   component: SpaHome,
  // },
  // {
  //   key: 'otherPagehmhjg',
  //   name: 'Other Pagefgdfsgg',
  //   path: `${base}/OtherPage`,
  //   exact: true,
  //   component: OtherPage,
  // },
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
