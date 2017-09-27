import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from 'utils/theme';

import Item from './Item';


// uses same font styling as SPO (different font family for header)
const Span = styled.span`
  color: ${theme.themePrimary};
  line-height: ${theme.hub.headerHeight};
  display: inline-block;
  font-family: "SegoeUI-SemiLight-final","Segoe UI SemiLight","Segoe UI WPC Semilight","Segoe UI",Segoe,Tahoma,Helvetica,Arial,sans-serif;
  font-size: ${(props) => props.size}px;
  -webkit-font-smoothing: antialiased;
`;

const Text = ({ text, size = 28 }) => (
  <Item>
    <Span size={size}>{text}</Span>
  </Item>
);

Text.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Text;
