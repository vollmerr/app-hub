import React from 'react';

import AppContent from 'components/App-Content';
import Wrapper from 'components/App-Content/Wrapper';
import Router from 'components/Router';

import Paas from './Paas';
import routes from './routes';


export default ({ name }) => ( // eslint-disable-line
  <Wrapper>
    <Paas name={name} />
    <AppContent>
      <Router routes={routes} />
    </AppContent>
  </Wrapper>
);
