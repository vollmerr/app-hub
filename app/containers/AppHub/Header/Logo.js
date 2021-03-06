import React from 'react';
import styled from 'styled-components';

import odiLogo from '../../../images/cdtLogo.png';
import theme from '../../../utils/theme';

import Link from './NavLink';


export const Img = styled.img`
  height: ${theme.hub.headerHeight}px;
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
