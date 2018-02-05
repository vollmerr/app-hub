import Home from './Home';
import Admin from './Admin';
import Report from './Report';
import { ROLES } from './constants';


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
    roles: [ROLES.ADMIN],
  },
  {
    key: 'spaReport',
    name: 'Report',
    path: `${base}/report/:id`,
    exact: true,
    component: Report,
    roles: [ROLES.ADMIN],
    hidden: true,
  },
];
