
import Current from './Current';
import Previous from './Previous';
import Report from './Report';

import { ROLES } from './constants';


export const base = '/paas';


export default [
  {
    key: 'paasHome', // default route must be first and end with 'Home' for key
    name: 'Current Staff',
    path: `${base}/current`,
    exact: true,
    component: Current,
    roles: [ROLES.MANAGER],
    rolesRedirect: {
      [ROLES.HR]: 'paasReport',
      [ROLES.SECURITY]: 'paasReport',
    },
  },
  {
    key: 'paasPrevious',
    name: 'Previous Staff',
    path: `${base}/previous`,
    exact: true,
    component: Previous,
    roles: [ROLES.MANAGER],
  },
  {
    key: 'paasReport',
    name: 'Report',
    path: `${base}/report`,
    exact: true,
    component: Report,
    roles: [ROLES.HR, ROLES.SECURITY],
  },
];
