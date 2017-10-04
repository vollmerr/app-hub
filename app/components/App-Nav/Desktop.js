import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';

import AppNav from './';

const Wrapper = styled.div`
  flex: 0 0 ${theme.app.navWidth};
  background: ${theme.neutralLight};
`;

const AppNavDesktop = ({ routes }) => (
  <Wrapper>
    <AppNav routes={routes} />
  </Wrapper>
);

export default AppNavDesktop;
