import React from 'react';
import SpaHome from 'containers/Spa-Home';

const OtherPage = () => <div>OTHER PAGE TEST</div>;

export const base = '/spa';

export default [
  {
    key: 'spaHome', // default route must be first and end with 'Home' for key
    name: 'Home',
    path: `${base}/home`,
    exact: true,
    component: SpaHome,
  },
  {
    key: 'otherPage',
    name: 'Other Page',
    path: `${base}/OtherPage`,
    exact: true,
    component: OtherPage,
  },
];
