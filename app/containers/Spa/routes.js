import SpaHome from 'containers/Spa-Home';

export const base = '/spa';

export default [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: SpaHome,
  },
];
