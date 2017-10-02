import React from 'react';

import Wrapper from 'containers/App/Wrapper';

import Router from './Router';
import Spa from './Spa';

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so Spa and Router are in differnt files pulled in here.
 */
export default () => (
  <Wrapper>
    <Spa />
    <Router />
  </Wrapper>
);
