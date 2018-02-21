
import PasCurrent from './PasCurrent';
import PasPrevious from './PasPrevious';
import PasReport from './PasReport';
import PasAdmin from './PasAdmin';
import PasHelp from './PasHelp';

import { ROLES } from './constants';


export const base = '/pas';


export default [
  {
    key: 'pasHome', // default route must be first and end with 'Home' for key
    name: 'Current Staff',
    path: `${base}/current`,
    exact: true,
    component: PasCurrent,
    roles: [ROLES.MANAGER],
    rolesRedirect: {
      [ROLES.HR]: 'pasReport',
      [ROLES.SECURITY]: 'pasReport',
    },
  },
  {
    key: 'pasPrevious',
    name: 'Previous Staff',
    path: `${base}/previous`,
    exact: true,
    component: PasPrevious,
    roles: [ROLES.MANAGER],
  },
  {
    key: 'pasReport',
    name: 'Reports',
    path: `${base}/report`,
    exact: true,
    component: PasReport,
    roles: [ROLES.MANAGER, ROLES.HR, ROLES.SECURITY],
  },
  {
    key: 'pasAdmin',
    name: 'Admin',
    path: `${base}/admin`,
    exact: true,
    component: PasAdmin,
    roles: [ROLES.SECURITY],
  },
  {
    key: 'pasHelp',
    name: 'Help',
    path: `${base}/help`,
    exact: true,
    component: PasHelp,
    roles: [ROLES.MANAGER, ROLES.HR, ROLES.SECURITY],
  },
];
