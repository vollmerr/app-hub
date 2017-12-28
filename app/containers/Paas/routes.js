import PaasHome from 'containers/Paas-Home';

export const base = '/paas';

export default [
  {
    key: 'paasHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: PaasHome,
  },
];
