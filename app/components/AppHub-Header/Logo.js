import React from 'react';
import styled from 'styled-components';

import theme from 'utils/theme';

import Item from './Item';
import odiLogo from './odiLogo.png';

const Img = styled.img`
  height: ${theme.hub.headerHeight};
  padding: 5px 15px 7px 5px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;

  &:hover,
  &:active,
  &:focus {
    background: ${theme.themeLighter};
    border-color: ${theme.orangeLighter};
  }
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
