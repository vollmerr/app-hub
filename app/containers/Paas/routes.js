import PaasHome from 'containers/Paas-Home';

import PaasReport from 'containers/Paas-Report';

import { ROLES } from './constants';


export const base = '/paas';

export default [
  {
    key: 'paasHome', // default route must be first and end with 'Home' for key
    name: 'Current Staff',
    path: `${base}/current`,
    exact: true,
    component: PaasHome,
    roles: [ROLES.MANAGER],
  },
  {
    key: 'paasPrevious',
    name: 'Previous Staff',
    path: `${base}/previous`,
    exact: true,
    component: PaasHome,
    roles: [ROLES.MANAGER],
  },
  {
    key: 'paasReport',
    name: 'Report',
    path: `${base}/report`,
    exact: true,
    component: PaasReport,
    roles: [ROLES.MANAGER, ROLES.HR_ADMIN, ROLES.SECURITY_ADMIN],
  },
];
