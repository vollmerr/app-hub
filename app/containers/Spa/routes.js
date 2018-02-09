import Home from './Home';
import Admin from './Admin';
import Report from './Report';
import { ROLES, TEST_ROLES_VALUES } from './constants';


export const base = '/spa';


export default [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: Home,
  },
  {
    key: 'spaAdmin',
    name: 'Admin',
    path: `${base}/admin`,
    exact: true,
    component: Admin,
    roles: [ROLES.ADMIN, ...TEST_ROLES_VALUES],
  },
  {
    key: 'spaReport',
    name: 'Report',
    path: `${base}/report/:id`,
    exact: true,
    component: Report,
    roles: [ROLES.ADMIN, ...TEST_ROLES_VALUES],
    hidden: true,
  },
];
