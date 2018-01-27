import HomePage from './HomePage';
import AdminPage from './AdminPage';
import { ROLES } from './constants';


export const base = '/spa';


export default [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: HomePage,
  },
  {
    key: 'spaAdmin',
    name: 'Admin',
    path: `${base}/admin`,
    exact: true,
    component: AdminPage,
    roles: [ROLES.ADMIN],
  },
];
