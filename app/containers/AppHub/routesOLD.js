import AppHubHome from 'containers/AppHub-Home';
import Demo from 'containers/Demo/Loadable';
import AppName from 'containers/AppName/Loadable';
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
    key: 'demo',
    name: 'Demo',
    path: '/demo',
    exact: false,
    component: Demo,
    icon: 'Demo',
    meta: meta.demo,
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
