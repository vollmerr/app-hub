import SpaHome from 'containers/Spa-Home';
import SpaAdmin from 'containers/Spa-Admin';

import { ROLES } from './constants';
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
    roles: [ROLES.ADMIN],
  },
];
