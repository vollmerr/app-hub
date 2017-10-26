import DemoHome from 'containers/Demo-Home';
import DemoLists from 'containers/Demo-Lists';


export const base = '/demo';

export default [
  {
    key: 'demoHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: DemoHome,
  },
  {
    key: 'lists',
    name: 'Example Lists',
    path: `${base}/lists`,
    exact: true,
    component: DemoLists,
  },
];
