import DemoHome from 'containers/Demo-Home';
import DemoLists from 'containers/Demo-Lists';
import DemoForm from 'containers/Demo-Form';
import DemoD3 from 'containers/Demo-D3';


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
  {
    key: 'form',
    name: 'Example Form',
    path: `${base}/form`,
    exact: true,
    component: DemoForm,
  },
  {
    key: 'd3',
    name: 'Example D3',
    path: `${base}/d3`,
    exact: true,
    component: DemoD3,
  },
];
