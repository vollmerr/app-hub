import styled from 'styled-components';

import theme from 'utils/theme';

const focusStyle = (props) => `
  background: ${props.dark ? theme.themeDarker : theme.neutralPrimary};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: ${theme.hub.headerHeight}px;

  ${(props) => props.isLink &&
    `&:hover,
    &:active,
    &:focus {
      ${focusStyle(props)}
    }`
  }
  ${(props) => props.checked &&
    focusStyle(props)
  }
`;

export default Item;
