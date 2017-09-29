import styled from 'styled-components';

import theme from 'utils/theme';

const Item = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.hub.headerHeight};
  border-bottom: 2px solid transparent;

  ${(props) => props.isLink &&
    `&:hover,
    &:active,
    &:focus {
      color: ${theme.themeDark};
      background: ${theme.themeLighter};
      border-bottom: 2px solid ${theme.orangeLighter};
    }`
  }
`;

export default Item;
