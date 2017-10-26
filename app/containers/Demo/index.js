import React from 'react';

import AppContent from 'components/App-Content';
import Wrapper from 'components/App-Content/Wrapper';
import Router from 'components/Router';

import Demo from './Demo';
import routes from './routes';

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so Demo and Router are in differnt files pulled in here.
 */
export default ({ name }) => ( // eslint-disable-line
  <Wrapper>
    <Demo name={name} />
    <AppContent>
      <Router routes={routes} />
    </AppContent>
  </Wrapper>
);
