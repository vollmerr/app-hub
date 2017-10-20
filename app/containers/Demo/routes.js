import React from 'react';
import DemoHome from 'containers/Demo-Home';

const OtherPage = () => <div>OTHER PAGE TEST</div>;

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
    key: 'otherPage',
    name: 'Other Page',
    path: `${base}/OtherPage`,
    exact: true,
    component: OtherPage,
  },
];
