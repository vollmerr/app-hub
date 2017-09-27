import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';

// import HeaderItem from 'components/Header/HeaderItem';
import Item from './Item';

const IconStyled = styled(IconButton) `
    color: ${theme.themePrimary};
    display: block;
    vertical-align: middle;
    border-width: 0;
    margin: 0;
    padding: 0;
    min-width: ${theme.hub.headerHeight};
    height: ${theme.hub.headerHeight};
    box-sizing: border-box;
    text-align: center;
    line-height: normal;
    overflow: visible;
    outline-offset: -1px;
    transition: background-color .467s cubic-bezier(.1,.9,.2,1) 34ms;
    pointer-events: all;
    ${props => props.onClick &&
    `&:hover,
      &:active,
      &:focus {
        color: ${theme.themeDark};
        background: ${theme.themeLighter};
        border-bottom: 1px solid ${theme.orangeLighter};
      }`
  }
`;

const Icon = ({ name, title, icon, onClick, size = '25px' }) => (
  <Item>
    <IconStyled
      onClick={onClick ? () => onClick(name) : null}
      iconProps={{ iconName: icon, style: { fontSize: size } }}
      title={title}
      ariaLabel={title}
    />
  </Item>
);

export default Icon;
