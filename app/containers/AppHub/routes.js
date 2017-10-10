import AppHubHome from 'containers/AppHub-Home';
import Spa from 'containers/Spa/Loadable';

import Loading from 'components/Loading/TestPage';

import { meta } from './meta';

const routes = [
  {
    key: 'home',
    name: 'App Hub',
    path: '/',
    exact: true,
    component: AppHubHome,
    icon: 'Apphub',
    meta: meta.apphub,
  },
  {
    key: 'spa',
    name: 'SPA',
    path: '/spa',
    exact: false,
    component: Spa,
    icon: 'SPA',
    meta: meta.spa,
  },
  {
    key: 'loading',
    name: 'Test App Loading',
    path: '/loading',
    component: Loading,
    icon: 'Loading',
    meta: meta.loading,
  },
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

export const apps = routes.slice(1);

export default routes;
