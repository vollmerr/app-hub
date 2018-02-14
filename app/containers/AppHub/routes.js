import Spa from '../Spa/Loadable';

import Paas from '../Paas/Loadable';
import * as PAAS_C from '../Paas/constants';

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
    component: Paas,
    icon: 'Paas',
    meta: meta.paas,
    roles: PAAS_C.ROLES_VALUES,
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
