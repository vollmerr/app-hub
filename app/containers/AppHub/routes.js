import AppHubHome from 'containers/AppHub-Home';
import Paas from 'containers/Paas/Loadable';
import Spa from 'containers/Spa/Loadable';
import Demo from 'containers/Demo/Loadable';
import Loading from 'components/Loading/TestPage';

import * as PAAS from 'containers/Paas/constants';

import { meta } from './meta';

const routes = [
  // hub
  {
    key: 'home',
    name: 'App Hub',
    path: '/',
    exact: true,
    component: AppHubHome,
    icon: 'Apphub',
    meta: meta.apphub,
  },
  // __APPS__
  {
    key: 'paas',
    name: 'PAAS',
    path: '/paas',
    exact: false,
    component: Paas,
    icon: 'Paas',
    meta: meta.paas,
    roles: Object.values(PAAS.ROLES),
  },
  {
    key: 'spa',
    name: 'SPA',
    path: '/spa',
    exact: false,
    component: Spa,
    icon: 'Spa',
    meta: meta.spa,
  },
  // external apps
  {
    key: 'cold',
    name: 'COLD',
    href: 'https://cold.govops.ca.gov/',
    icon: 'COLD',
    meta: meta.cold,
  },
  {
    key: 'bars',
    name: 'BARS',
    href: 'http://bars.technology.ca.gov/',
    icon: 'BARS',
    meta: meta.bars,
  },
  {
    key: 'ed',
    name: 'ED',
    href: 'http://employeedirectory/',
    icon: 'ED',
    meta: meta.ed,
  },
];

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  routes.push({
    key: 'demo',
    name: 'Demo',
    path: '/demo',
    exact: false,
    component: Demo,
    icon: 'Demo',
    meta: meta.demo,
  });
  routes.push({
    key: 'loading',
    name: 'Test App Loading',
    path: '/loading',
    component: Loading,
    icon: 'Loading',
    meta: meta.loading,
  });
}

export const apps = routes.slice(1);

export default routes;
