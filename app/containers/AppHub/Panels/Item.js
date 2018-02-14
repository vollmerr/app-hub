import React from 'react';
import styled from 'styled-components';

import Link from '../../../components/Link';
import theme from '../../../utils/theme';


export const Wrapper = styled.li`
  list-style-type: none;
  margin: 0 -20px;
  &:hover {
    background: ${theme.neutralLighter};
  }
`;


export const StlyedLink = styled(Link) `
  color: ${theme.white};
  display: block;
  padding: 15px;
  &:hover,
  &:active,
  &:focus {
    color: ${theme.neutralDark};
  }
`;


class Item extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <StlyedLink {...this.props} />
      </Wrapper>
    );
  }
}


export default Item;
