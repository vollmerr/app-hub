import React from 'react';
import styled from 'styled-components';

import AppNav from './';

const Wrapper = styled.div`
  width: 350px;
`;

const AppNavDesktop = ({ routes }) => (
  <Wrapper>
    <AppNav routes={routes} />
  </Wrapper>
);

export default AppNavDesktop;
