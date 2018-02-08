import SPA from '../SPA/Loadable';

import PAAS from '../PAAS/Loadable';
import * as PAAS_C from '../PAAS/constants';

import Home from './Home';
import { meta } from './meta';


const routes = [
  // hub
  {
    key: 'home',
    name: 'App Hub',
    path: '/',
    exact: true,
    component: Home,
    icon: 'Apphub',
    meta: meta.appHub,
  },
  // __APPS__
  {
    key: 'paas',
    name: 'PAAS',
    path: '/paas',
    exact: false,
    component: PAAS,
    icon: 'Paas',
    meta: meta.paas,
    roles: Object.values(PAAS_C.ROLES),
  },
  {
    key: 'spa',
    name: 'SPA',
    path: '/spa',
    exact: false,
    component: SPA,
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

// /* istanbul ignore next */
// if (process.env.NODE_ENV !== 'production') {
//   routes.push({
//     key: 'demo',
//     name: 'Demo',
//     path: '/demo',
//     exact: false,
//     component: Demo,
//     icon: 'Demo',
//     meta: meta.demo,
//   });
// }


export const apps = routes.slice(1);

export default routes;
