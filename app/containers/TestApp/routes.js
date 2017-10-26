import TestAppHome from 'containers/TestApp-Home';

export const base = '/test-app';

export default [
  {
    key: 'testAppHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: TestAppHome,
  },
];
