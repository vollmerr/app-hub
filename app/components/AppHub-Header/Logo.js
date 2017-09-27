import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';

import Item from './Item';
import odiLogo from './odiLogo.png';

const Img = styled.img`
  height: calc(${theme.hub.headerHeight} - 10px);
  padding: 0 15px 0 5px;
`;

const Logo = () => (
  <Item>
    <a href={'http://www.cdt.ca.gov'}>
      <Img
        src={odiLogo}
        alt={'CDT ODI Logo'}
      />
    </a>
  </Item>
);

export default Logo;
