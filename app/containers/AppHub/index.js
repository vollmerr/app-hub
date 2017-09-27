import React from 'react';
import Router from './Router';
import AppHub from './AppHub';

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so AppHub and Router are in differnt files pulled in here.
 */
export default () => (
  <div>
    <AppHub />
    <Router />
  </div>
);
