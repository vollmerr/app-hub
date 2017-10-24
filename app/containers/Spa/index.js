import React from 'react';

import AppContent from 'components/App-Content';
import Wrapper from 'components/App-Content/Wrapper';
import Router from 'components/Router';

import Spa from './Spa';
import routes from './routes';

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so Spa and Router are in differnt files pulled in here.
 */
export default () => (
  <Wrapper>
    <Spa />
    <AppContent>
      <Router routes={routes} />
    </AppContent>
  </Wrapper>
);
