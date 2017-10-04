import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';

import Link from './Link';
import odiLogo from './cdtLogo.png';

const Img = styled.img`
  height: ${theme.hub.headerHeight};
  margin: 0 10px;
`;

const Logo = () => (
  <Link href={'http://www.cdt.ca.gov'} title={'CDT ODI Logo'}>
    <Img
      src={odiLogo}
      alt={'CDT ODI Logo'}
    />
  </Link>
);

export default Logo;
