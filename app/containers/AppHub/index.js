import React from 'react';
import styled from 'styled-components';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import theme from 'utils/theme';
import Router from 'components/Router';

import AppHub from './AppHub';
import routes from './routes';

export const Wrapper = styled(Fabric)`
  height: 100%;
  overflow: hidden;
  min-width: ${theme.breakpoints.xs}px;
`;

export const Content = styled.div`
  height: calc(100% - ${theme.hub.headerHeight});
`;

/**
 * Routing must be separate from redux (otherwise routing breaks)
 * so AppHub and Router are in differnt files pulled in here.
 */
export default () => (
  <Wrapper>
    <AppHub routes={routes} />
    <Content>
      <Router routes={routes} />
    </Content>
  </Wrapper>
);
