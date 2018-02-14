import SpaHome from './SpaHome';
import SpaAdmin from './SpaAdmin';
import SpaReport from './SpaReport';
import SpaHelp from './SpaHelp';

import { ROLES, TEST_ROLES_VALUES } from './constants';


export const base = '/spa';


export default [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: SpaHome,
  },
  {
    key: 'spaAdmin',
    name: 'Admin',
    path: `${base}/admin`,
    exact: true,
    component: SpaAdmin,
    roles: [ROLES.ADMIN, ...TEST_ROLES_VALUES],
  },
  {
    key: 'spaReport',
    name: 'Report',
    path: `${base}/report/:id`,
    exact: true,
    component: SpaReport,
    roles: [ROLES.ADMIN, ...TEST_ROLES_VALUES],
    hidden: true,
  },{
    key: 'SpaHelp',
    name: 'Help',
    path: `${base}/help`,
    exact: true,
    component: SpaHelp,
  },
];
