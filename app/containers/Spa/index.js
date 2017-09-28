import React from 'react';

import Router from './Router';
import Spa from './Spa';

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so Spa and Router are in differnt files pulled in here.
 */
export default () => (
  <div>
    <Spa />
    <Router />
  </div>
);
