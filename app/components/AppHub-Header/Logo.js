import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';

import Link from './Link';
import odiLogo from './odiLogo.png';

const Img = styled.img`
  height: calc(${theme.hub.headerHeight} - 10px);
  margin:  0 0 0 -10px;
`;

const Logo = () => (
  <Link href={'http://www.cdt.ca.gov'}>
    <Img
      src={odiLogo}
      alt={'CDT ODI Logo'}
    />
  </Link>
);

export default Logo;
