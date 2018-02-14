
import PaasCurrent from './PaasCurrent';
import PaasPrevious from './PaasPrevious';
import PaasReport from './PaasReport';

import { ROLES } from './constants';


export const base = '/paas';


export default [
  {
    key: 'paasHome', // default route must be first and end with 'Home' for key
    name: 'Current Staff',
    path: `${base}/current`,
    exact: true,
    component: PaasCurrent,
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
    component: PaasPrevious,
    roles: [ROLES.MANAGER],
  },
  {
    key: 'paasReport',
    name: 'Reports',
    path: `${base}/report`,
    exact: true,
    component: PaasReport,
    roles: [ROLES.MANAGER, ROLES.HR, ROLES.SECURITY],
  },
];
