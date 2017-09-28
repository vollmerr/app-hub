import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import theme from 'utils/theme';
import PropTypes from 'prop-types';
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
    ${(props) => props.onClick &&
    `&:hover,
      &:active,
      &:focus {
        color: ${theme.themeDark};
        background: ${theme.themeLighter};
        border-bottom: 1px solid ${theme.orangeLighter};
      }`
  }
`;

const Icon = ({ panel, title, icon, onClick, size = 25 }) => (
  <Item>
    <IconStyled
      onClick={() => onClick(panel)}
      iconProps={{ iconName: icon, style: { fontSize: `${size}px` } }}
      title={title}
      ariaLabel={title}
    />
  </Item>
);

Icon.propTypes = {
  panel: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
};

export default Icon;
