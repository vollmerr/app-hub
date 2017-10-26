import React from 'react';

import AppContent from 'components/App-Content';
import Wrapper from 'components/App-Content/Wrapper';
import Router from 'components/Router';

import TestApp from './TestApp';
import routes from './routes';

export default () => (
  <Wrapper>
    <TestApp />
    <AppContent>
      <Router routes={routes} />
    </AppContent>
  </Wrapper>
);
